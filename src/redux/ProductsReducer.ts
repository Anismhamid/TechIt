// products reducer
import {Product} from "../interfaces/Product";

export interface ProductsState {
	products: Product[];
}
const initialState: ProductsState = {
	products: [],
};

export enum ProductsActionType {
	AddProduct = "AddProduct",
	UpdateProduct = "UpdateProduct",
	DeleteProduct = "DeleteProduct",
	SetAllProducts = "SetAllProducts",
}

export interface ProductsAction {
	type: ProductsActionType;
	payload: any;
}

export function addItemToProductsRedux(product: Product): ProductsAction {
	return {type: ProductsActionType.AddProduct, payload: product};
}

export function updateProduct(product: Product): ProductsAction {
	return {type: ProductsActionType.UpdateProduct, payload: product};
}

export function deleteItemFromProductsReducer(product: Product): ProductsAction {
	return {type: ProductsActionType.DeleteProduct, payload: product};
}

export function setAllProducts(products: Product[]): ProductsAction {
	return {type: ProductsActionType.SetAllProducts, payload: products};
}

export function productsReducer(
	currentState: ProductsState = initialState,
	action: ProductsAction,
): ProductsState {
	const newState: ProductsState = {
		...currentState,
		products: {...currentState.products},
	};

	switch (action.type) {
		case ProductsActionType.AddProduct:
			newState.products.push();
			break;

		case ProductsActionType.UpdateProduct:
			const indexToUpdate = newState.products.findIndex(
				(p: Product) => p.id === action.payload.id,
			);
			newState.products.splice(indexToUpdate, 1, action.payload);
			break;

		case ProductsActionType.DeleteProduct:
			break;

		case ProductsActionType.SetAllProducts:
			break;

		default:
			return currentState;
	}
	return newState;
}
