

export const GET_LOADING = "GET_LOADING"
export const SET_LOADING = "SET_LOADING"

const initialLoading = {
    loading: false
}

export default function loadingReducer(state = initialLoading, payload) {
    switch (payload.type) {
        case GET_LOADING:
            return state;
        case SET_LOADING:
            return {
                ...state,
                loading: payload.payload
            };
        default: return state
    }
}