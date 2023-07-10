import { combineReducers } from "redux"
import loadingReducer from "./loadingReducer"
import { baseUrlReducer, tokenReducer, userCurrenReducer } from "./loginReducer"
import { notifyReducer } from "./notifyReducer"
import { roomReducer } from "./chatReducer"

const reducers = combineReducers({
    loading: loadingReducer,
    tokenReducer: tokenReducer,
    currentUser: userCurrenReducer,
    notify: notifyReducer,
    baseurl: baseUrlReducer,
    listRoom: roomReducer
})

export default (state, action) => reducers(state, action)