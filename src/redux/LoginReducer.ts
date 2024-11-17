import {User} from "../interfaces/User";

//  Login Reducer
export class LoginState {
	public user: User[] = [];
}

const initialLoginState: LoginState = {
	user: [],
};

export enum LoginActionType {
	Login = "login",
	Logout = "Logout",
	Register = "Register",
	SetAllUsers = "SetAllUsers",
}

export interface LoginAction {
	type: LoginActionType;
	payload: User | User[];
}

export function login(user: User): LoginAction {
	return {type: LoginActionType.Login, payload: user};
}

export function logout(): LoginAction {
	return {type: LoginActionType.Logout, payload: []};
}

export function register(user: User): LoginAction {
	return {type: LoginActionType.Register, payload: user};
}

export function setAllUsers(users: User[]): LoginAction {
	return {type: LoginActionType.SetAllUsers, payload: users};
}

export function loginReducer(
	currentState: LoginState = initialLoginState,
	action: LoginAction,
): LoginState {
	const newState = {...currentState};

	switch (action.type) {
		case LoginActionType.Login:
			newState.user.push(action.payload as User);
			break;

		case LoginActionType.Logout:
			newState.user = [];
			break;

		case LoginActionType.SetAllUsers:
			newState.user = [...(action.payload as User[])];
			break;

		case LoginActionType.Register:
			newState.user = [...newState.user, action.payload as User];
			break;

		default:
			return currentState;
	}

	return newState;
}
