import axios from "axios";
import {User} from "../interfaces/User";

const api: string = `${process.env.REACT_APP_API}/users`;

export function getAllUsers(user:User) {
	return axios.get(`${api}?email=${user.email}&&password=${user.password}`);
}

export function postUser(user: User) {
	return axios.post(`${api}/users`,user);
}
