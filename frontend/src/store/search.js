// frontend/src/store/session.js

//imports
import { csrfFetch } from "./csrf";

//-------------------------------------------

//types
const SET_SEARCH = "search/setSearch";
const REMOVE_SEARCH = "session/removeSearch";

//-------------------------------------------

//reg actions
const setSearch = (query) => {
	return {
		type: SET_SEARCH,
		search: query,
	};
};

export const removeSearch = () => {
	return {
		type: REMOVE_SEARCH,
	};
};

//-------------------------------------------

//THUNKS
export const thunkSearch = (search) => async (dispatch) => {
	// console.log(`inside thunk for SEARCH-----`, search);
	const response = await csrfFetch(`/api/groups?name=${search}`);
	const data = await response.json();
	dispatch(setSearch(data));
	return response;
};

//-------------------------------------------

//reducer

const initialState = { search: null };

const searchReducer = (state = initialState, action) => {
	let newState = { ...state };
	switch (action.type) {
		case SET_SEARCH: {
			// console.log(`REDUCER search====>>>>`, action.search.Groups);

			newState.search = action.search.Groups;
			return newState;
		}

		case REMOVE_SEARCH: {
			newState.search = null;
			return newState;
		}

		default:
			return state;
	}
};

export default searchReducer;
