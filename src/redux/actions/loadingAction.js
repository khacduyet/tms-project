import { GET_LOADING, SET_LOADING } from "../reducers/loadingReducer"


export const getLoading = () => dispatch => {
    try {
        dispatch({
            type: GET_LOADING
        })
    } catch (error) {
        console.log("Error: loading error")
    }
}
export const setLoading = (data) => dispatch => {
    try {
        dispatch({
            type: SET_LOADING,
            payload: data
        })
    } catch (error) {
        console.log("Error: loading error")
    }
}