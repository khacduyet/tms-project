
export const GET_LIST_ROOM = "GET_LIST_ROOM"
export const SET_LIST_ROOM = "SET_LIST_ROOM"

const _listRoom = []


export function roomReducer(state = _listRoom, action) {
    switch (action.type) {
        case GET_LIST_ROOM:
            return state;
        case SET_LIST_ROOM:
            return [...action.payload]
        default:
            return state;
    }
}