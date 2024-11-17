// products reducer
import {Product} from "../interfaces/Product";

export class ProductsState {
	public productss: Product[] = [];
}



export enum ProductsActionType {
	AddProduct = "AddProduct",
	UpdateProduct = "UpdateProduct",
	DeleteProduct = "DeleteProduct",
	SetAllProducts = "SetAllProducts",
}

export interface ProductsAction {
	type: ProductsActionType;
	payload: Product[] | Product | number;
}

export function addItemToProductsRedux(product: Product): ProductsAction {
	return {type: ProductsActionType.AddProduct, payload: product};
}

export function updateProductReducer(product: Product): ProductsAction {
	return {type: ProductsActionType.UpdateProduct, payload: product};
}

export function deleteItemFromProductsReducer(id: number): ProductsAction {
	return {type: ProductsActionType.DeleteProduct, payload: id};
}

export function setAllProducts(products: Product[]): ProductsAction {
	return {type: ProductsActionType.SetAllProducts, payload: products};
}

export function productsReducer(
	currentState: ProductsState = new ProductsState(),
	action: ProductsAction,
): ProductsState {
	const newState: ProductsState = {
		...currentState,
		productss: [...currentState.productss],
	};

	switch (action.type) {
		case ProductsActionType.AddProduct:
			newState.productss.push(action.payload as Product);
			break;

		case ProductsActionType.UpdateProduct:
			const updatedProduct = action.payload as Product;
			const indexToUpdate = newState.productss.findIndex(
				(p: Product) => p.id === updatedProduct.id,
			);
			newState.productss[indexToUpdate] = action.payload as Product;
			break;

		case ProductsActionType.DeleteProduct:
			const idToDelete = action.payload as Product;
			let indexToDelete = newState.productss.findIndex(
				(p: Product) => p.id === idToDelete.id,
			);
			newState.productss.splice(indexToDelete, 1);
			break;

		case ProductsActionType.SetAllProducts:
			newState.productss = action.payload as Product[];
			break;

		default:
			return currentState;
	}
	return newState;
}
