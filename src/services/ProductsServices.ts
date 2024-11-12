import axios from "axios";

const api: string = `${process.env.REACT_APP_API}/products`;

export function getTheProducts() {
	return axios.get(api);
}

export function getTheSpicificProduct(id: string) {
	return axios.get(`${api}?id=${id}`);
}
