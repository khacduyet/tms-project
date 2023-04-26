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

export const DMGeneralServices = {
    Notification: {
        GetList: async (IdUser, IdLast) => {
            let _header = await getHeaders();
            // IdLast => scroll lazy load 
            return get(smarteos + `Notification/GetListNotificationLoaiBoLoai?Loai=abc&IdUser=${IdUser}&idIdLast=${IdLast}`, _header)
        },
        GetBadge: async () => {
            let _header = await getHeaders();
            // IdLast => scroll lazy load 
            return get(smarteos + `Notification/GetNotification`, _header)
        },
        Seen: async (item) => {
            let _header = await getHeaders();
            return post(smarteos + `Notification/XemNotification`, { Item: item }, _header)
        },
        SeenAll: async () => {
            let _header = await getHeaders();
            return post(smarteos + `Notification/MarkAllRead`, {}, _header)
        },

    }
}

export const QuyTrinhServices = {
    ThoiKhoaBieu: {
        GetThoiKhoaBieuSV: async (data) => {
            let _header = await getHeaders();
            return post(qlsv + `/QuanLySinhVien/GetThoiKhoaBieuSV`, data, _header)
        },
        GetThoiKhoaBieuSVToDay: async () => {
            let _header = await getHeaders();
            return get(qlsv + `/QuanLySinhVien/GetThoiKhoaBieuSVToDay`, _header)
        },
    },
    KetQuaHocTap: {
        GetBangDiemOfSinhVien: async (data) => {
            let _header = await getHeaders();
            return post(qlsv + `/QuanLySinhVien/GetBangDiemOfSinhVien`, data, _header)
        },
        GetPhoDiemSV: async (data) => {
            let _header = await getHeaders();
            return post(qlsv + `/QuanLySinhVien/GetPhoDiemSV`, data, _header)
        },
        GetPhoDiemSV: async (data) => {
            let _header = await getHeaders();
            return post(qlsv + `/QuanLySinhVien/GetDanhSachMonHocByKy`, data, _header)
        },
    },
    SinhVien: {
        GetMonHocCanhBaoOfSinhVien: async (data) => {
            let _header = await getHeaders();
            return post(qlsv + `/QuanLySinhVien/GetMonHocCanhBaoOfSinhVien`, data, _header)
        },
        GetDiemDanhOfSinhVien: async (data) => {
            let _header = await getHeaders();
            return post(qlsv + `/QuanLySinhVien/GetDiemDanhOfSinhVien`, data, _header)
        },
    },
    ThongTinCaNhan: {
        SetSoYeuLyLichSinhVien: async (data) => {
            let _header = await getHeaders();
            return post(qlsv + `/QuanLySinhVien/SetSoYeuLyLichSinhVien`, data, _header)
        },
        GetSoYeuLyLichSinhVien: async () => {
            let _header = await getHeaders();
            return get(qlsv + `/QuanLySinhVien/GetSoYeuLyLichSinhVien`, _header)
        },
    }
}

export const AuthServices = {
    loginUser: async (data) => {
        let _header = await getHeadersURL();
        const tokenfirebase = await AsyncStorage.getItem('deviceToken');
        let _payload = `username=${data.username}&password=${data.password}&grant_type=password&tokenfirebase=${tokenfirebase}`
        return post(smarteos + `oauth2/token`, _payload, _header)
    },
    currentUser: async () => {
        let _header = await getHeaders();
        return await get(smarteos + `/QuanTri/GetCurrentUser`, _header)
    },
    changePassword: async (data) => {
        let _header = await getHeaders();
        return await post(smarteos + `/QuanTri/ChangePass`, data, _header)
    },
    ResetForgotPasswordNoLogin: async (data) => {
        let _header = await getHeadersURL();
        return post(smarteos + `/QuanTri/ResetForgotPasswordNoLogin`, data, _header)
    },
}
