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

//----------------------------------------------

//thunk actions

// GET: Get All Groups Route: /api/groups
export const thunkReadGroups = () => async (dispatch) => {
	const response = await csrfFetch(`/api/groups`);

	if (response.ok) {
		const groups = await response.json();
		dispatch(actionReadGroups(groups));
		return groups;
	}
};

// GET: Get details of a Group Route: /api/groups/:groupId
export const thunkReadGroupDetails = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/groups/${payload}`);
	// console.log(`response = thunk -----------`, response);

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
		console.log(`group=====thunk====`, group);
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

		case READ_GROUP_DETAILS: {
			action.group["privated"] = action.group.private;
			return {
				...state,
				...action.group,
			};
		}

		case CREATE_GROUP: {
			console.log(`reducer>>>>>>>>>>>>`, action.group);
			console.log(`reducer>>>>>>>>>>>>`, state[action.group.id]);
			console.log(`reducer>>>>>>>>>>>>`, action.group.group);
			// if (!state[action.group.id]) {
				const newState = {
					...state,
					[action.group.id]: action.group,
				};
			// 	const groupList = newState.list.map((id) => newState[id]);
			// 	group.group.push(action.group);
				return newState;
			// }

			// {
			// ...state,
			// [action.group.id]: {
			// 	...state[action.pokemon.id],
			// 	...action.pokemon,
			// },
			// };

			// return { ...state, ...(state[action.group.id] = action.group) };
		}

		default:
			return state;
	}
};

export default groupsReducer;
