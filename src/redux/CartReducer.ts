import {Product} from "../interfaces/Product";

// Cart Reducer

export interface CartState {
	products: Product[];
}

const initialState: CartState = {
	products: [],
};


export enum CartActionType {
	AddToCart = "AddToCart",
	RemoveFromCart = "RemoveFromCart",
	EditCartItem = "EditCartItem",
	SetCartProducts = "SetCartProducts",
}

export interface CartAction {
	type: CartActionType;
	payload: Product | Product[];
}



export const addToCart = (product: Product): CartAction => ({
	type: CartActionType.AddToCart,
	payload: product,
});

export const removeFromCart = (product: Product): CartAction => ({
	type: CartActionType.RemoveFromCart,
	payload: product,
});

export const editCartItem = (product: Product): CartAction => ({
	type: CartActionType.EditCartItem,
	payload: product,
});

export const setCartProducts = (products: Product[]): CartAction => ({
	type: CartActionType.SetCartProducts,
	payload: products,
});

export function cartReducer(
	state: CartState = initialState,
	action: CartAction,
): CartState {
	switch (action.type) {
		case CartActionType.AddToCart:
			return {
				...state,
				products: [...state.products, action.payload as Product],
			};

		case CartActionType.RemoveFromCart:
			return {
				...state,
				products: state.products.filter(
					(product) => product.id !== (action.payload as Product).id,
				),
			};

		case CartActionType.EditCartItem:
			const editedProduct = action.payload as Product;
			return {
				...state,
				products: state.products.map((product) =>
					product.id === editedProduct.id ? editedProduct : product,
				),
			};

		case CartActionType.SetCartProducts:
			return {
				...state,
				products: action.payload as Product[],
			};

		default:
			return state;
	}
}
