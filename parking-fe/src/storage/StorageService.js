const TOKEN = 'token'

export default {
    storageToken(value) {
        localStorage.setItem(TOKEN, value);
    },
    
    getToken() {
        return localStorage.getItem(TOKEN);
    }
}
