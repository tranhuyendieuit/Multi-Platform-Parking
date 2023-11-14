import UserRepository from './UserRepository'
import QRCodeRepository from './QRCodeRepository'
import ParrkingManagement from './ParrkingManagement'
const repositories = {
    user: UserRepository,
    qr_code: QRCodeRepository,
    parking: ParrkingManagement
};

export default {
    get: name => repositories[name]
};