import axios from "axios";
import {Product} from "../interfaces/Product";


const api: string = `${process.env.REACT_APP_API}/products`;


export function addNewProducts(product: Product) {
	return axios.post(api, product);
}
export function getTheProducts() {
	return axios.get(api);
}

export function getTheSpicificProduct(id: string) {
	return axios.get(`${api}?id=${id}`);
}

export function removeSpicificProductFromProduct(id: string) {
	return axios.delete(`${api}/${id}`);
}

