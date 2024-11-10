import {User} from "../interfaces/User";

export class LoginState {
	public users: User[] = [];
}

// actionTypes
export enum LoginActionType {
	Login = "LOG_IN",
	Logout = "LOG_OUT",
	Registry = "REGISTERY",
	setAllUsersAction = "Set_All_Users_Action",
}

export interface LoginAction {
	type: LoginActionType;
	payload: any;
}

export function login(login: User): LoginAction {
	return {type: LoginActionType.Login, payload: login};
}
export function logout(login: User): LoginAction {
	return {type: LoginActionType.Logout, payload: login};
}
export function registry(user: User): LoginAction {
	return {type: LoginActionType.Registry, payload: user};
}
export function setAllUsersAction(posts: User[]): LoginAction {
	return {type: LoginActionType.setAllUsersAction, payload: posts};
}

//reducer
export function loginReducer(
	currentState: LoginState = new LoginState(),
	action: LoginAction,
): LoginState {
	const newState: LoginState = {...currentState};

	switch (action.type) {
		case LoginActionType.Login:
			newState.users = [action.payload]; // Store the logged-in user
			break;
		case LoginActionType.Logout:
			newState.users = []; // Clear the users on logout
			break;
		case LoginActionType.setAllUsersAction:
			newState.users = action.payload;
			break;
		case LoginActionType.Registry:
			newState.users.push(action.payload);
			break;
		default:
			break;
	}

	return newState;
}
