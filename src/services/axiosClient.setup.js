import axios from 'axios';
import { returnMessage, StatusCode } from '../common/common';
import { ToastMessage } from '../common/components';
import { BASE_URL } from '../common/constant';


const axiosClient = axios.create({
    headers: {
        ContentType: "application/json;charset=UTF-8",
        Accept: "application/json, text/plain, */*"
    },
    // baseURL: BASE_URL,
    withCredentials: true,
    timeout: 30000,
});
axiosClient.interceptors.response.use(
    (res) => {
        return res.data
    },
    (er) => {
        console.log("er", er);
        if (er.response.status === 400) {
            let _msg = returnMessage(StatusCode.ERROR_USER)
            ToastMessage(_msg)
            return;
        }
        let _msg = returnMessage(StatusCode.CONTACT_DEV)
        ToastMessage(_msg)
    }
);
export default axiosClient;
