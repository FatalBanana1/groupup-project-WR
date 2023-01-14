//groups reducer

//imports
import { csrfFetch } from "./csrf";

//----------------------------------------------

//types crud - groups
const READ_GROUPS = `groups/READ`;
const CREATE_GROUPS = `groups/CREATE`;
const UPDATE_GROUPS = `groups/UPDATE`;
const DELETE_GROUPS = `groups/DELETE`;

//----------------------------------------------

//regular actions
const actionReadGroups = (groups) => ({
	type: READ_GROUPS,
	groups,
});

//----------------------------------------------

//thunk actions

// GET: Get All Groups Route: /api/groups
export const thunkReadGroups = () => async (dispatch) => {
	const response = await csrfFetch(`/api/groups`);
	// console.log(response);

	if (response.ok) {
		const groups = await response.json();
		// console.log(`thunk-----`, groups);
		dispatch(actionReadGroups(groups));
		return groups;
	}
};

//----------------------------------------------

//reducer

const initialState = {};

const groupsReducer = (state = initialState, action) => {
	switch (action.type) {
		case READ_GROUPS: {
			const newGroups = {};
			// console.log(`reducer>>>>>>>`, action.groups.Groups);
			action.groups.Groups.forEach((group) => {
				newGroups[group.id] = group;
			});
			return {
				...state,
				...newGroups,
			};
		}

		default:
			return state;
	}
};

export default groupsReducer;
