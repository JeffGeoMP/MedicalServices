import axios from "axios";
import environment from "../helpers/environment";
import authenticate from "../auth/authenticate";

class AssitanceService {

    getPromotions = () => {
        return axios({
            method: "GET",
            url: `${environment.servicesUrl}/promotions/get-all`,
            data: null,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authenticate.getToken()}`
            },
            timeout: 10000
        });
    }

    addAssistance = (promotions, date) => {
        return axios({
            method: "POST",
            url: `${environment.servicesUrl}/assistance/add`,
            data: {
               promotions : promotions,
               date : date.toString() 
            },
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authenticate.getToken()}`
            },
            timeout: 10000
        });
    }

    GetAssistanceWithDetail = () => {
        return axios({
            method: "GET",
            url: `${environment.servicesUrl}/assistance/get`,
            data: null,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authenticate.getToken()}`
            },
            timeout: 10000
        });
    }
}
export default AssitanceService;