import axios from "axios";
import { ToastMessage } from "../common/components";
import { StatusCode, returnMessage } from "../common/common";

const axiosClient = axios.create({
  headers: {
    ContentType: "application/json;charset=UTF-8",
    Accept: "application/json, text/plain, */*"
  },
  baseURL: `http://103.130.212.45:2999/`,
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
