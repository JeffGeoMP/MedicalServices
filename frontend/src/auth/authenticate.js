
class authenticate {

    constructor() {
        this.authenticated = false;
    }

    static verifyToken() {
        let token = sessionStorage.getItem('token');
        if (token === null || token === undefined)
            return false;
        return true;
    }

    static setToken(token) {
        sessionStorage.setItem('token', token);
    }

    static getToken() {
        return sessionStorage.getItem('token');
    }

    static removeToken() {
        sessionStorage.removeItem('token');
    }
}

export default authenticate;