import { DMGeneralServices } from "../../services/danhmuc.service";
import { BADGE_NOTIFY } from "../reducers/notifyReducer"

export const getBadgeNotify = () => async dispatch => {
    try {
        let res = await DMGeneralServices.Notification.GetBadge()
        if (res) {
            dispatch({
                type: BADGE_NOTIFY,
                data: res
            })
        }
    } catch (error) {
        console.log("Error: get notify error", error)
    }
}