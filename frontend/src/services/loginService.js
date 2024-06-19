import axios from "axios";
import environment from "../helpers/environment";

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
}
export default LoginService;