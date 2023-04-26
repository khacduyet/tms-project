import { returnMessage, StatusCode } from "../../common/common"

export const SET_TOKEN = "SET_TOKEN"
export const GET_CURRENT_USER = "GET_CURRENT_USER"
export const SET_CURRENT_USER = "SET_CURRENT_USER"

const _token = {
    access_token: "",
    expires_in: 0,
    token_type: ""
}
const currentUser = {
    Id: "",
    TenNhanVien: "",
    UserName: "",
    Email: "",
}


export function tokenReducer(state = _token, action) {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...action.payload
            }
        default:
            return state;
    }
}

export function userCurrenReducer(state = currentUser, action) {
    switch (action.type) {
        case GET_CURRENT_USER:
            return {
                ...state
            }
        case SET_CURRENT_USER:
            return {
                ...action.payload
            }
        default:
            return state;
    }
}