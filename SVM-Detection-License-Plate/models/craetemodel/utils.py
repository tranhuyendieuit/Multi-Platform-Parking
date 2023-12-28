import glob

import tensorflow as tf
import numpy as np
import random
from lib_detection import Label
from math import sin, cos
import cv2


def find_T_matrix(pts, t_pts):
    A = np.zeros((8, 9))
    for i in range(0, 4):
        xi = pts[:, i]
        xil = t_pts[:, i]
        xi = xi.T

        A[i * 2, 3:6] = -xil[2] * xi
        A[i * 2, 6:] = xil[1] * xi
        A[i * 2 + 1, :3] = xil[2] * xi
        A[i * 2 + 1, 6:] = -xil[0] * xi

    [U, S, V] = np.linalg.svd(A)
    H = V[-1, :].reshape((3, 3))

    return H


def getRectPts(tlx, tly, brx, bry):
    return np.matrix(
        [[tlx, brx, brx, tlx], [tly, tly, bry, bry], [1.0, 1.0, 1.0, 1.0]], dtype=float
    )


def perspective_transform(
    wh, angles=np.array([0.0, 0.0, 0.0]), zcop=1000.0, dpp=1000.0
):
    rads = np.deg2rad(angles)

    a = rads[0]
    Rx = np.matrix([[1, 0, 0], [0, cos(a), sin(a)], [0, -sin(a), cos(a)]])
    a = rads[1]
    Ry = np.matrix([[cos(a), 0, -sin(a)], [0, 1, 0], [sin(a), 0, cos(a)]])
    a = rads[2]
    Rz = np.matrix([[cos(a), sin(a), 0], [-sin(a), cos(a), 0], [0, 0, 1]])

    R = Rx * Ry * Rz

    (w, h) = tuple(wh)
    xyz = np.matrix([[0, 0, w, w], [0, h, 0, h], [0, 0, 0, 0]])
    hxy = np.matrix([[0, 0, w, w], [0, h, 0, h], [1, 1, 1, 1]])

    xyz = xyz - np.matrix([[w], [h], [0]]) / 2.0
    xyz = R * xyz

    xyz = xyz - np.matrix([[0], [0], [zcop]])
    hxyz = np.concatenate([xyz, np.ones((1, 4))])

    P = np.matrix([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, -1.0 / dpp, 0]])
    _hxy = P * hxyz
    _hxy = _hxy / _hxy[2, :]
    _hxy = _hxy + np.matrix([[w], [h], [0]]) / 2.0

    return find_T_matrix(hxy, _hxy)


def image_files_from_folder(folder, upper=True):
    extensions = ["jpg", "jpeg", "png"]
    img_files = []
    for ext in extensions:
        img_files += glob("%s/*.%s" % (folder, ext))
        if upper:
            img_files += glob("%s/*.%s" % (folder, ext.upper()))
    return img_files


def is_inside(ltest, lref):
    return (ltest.tl() >= lref.tl()).all() and (ltest.br() <= lref.br()).all()


def im2single(I):
    assert I.dtype == "uint8"
    return I.astype("float32") / 255.0


def getWH(shape):
    return np.array(shape[1::-1]).astype(float)


def IOU(tl1, br1, tl2, br2):
    wh1, wh2 = br1 - tl1, br2 - tl2
    assert (wh1 >= 0.0).all() and (wh2 >= 0.0).all()

    intersection_wh = np.maximum(np.minimum(br1, br2) - np.maximum(tl1, tl2), 0.0)
    intersection_area = np.prod(intersection_wh)
    area1, area2 = (np.prod(wh1), np.prod(wh2))
    union_area = area1 + area2 - intersection_area
    return intersection_area / union_area


def IOU_labels(l1, l2):
    return IOU(l1.tl(), l1.br(), l2.tl(), l2.br())


def IOU_centre_and_dims(cc1, wh1, cc2, wh2):
    return IOU(cc1 - wh1 / 2.0, cc1 + wh1 / 2.0, cc2 - wh2 / 2.0, cc2 + wh2 / 2.0)


def logloss(Ptrue, Pred, szs, eps=10e-10):
    b, h, w, ch = szs
    Pred = tf.clip_by_value(Pred, eps, 1.0)
    Pred = -tf.log(Pred)
    Pred = Pred * Ptrue
    Pred = tf.reshape(Pred, (b, h * w * ch))
    Pred = tf.reduce_sum(Pred, 1)
    return Pred


def l1(true, pred, szs):
    b, h, w, ch = szs
    res = tf.reshape(true - pred, (b, h * w * ch))
    res = tf.abs(res)
    res = tf.reduce_sum(res, 1)
    return res


def loss(Ytrue, Ypred):
    b = tf.shape(Ytrue)[0]
    h = tf.shape(Ytrue)[1]
    w = tf.shape(Ytrue)[2]

    obj_probs_true = Ytrue[..., 0]
    obj_probs_pred = Ypred[..., 0]

    non_obj_probs_true = 1.0 - Ytrue[..., 0]
    non_obj_probs_pred = Ypred[..., 1]

    affine_pred = Ypred[..., 2:]
    pts_true = Ytrue[..., 1:]

    affinex = tf.stack(
        [
            tf.maximum(affine_pred[..., 0], 0.0),
            affine_pred[..., 1],
            affine_pred[..., 2],
        ],
        3,
    )
    affiney = tf.stack(
        [
            affine_pred[..., 3],
            tf.maximum(affine_pred[..., 4], 0.0),
            affine_pred[..., 5],
        ],
        3,
    )

    v = 0.5
    base = tf.stack([[[[-v, -v, 1.0, v, -v, 1.0, v, v, 1.0, -v, v, 1.0]]]])
    base = tf.tile(base, tf.stack([b, h, w, 1]))

    pts = tf.zeros((b, h, w, 0))

    for i in range(0, 12, 3):
        row = base[..., i : (i + 3)]
        ptsx = tf.reduce_sum(affinex * row, 3)
        ptsy = tf.reduce_sum(affiney * row, 3)

        pts_xy = tf.stack([ptsx, ptsy], 3)
        pts = tf.concat([pts, pts_xy], 3)

    flags = tf.reshape(obj_probs_true, (b, h, w, 1))
    res = 1.0 * l1(pts_true * flags, pts * flags, (b, h, w, 4 * 2))
    res += 1.0 * logloss(obj_probs_true, obj_probs_pred, (b, h, w, 1))
    res += 1.0 * logloss(non_obj_probs_true, non_obj_probs_pred, (b, h, w, 1))
    return res


def labels2output_map(label, lppts, dim, stride):
    side = ((float(dim) + 40.0) / 2.0) / stride  # 7.75 when dim = 208 and stride = 16

    outsize = dim / stride
    Y = np.zeros((outsize, outsize, 2 * 4 + 1), dtype="float32")
    MN = np.array([outsize, outsize])
    WH = np.array([dim, dim], dtype=float)

    tlx, tly = np.floor(np.maximum(label.tl(), 0.0) * MN).astype(int).tolist()
    brx, bry = np.ceil(np.minimum(label.br(), 1.0) * MN).astype(int).tolist()

    for x in range(tlx, brx):
        for y in range(tly, bry):
            mn = np.array([float(x) + 0.5, float(y) + 0.5])
            iou = IOU_centre_and_dims(mn / MN, label.wh(), label.cc(), label.wh())

            if iou > 0.5:
                p_WH = lppts * WH.reshape((2, 1))
                p_MN = p_WH / stride

                p_MN_center_mn = p_MN - mn.reshape((2, 1))

                p_side = p_MN_center_mn / side

                Y[y, x, 0] = 1.0
                Y[y, x, 1:] = p_side.T.flatten()

    return Y


def pts2ptsh(pts):
    return np.matrix(np.concatenate((pts, np.ones((1, pts.shape[1]))), 0))


def project(I, T, pts, dim):
    ptsh = np.matrix(np.concatenate((pts, np.ones((1, 4))), 0))
    ptsh = np.matmul(T, ptsh)
    ptsh = ptsh / ptsh[2]
    ptsret = ptsh[:2]
    ptsret = ptsret / dim
    Iroi = cv2.warpPerspective(
        I, T, (dim, dim), borderValue=0.0, flags=cv2.INTER_LINEAR
    )
    return Iroi, ptsret


def flip_image_and_pts(I, pts):
    I = cv2.flip(I, 1)
    pts[0] = 1.0 - pts[0]
    idx = [1, 0, 3, 2]
    pts = pts[..., idx]
    return I, pts


def hsv_transform(I, hsv_modifier):
    I = cv2.cvtColor(I, cv2.COLOR_BGR2HSV)
    I = I + hsv_modifier
    return cv2.cvtColor(I, cv2.COLOR_HSV2BGR)


def augment_sample(I, pts, dim):
    maxsum, maxangle = 120, np.array([80.0, 80.0, 45.0])
    angles = np.random.rand(3) * maxangle
    if angles.sum() > maxsum:
        angles = (angles / angles.sum()) * (maxangle / maxangle.sum())

    I = im2single(I)
    iwh = getWH(I.shape)

    whratio = random.uniform(2.0, 4.0)
    wsiz = random.uniform(dim * 0.2, dim * 1.0)

    hsiz = wsiz / whratio

    dx = random.uniform(0.0, dim - wsiz)
    dy = random.uniform(0.0, dim - hsiz)

    pph = getRectPts(dx, dy, dx + wsiz, dy + hsiz)
    pts = pts * iwh.reshape((2, 1))
    T = find_T_matrix(pts2ptsh(pts), pph)

    H = perspective_transform((dim, dim), angles=angles)
    H = np.matmul(H, T)

    Iroi, pts = project(I, H, pts, dim)

    hsv_mod = np.random.rand(3).astype("float32")
    hsv_mod = (hsv_mod - 0.5) * 0.3
    hsv_mod[0] *= 360
    Iroi = hsv_transform(Iroi, hsv_mod)
    Iroi = np.clip(Iroi, 0.0, 1.0)

    pts = np.array(pts)

    if random.random() > 0.5:
        Iroi, pts = flip_image_and_pts(Iroi, pts)

    tl, br = pts.min(1), pts.max(1)
    llp = Label(0, tl, br)

    return Iroi, llp, pts
