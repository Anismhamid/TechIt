import axios from "axios";
import {User} from "../interfaces/User";

const api: string = `${process.env.REACT_APP_API}`;

export function getAllUsers() {
	return axios.get(`${api}/users`);
}

export function postUser(user: User) {
	return axios.post(`${api}/users`,user);
}
