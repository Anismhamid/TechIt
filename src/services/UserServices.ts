import axios from "axios";
import {User} from "../interfaces/User";

const api: string = `${process.env.REACT_APP_API}/users`;

export function checkUser(user:User) {
	return axios.get(`${api}?email=${user.email}&&password=${user.password}`);
}

export function postUser(user: User) {
	return axios.post(`${api}`,user);
}


export function getUserById(id:string) {
	return axios.get(`${api}?id=${id}`);
}