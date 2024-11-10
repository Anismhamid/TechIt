import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {loginReducer} from "./LoginState";

const reducer = combineReducers({loginState: loginReducer});

const store = configureStore({reducer});

export default store;
