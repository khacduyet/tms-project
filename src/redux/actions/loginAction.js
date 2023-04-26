import { AuthServices } from "../../services/auth.service";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SET_CURRENT_USER, SET_TOKEN } from "../reducers/loginReducer";
import * as Updates from 'expo-updates';
import { setLoading } from "./loadingAction";



export const loginSubmit = (data) => async dispatch => {
    try {
        let res = await AuthServices.loginUser(data)
        if (res) {
            await AsyncStorage.setItem(
                'account',
                JSON.stringify(data),
            );
            await AsyncStorage.setItem(
                'token',
                res.access_token,
            );
            dispatch({
                type: SET_TOKEN,
                payload: res
            })
        } else {
            dispatch(setLoading(false));
        }
    } catch (error) {
        console.log("error: ", error);
    }
}
export const logoutSubmit = () => async dispatch => {
    try {
        await AsyncStorage.removeItem(
            'token'
        );
        await AsyncStorage.removeItem(
            'fingerPrint'
        );
        dispatch(getCurrentUser())
        // Updates.reloadAsync()
        // dispatch(setLoading(false));
    } catch (error) {
        console.log("error: ", error);
    }
}

export const getCurrentUser = () => async dispatch => {
    try {
        let res = await AuthServices.currentUser()
        if (res) {
            dispatch({
                type: SET_CURRENT_USER,
                payload: res
            })
        }
    } catch (error) {
        console.log("error: function");
    }
}