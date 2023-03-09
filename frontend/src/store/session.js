// frontend/src/store/session.js

//imports
import { csrfFetch } from "./csrf";

//-------------------------------------------

//types
const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const RESET_SESSION = "session/resetUser";

//-------------------------------------------

//reg actions
const setUser = (user) => {
	return {
		type: SET_USER,
		payload: user,
	};
};

const removeUser = () => {
	return {
		type: REMOVE_USER,
	};
};

//-------------------------------------------

//THUNKS
export const login = (user) => async (dispatch) => {
	const { credential, password } = user;
	const response = await csrfFetch("/api/session", {
		method: "POST",
		body: JSON.stringify({
			credential,
			password,
		}),
	});
	const data = await response.json();
	dispatch(setUser(data.user));
	return response;
};

export const restoreUser = () => async (dispatch) => {
	const response = await csrfFetch("/api/session");
	const data = await response.json();
	dispatch(setUser(data.user));
	return response;
};

export const signup = (user) => async (dispatch) => {
	const { username, firstName, lastName, email, password } = user;
	const response = await csrfFetch("/api/users", {
		method: "POST",
		body: JSON.stringify({
			username,
			firstName,
			lastName,
			email,
			password,
		}),
	});
	const data = await response.json();
	dispatch(setUser(data.user));
	return response;
};

export const logout = () => async (dispatch) => {
	const response = await csrfFetch("/api/session", {
		method: "DELETE",
	});
	dispatch(removeUser());
	return response;
};

export const actionResetUser = () => ({
	type: RESET_SESSION,
});

//-------------------------------------------

//reducer

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
	let newState = { ...state };
	switch (action.type) {
		case SET_USER:
			newState.user = action.payload;
			return newState;
		case REMOVE_USER:
			newState.user = null;
			return newState;

		case RESET_SESSION:
			return initialState;

		default:
			return state;
	}
};

export default sessionReducer;
