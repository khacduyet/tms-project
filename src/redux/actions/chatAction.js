import { GET_LIST_ROOM, SET_LIST_ROOM } from "../reducers/chatReducer"

export const setListRoom = (data) => async dispatch => {
    try {
        dispatch({
            type: SET_LIST_ROOM,
            payload: data
        })
    } catch (error) {
        console.log("Error: get list room error", error)
    }
}