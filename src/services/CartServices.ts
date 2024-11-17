import axios from "axios";
import {Product} from "../interfaces/Product";

const api: string = `${process.env.REACT_APP_API}/cart`;

export function postProductToCart(product: Product) {
	return axios.post(api, product);
}

export function removeProduct(id: any) {
	return axios.delete(`${api}/${id}`);
}

export function getAllProductFromCart() {
	return axios.get(api);
}

export function formattedPrice(price: number):any {
	const formattedPrice = new Intl.NumberFormat("he-IL", {
		style: "currency",
		currency: "ILS",
	}).format(price as number);
	return formattedPrice;
}
