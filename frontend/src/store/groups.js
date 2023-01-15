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

	if (response.ok) {
		const groups = await response.json();
		dispatch(actionReadGroups(groups));
		return groups;
	}
};

// GET: Get All Groups Route: /api/groups
export const thunkCreateGroups = (payload) => async (dispatch) => {
	console.log(`BEFORE FETCH000000000000000000000`)

	const response = await csrfFetch(`/api/groups`, {
		method: `POST`,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	console.log(`response=======`, response);

	if (response.ok) {
		const group = await response.json();
		dispatch(actionCreateGroups(group));
		return group
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
			console.log(`reducer>>>>>>>>>>>>`, action.group);
			// if (!state[action.group.id]) {
			// 	const newState = {
			// 		...state,
			// 		[action.group.id]: action.group,
			// 	};
			// 	const groupList = newState.list.map((id) => newState[id]);
			// 	group.group.push(action.group);
			// 	return newState;
			// }
			return {
				// ...state,
				// [action.group.id]: {
				// 	...state[action.pokemon.id],
				// 	...action.pokemon,
				// },
			};
		}

		default:
			return state;
	}
};

export default groupsReducer;
