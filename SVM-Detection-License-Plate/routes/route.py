import cv2
import numpy as np
from flask import request
from models.main import detect


def extractRoute(app):
    @app.post("/extract")
    def upload():
        try:
            if "image" not in request.files:
                return {
                    "status": "FAILED",
                    "result": None,
                    "message": "No image found!",
                }, 400
            image_file = request.files["image"]
            image = cv2.imdecode(
                np.fromstring(image_file.read(), np.uint8), cv2.IMREAD_UNCHANGED
            )
            result = detect(image)
            if result is not None:
                return {
                    "status": "OK",
                    "result": result,
                    "message": "Detected image successfully!",
                }, 200
            return {
                "status": "FAILED",
                "result": None,
                "message": "Detected image failed!",
            }, 400
        except Exception as e:
            print(e)
            return {
                "status": "FAILED",
                "result": e.__str__(),
                "message": "Something went wrong!",
            }, 500

    @app.get("/capture")
    def capture():
        try:
            cap = cv2.VideoCapture(0)
            ret, frame = cap.read()
            result = detect(frame)
            if result is not None:
                return result
            return None, 400
        except Exception as e:
            print(e)
            return e.__str__(), 500
