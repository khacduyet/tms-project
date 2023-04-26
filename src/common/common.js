import moment from 'moment'

export const StatusCode = {
    SUCCESS: 1,
    FAIL: 2,
    NOT_LOGIN: 3,
    OTHER_ERROR: 4,
    CONTACT_DEV: 5,
    ERROR_USER: 6,
    UPDATE_PASSWORD: 7,
}

export const returnMessage = (statusCode) => {
    switch (statusCode) {
        case StatusCode.SUCCESS:
            return "Xử lý thành công";
        case StatusCode.FAIL:
            return "Xử lý không thành công";
        case StatusCode.NOT_LOGIN:
            return "Chưa đăng nhập";
        case StatusCode.OTHER_ERROR:
            return "Lỗi khác";
        case StatusCode.CONTACT_DEV:
            return "Có lỗi xảy ra trong quá trình xử lý vui lòng liên hệ kỹ thuật!";
        case StatusCode.UPDATE_PASSWORD:
            return "Cập nhật mật khẩu thành công!";
        case StatusCode.ERROR_USER:
            return "Sai tên tài khoản hoặc mật khẩu!";
        default:
            return "";
    }
}


function maskPhoneNumber(phoneNumber) {
    let subNum = phoneNumber.toString().substring(0, 3);
    let subNumLast = phoneNumber.toString().substring(phoneNumber.length - 3, phoneNumber.length);
    subNum = subNum + "xxxx" + subNumLast;
    return subNum;
}
function hideEmail(email) {
    return email.replace(/(.{2})(.*)(?=@)/, function (gp1, gp2, gp3) {
        for (let i = 0; i < gp3.length; i++) {
            gp2 += "*";
        }
        return gp2;
    });
}

export const TYPE = {
    phone: "phone",
    email: "email",
};

export const hideMaskEmailOrPhone = (str, type) => {
    if (type === TYPE.phone) {
        return maskPhoneNumber(str)
    }
    return hideEmail(str)
}

export function DateToUnix(date) {
    // + 25200
    return date ? ((new Date(date).getTime() / 1000)) : null
}
export function UnixToDate(dateunix) {
    return dateunix ? (new Date(dateunix * 1000)) : null
}
export function DateStringToDate(datestring) {
    return datestring ? (new Date(new Date(datestring).getTime() + (7 * 60 * 60 * 1000))) : null
}
export function DateStringToDateGMT(datestring) {
    return datestring ? (new Date(new Date(datestring).getTime())) : null
}
export function formatDateString(datestring) {
    const day = (new Date(new Date(datestring).getTime() + (7 * 60 * 60 * 1000)));
    const yyyy = day.getFullYear();
    let mm = day.getMonth() + 1; // Months start at 0!
    let dd = day.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    return datestring ? (dd + "/" + mm + "/" + yyyy) : '';
}
export function formatDateStringGMT(datestring, type) {
    const day = (new Date(new Date(datestring).getTime()));
    const yyyy = day.getFullYear();
    let mm = day.getMonth() + 1; // Months start at 0!
    let dd = day.getDate();
    let hour = day.getHours();
    let minute = day.getMinutes();
    let second = day.getSeconds();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    let _return = null
    switch (type) {
        case "dd/mm/yyyy":
            _return = datestring ? (dd + "/" + mm + "/" + yyyy) : ''
            break;
        case "mm/yyyy":
            _return = datestring ? (mm + "/" + yyyy) : ''
            break;
        case "dd/mm/yyyy hh:mm":
            _return = datestring ? (dd + "/" + mm + "/" + yyyy + " " + hour + ":" + minute) : ''
            break;
        default:
            _return = datestring ? (hour + ":" + minute + ":" + second + " " + dd + "/" + mm + "/" + yyyy) : ''
            break;
    }
    return _return;
}

export function createGuid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
}

export function DateToFirstLastDateInMonth(date) {
    const firstDay = moment(date, 'YYYY-MM-DD').startOf('month')
    const lastDay = moment(date, 'YYYY-MM-DD').endOf('month')
    return {
        First: firstDay,
        FirstUnix: DateToUnix(firstDay),
        Last: lastDay,
        LastUnix: DateToUnix(lastDay)
    }
}