import {User} from "../interfaces/User";

export class LoginState {
	public users: User[] = [];
}

// actionTypes
export enum LoginActionType {
	Login = "LOG_IN",
	Logout = "LOG_OUT",
	Register = "REGISTER",
	SetAllUsers = "SET_ALL_USERS",
}

export interface LoginAction {
	type: LoginActionType;
	payload: any;
}

export function login(user: User): LoginAction {
	return {type: LoginActionType.Login, payload: user};
}

export function logout(): LoginAction {
	// No payload needed for logout
	return {type: LoginActionType.Logout, payload: null};
}

export function register(user: User): LoginAction {
	return {type: LoginActionType.Register, payload: user};
}

export function setAllUsers(users: User[]): LoginAction {
	return {type: LoginActionType.SetAllUsers, payload: users};
}

//reducer
export function loginReducer(
	currentState: LoginState = new LoginState(), // Default initial state
	action: LoginAction,
): LoginState {
	const newState: LoginState = {...currentState};

	switch (action.type) {
		case LoginActionType.Login:
			newState.users = [action.payload];
			break;
		case LoginActionType.Logout:
			newState.users = [];
			break;
		case LoginActionType.SetAllUsers:
			newState.users = action.payload;
			break;
		case LoginActionType.Register:
			newState.users.push(action.payload);
			break;
		default:
			break;
	}

	return newState;
}

