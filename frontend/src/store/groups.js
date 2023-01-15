//groups reducer

//imports
import { csrfFetch } from "./csrf";

//----------------------------------------------

//types crud - groups
const READ_GROUPS = `groups/READ`;
const CREATE_GROUP = `groups/CREATE`;
const UPDATE_GROUP = `groups/UPDATE`;
const DELETE_GROUP = `groups/DELETE`;

//----------------------------------------------

//regular actions
//read
const actionReadGroups = (groups) => ({
	type: READ_GROUPS,
	groups,
});

//create
const actionCreateGroups = (group) => ({
	type: CREATE_GROUP,
	group,
});

//update
const actionUpdateGroups = (group) => ({
	type: UPDATE_GROUP,
	group,
});

//delete
const actionDeleteGroups = (group) => ({
	type: DELETE_GROUP,
	group,
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
		case CREATE_GROUP: {
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
