//groups reducer

//imports
import { csrfFetch } from "./csrf";

//----------------------------------------------

//types crud - groups
const READ_GROUPS = `groups/READ`;
const READ_GROUP_DETAILS = `group/READ`;
const CREATE_GROUP = `groups/CREATE`;
const UPDATE_GROUP = `groups/UPDATE`;
const DELETE_GROUP = `groups/DELETE`;
const RESET = "group/resetState";

//----------------------------------------------

//regular actions
//read
const actionReadGroups = (groups) => ({
	type: READ_GROUPS,
	groups,
});

//read group details
const actionReadGroupDetails = (group) => ({
	type: READ_GROUP_DETAILS,
	group,
});

//create
const actionCreateGroup = (group) => ({
	type: CREATE_GROUP,
	group,
});

//update
const actionUpdateGroup = (group) => ({
	type: UPDATE_GROUP,
	group,
});

//delete
const actionDeleteGroup = (group) => ({
	type: DELETE_GROUP,
	group,
});

//reset
export const actionResetState = () => ({
	type: RESET,
});

//----------------------------------------------

//thunk actions

// GET: Get All Groups Route: /api/groups
export const thunkReadGroups = (payload) => async (dispatch) => {
	let response;
	// console.log(`thunk>>> payload: `, payload);
	if (payload) {
		response = await csrfFetch(`/api/groups${payload}`);
	} else {
		response = await csrfFetch(`/api/groups`);
	}

	if (response.ok) {
		const groups = await response.json();
		dispatch(actionReadGroups(groups));
		// console.log(`thunk>>> groups: `, groups);
		return groups;
	}
};

// GET: Get details of a Group Route: /api/groups/:groupId
export const thunkReadGroupDetails = (payload) => async (dispatch) => {
	// console.log(`response = thunk -----------`, payload);
	const response = await csrfFetch(`/api/groups/${payload}`);

	if (response.ok) {
		const group = await response.json();
		dispatch(actionReadGroupDetails(group));
		return group;
	}
};

// POST: Create a Group Route: /api/groups
export const thunkCreateGroups = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/groups`, {
		method: `POST`,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const group = await response.json();
		dispatch(actionCreateGroup(group));
		return group;
	}
};

// PUT: Edit a Group Route: /api/groups/:groupId
export const thunkUpdateGroup = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/groups/${payload.id}`, {
		method: `PUT`,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const group = await response.json();
		dispatch(actionUpdateGroup(group));
		return group;
	}
};

// DELETE: Delete a Group Route: /api/groups/:groupId
export const thunkDeleteGroup = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/groups/${payload.groupId}`, {
		method: `DELETE`,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	// console.log(`group id in THUNK>>>>>>>`,response);
	if (response.ok) {
		const group = await response.json();
		dispatch(actionDeleteGroup(group));
		return group;
	}
};

//----------------------------------------------

//reducer

function defaultState() {
	const initialState = {};
	// return action.groups.Groups.reduce((acc, group) => {
	// 	acc[group.id] = group;
	// 	return acc;
	// }, {});
	return initialState;
}

const groupsReducer = (state = defaultState(), action) => {
	switch (action.type) {
		case READ_GROUPS: {
			// console.log(`reducer>>> groups: `, action.groups);

			const newGroups = action.groups.Groups.reduce((acc, group) => {
				acc[group.id] = group;
				return acc;
			}, {});
			return {
				...state,
				...newGroups,
			};
		}

		case READ_GROUP_DETAILS: {
			action.group["privated"] = action.group.private;
			return {
				...state,
				...action.group,
			};
		}

		case CREATE_GROUP: {
			const newState = {
				...state,
				[action.group.id]: action.group,
			};
			return newState;
		}

		case UPDATE_GROUP: {
			return { ...state, ...(state[action.group.id] = action.group) };
		}

		case DELETE_GROUP: {
			const newState = { ...state };
			delete newState[action.group.id];
			return newState;
		}

		case RESET:
			return defaultState();

		default:
			return state;
	}
};

export default groupsReducer;
