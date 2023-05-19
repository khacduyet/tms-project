import { BASE_URL } from "../common/constant";
import axiosClient from "./axiosClient.setup";
import AsyncStorage from '@react-native-async-storage/async-storage';
const { get, post } = axiosClient;

const smarteos = `SmartEOSAPI/`
const qlsv = `QLSV`
const kbgg = `KBGG`

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
        GetDiemDanhSinhVien: async (data) => {
            let _header = await getHeaders();
            return post(kbgg + `/QuanLySinhVien/GetDiemDanhSinhVien`, data, _header)
        },
        SetDiemDanhSinhVien: async (data) => {
            let _header = await getHeaders();
            return post(kbgg + `/QuanLySinhVien/SetDiemDanhSinhVien`, data, _header)
        },
        GetBangDiemSinhVien: async (data) => {
            let _header = await getHeaders();
            return post(kbgg + `/QuanLySinhVien/GetBangDiemSinhVien`, data, _header)
        },
        SetBangDiemSinhVien: async (data) => {
            let _header = await getHeaders();
            return post(kbgg + `/QuanLySinhVien/SetBangDiemSinhVien`, data, _header)
        },
        GetListdmLoaiDiem: async (data) => {
            let _header = await getHeaders();
            return post(kbgg + `/DanhMuc/GetListdmLoaiDiem`, data, _header)
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
    },
    // --- Giảng viên ----
    LapThoiKhoaBieu: {
        GetTKBThang: async (data) => {
            let _header = await getHeaders();
            return post(kbgg + `/LapThoiKhoaBieu/GetTKBThang`, data, _header)
        },
        GetQuyTrinhSoGiaoAn: async (IdQuyTrinh) => {
            let _header = await getHeaders();
            return get(kbgg + `/KhaiBaoGioGiang/GetQuyTrinhSoGiaoAn?IdQuyTrinh=${IdQuyTrinh}`, _header)
        },
        GetListSoGiaoAn: async (data) => {
            let _header = await getHeaders();
            return post(kbgg + `/KhaiBaoGioGiang/GetListSoGiaoAn`, data, _header)
        },
        SetQuyTrinhSoGiaoAn: async (data) => {
            let _header = await getHeaders();
            return post(kbgg + `/KhaiBaoGioGiang/SetQuyTrinhSoGiaoAn`, data, _header)
        },
        GetListdmDungCu: async (data) => {
            let _header = await getHeaders();
            return post(kbgg + `/DanhMuc/GetListdmDungCu`, data, _header)
        },
    },
    DanhSachMonHoc: {
        GetListSoGiaoAnByLopMon: async (data) => {
            let _header = await getHeaders();
            return post(kbgg + `/KhaiBaoGioGiang/GetListSoGiaoAnByLopMon`, data, _header)
        },
        SetQuyTrinhKhaiBaoGioGiang: async (data) => {
            let _header = await getHeaders();
            return post(kbgg + `/KhaiBaoGioGiang/SetQuyTrinhKhaiBaoGioGiang`, data, _header)
        },
        GetQuyTrinhKhaiBaoGioGiang: async (IdQuyTrinh) => {
            let _header = await getHeaders();
            return get(kbgg + `/KhaiBaoGioGiang/GetQuyTrinhKhaiBaoGioGiang?IdQuyTrinh=${IdQuyTrinh}`, _header)
        },
        GetListSinhVienLop: async (data) => {
            let _header = await getHeaders();
            return post(kbgg + `/KhaiBaoGioGiang/GetListSinhVienLop`, data, _header)
        },
        GetListThucGiangGiaoVien: async (data) => {
            let _header = await getHeaders();
            return post(kbgg + `/KhaiBaoGioGiang/GetListThucGiangGiaoVien`, data, _header)
        },
    },

    DanhMuc: {
        GetListdmDanhGia: async (data) => {
            let _header = await getHeaders();
            return post(kbgg + `/DanhMuc/GetListdmDanhGia`, data, _header)
        },
        GetListdmQuyDinhKiemNhiem: async (data) => {
            let _header = await getHeaders();
            return post(kbgg + `/DanhMuc/GetListdmQuyDinhKiemNhiem`, data, _header)
        },
        GetDanhSachBoPhanTheoLoai: async () => {
            let _header = await getHeaders();
            return get(smarteos + `CoCauNhanSu/GetDanhSachBoPhanTheoLoai?MaLoaiBoPhan=KHOA`, _header)
        },
    },

    GiaoVien: {
        GetLopAndSinhVienByGiaoVien: async () => {
            let _header = await getHeaders();
            return get(kbgg + `/PhanCongGiaoVien/GetLopAndSinhVienByGiaoVien`, _header)
        },
        GetDanhSachUserForHopDong: async () => {
            let _header = await getHeaders();
            return get('SmartEOSAPI/QuanTri/GetDanhSachUserForHopDong', _header);
        }
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
