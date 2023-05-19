import { combineReducers } from "redux"
import loadingReducer from "./loadingReducer"
import { baseUrlReducer, tokenReducer, userCurrenReducer } from "./loginReducer"
import { notifyReducer } from "./notifyReducer"

const reducers = combineReducers({
    loading: loadingReducer,
    tokenReducer: tokenReducer,
    currentUser: userCurrenReducer,
    notify: notifyReducer,
    baseurl: baseUrlReducer
})

export default (state, action) => reducers(state, action)