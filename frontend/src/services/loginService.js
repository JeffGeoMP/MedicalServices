import axios from "axios";
import environment from "../helpers/environment";
import authenticate from "../auth/authenticate";

class LoginService {

    loginUser = (email, pass) => {
        return axios({
            method: "POST",
            url: `${environment.servicesUrl}/login`,
            data: {
                email: email,
                password: pass
            },
            headers: {
                "Content-Type": "application/json",
            },
            timeout: 10000
        });
    }

    getDataUser = () => {
        return axios({
            method: "GET",
            url: `${environment.servicesUrl}/login/data`,
            data: null,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authenticate.getToken()}`
            },
            timeout: 10000
        });
    }
}
export default LoginService;