

export const GET_NOTIFY = "GET_NOTIFY"
export const SET_NOTIFY = "SET_NOTIFY"
export const LOAD_MORE_NOTIFY = "LOAD_MORE_NOTIFY"
export const BADGE_NOTIFY = "BADGE_NOTIFY"

const _notifies = {}

export function notifyReducer(state = _notifies, action) {
    switch (action.type) {
        case BADGE_NOTIFY:
            return { ...action.data }
        default:
            return state;
    }
}