import Repository from './Repository';

const resource = '/qr-code'

export default {
    async get(subUrl) {
        return await Repository.get(`${resource}/${subUrl}`, { headers: {
            "Authorization": localStorage.getItem('token')
        }});
    }
}