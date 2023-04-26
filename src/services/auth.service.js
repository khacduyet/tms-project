import { BASE_URL } from "../common/constant";
import axiosClient from "./axiosClient.setup";
import AsyncStorage from '@react-native-async-storage/async-storage';
const { get, post } = axiosClient;

const smarteos = `SmartEOSAPI/`
const qlsv = `QLSV`

const getHeaders = async () => {
    const sjwt = await AsyncStorage.getItem('token');
    const url = await AsyncStorage.getItem('BASE_URL');
    let headers = {
        headers: {
            ContentType: "application/json;charset=UTF-8",
            Accept: "application/json, text/plain, */*",
            Authorization: ("BEARER " + sjwt)
        },
        baseURL: url
    }
    return headers;
}
const getHeadersURL = async () => {
    const url = await AsyncStorage.getItem('BASE_URL');
    let headers = {
        baseURL: url
    }
    return headers;
}

export const AuthServices = {
    loginUser: async (data) => {
        const tokenfirebase = await AsyncStorage.getItem('deviceToken');
        let _header = await getHeaders();
        let _payload = `username=${data.username}&password=${data.password}&grant_type=password&tokenfirebase=${tokenfirebase}`
        return post(smarteos + `oauth2/token`, _payload, _header)
    },
    currentUser: async () => {
        let _header = await getHeaders();
        return get(smarteos + `/QuanTri/GetCurrentUser`, _header)
    },
    changePassword: async (data) => {
        let _header = await getHeaders();
        return post(smarteos + `/QuanTri/ChangePass`, data, _header)
    },
    ResetForgotPasswordNoLogin: async (data) => {
        let _header = await getHeadersURL();
        return post(smarteos + `/QuanTri/ResetForgotPasswordNoLogin`, data, _header)
    },
}

export const DanhMucAccountServices = {
    GetUserByUserName: async (username) => {
        let _header = await getHeadersURL();
        return get(qlsv + `/DanhMuc/GetUserByUserName?UserName=` + username, _header)
    },
    MaOtpSMS: async (phone, idUser) => {
        let _header = await getHeadersURL();
        return get(qlsv + `/DanhMuc/MaOtpSMS?PhoneNumber=` + phone + `&IdUser=` + idUser, _header)
    },
    MaOtpEmail: async (email, idUser) => {
        let _header = await getHeadersURL();
        return get(qlsv + `/DanhMuc/MaOtpEmail?Email=` + email + `&IdUser=` + idUser, _header)
    },
    XacMinhOTP: async (data) => {
        let _header = await getHeadersURL();
        return post(qlsv + `/DanhMuc/XacMinhOTP`, data, _header)
    },
}
