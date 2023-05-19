import AsyncStorage from "@react-native-async-storage/async-storage"
import { SET_BASEURL } from "../reducers/loginReducer"

export const setBaseUrl = () => async dispatch => {
    try {
        const url = await AsyncStorage.getItem('BASE_URL');
        if (url) {
            dispatch({
                type: SET_BASEURL,
                data: url
            })
        }
    } catch (error) {
        console.log("Error: get notify error", error)
    }
}