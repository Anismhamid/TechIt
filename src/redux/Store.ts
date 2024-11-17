import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {cartReducer} from "./CartReducer";
import {loginReducer} from "./LoginReducer";
import {productsReducer} from "./ProductsReducer";

const rootReducer = combineReducers({
	products: productsReducer,
	cart: cartReducer,
	login: loginReducer,
});

export const store = configureStore({
	reducer: rootReducer,

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export default store;
