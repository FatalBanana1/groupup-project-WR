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
const RESET_GROUPS = "groups/resetState";

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
	type: RESET_GROUPS,
});

//----------------------------------------------

//thunk actions

// GET: Get All Groups Route: /api/groups
export const thunkReadGroups = (payload) => async (dispatch) => {
	let response;
	if (payload) {
		response = await csrfFetch(`/api/groups${payload}`);
	} else {
		response = await csrfFetch(`/api/groups`);
	}
	if (response.ok) {
		const groups = await response.json();
		dispatch(actionReadGroups(groups));
		return groups;
	}
};

// GET: Get groups by user
// Route: /api/groups/current
export const thunkReadGroupsCurrent = () => async (dispatch) => {
	let response = await csrfFetch(`/api/groups/current`);
	if (response.ok) {
		const groups = await response.json();
		dispatch(actionReadGroups(groups));
		return groups;
	}
};

// GET: Get details of a Group Route: /api/groups/:groupId
export const thunkReadGroupDetails = (payload) => async (dispatch) => {
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
	if (response.ok) {
		const group = await response.json();
		dispatch(actionDeleteGroup(group));
		return group;
	}
};

//----------------------------------------------

// handle group images

// Delete an Image for a Group
// delete - /api/group-images/:imageId
export const thunkDeleteGroupIMAGE = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/group-images/${payload.id}`, {
		method: `DELETE`,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});
	if (response.ok) {
		const group = await response.json();
		dispatch(actionUpdateGroup(group));
		return group;
	}
};

//Add an Image to a Group based on the Group's id
// post - api/groups/:groupId/images
export const thunkCreateGroupIMAGE = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/groups/${payload.id}/images`, {
		method: `POST`,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});
	if (response.ok) {
		const group = await response.json();
		dispatch(actionUpdateGroup(group));
		return group;
	}
};

//----------------------------------------------

//reducer

function defaultState() {
	const initialState = {};
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
				...newGroups,
			};
		}

		case READ_GROUP_DETAILS: {
			action.group["privated"] = action.group.private;
			const newState = { ...action.group };
			return {
				[action.group.id]: newState,
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
			return { ...state, [action.group.id]: action.group };
		}

		case DELETE_GROUP: {
			// const newState = { ...state };
			// delete newState[action.group.id];
			// return newState
			return defaultState();
		}

		case RESET_GROUPS:
			return defaultState();

		default:
			return state;
	}
};

export default groupsReducer;
