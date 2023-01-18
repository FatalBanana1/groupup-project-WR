//groups reducer

//imports
import { csrfFetch } from "./csrf";

//----------------------------------------------

//types crud - groups
const READ_MEMBERS = `members/READ`;
const READ_MEMBER_DETAILS = `member/READ`;
const CREATE_MEMBERSHIP = `member/CREATE`;
const UPDATE_MEMBERSHIP = `member/UPDATE`;
const DELETE_MEMBERSHIP = `member/DELETE`;

//----------------------------------------------

//regular actions
//read
const actionReadMembers = (members) => ({
	type: READ_MEMBERS,
	members,
});

//read group details
const actionReadMemberDetails = (member) => ({
	type: READ_MEMBER_DETAILS,
	member,
});

//create
const actionCreateMembership = (membership) => ({
	type: CREATE_MEMBERSHIP,
	membership,
});

//update
const actionUpdateMembership = (membership) => ({
	type: UPDATE_MEMBERSHIP,
	membership,
});

//delete
const actionDeleteMembership = (membership) => ({
	type: DELETE_MEMBERSHIP,
	membership,
});

//----------------------------------------------

//thunk actions

// GET: Get All Members of a Group - Route: /api/groups/:groupId/members
export const thunkReadMembers = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/groups/${payload.id}/members`);

	if (response.ok) {
		const members = await response.json();
		dispatch(actionReadMembers(members));
		return members;
	}
};

// GET: Get All Groups by Current User - Route: /api/groups/current
export const thunkReadMemberDetails = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/groups/current`);
	// console.log(`response = thunk -----------`, response);

	if (response.ok) {
		const member = await response.json();
		dispatch(actionReadMemberDetails(member));
		return member;
	}
};

// POST: Request Membership to a Group - Route: /api/groups/:groupId/membership
export const thunkCreateMembership = (payload) => async (dispatch) => {
	const response = await csrfFetch(
		`/api/groups/${payload.groupId}/membership`,
		{
			method: `POST`,
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		}
	);

	if (response.ok) {
		const member = await response.json();
		dispatch(actionCreateMembership(member));
		return member;
	}
};

// PUT: Change membership status Route: /api/groups/:groupId/membership
export const thunkUpdateMembership = (payload) => async (dispatch) => {
	const response = await csrfFetch(
		`/api/groups/${payload.groupId}/membership`,
		{
			method: `PUT`,
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		}
	);

	if (response.ok) {
		const member = await response.json();
		dispatch(actionUpdateMembership(member));
		return member;
	}
};

// DELETE: Delete a Group Membership - Route: /api/groups/:groupId/membership
export const thunkDeleteGroup = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/groups/${payload.id}/membership`, {
		method: `DELETE`,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const member = await response.json();
		dispatch(actionDeleteMembership(member));
		return member;
	}
};

//----------------------------------------------

//reducer

const initialState = {};

const memberReducer = (state = initialState, action) => {
	switch (action.type) {
		case READ_MEMBERS: {
			console.log(`reducer>>>>>>>>>>>>>`, action.group);
			// if (action.groups.Groups) {
			// 	const newGroups = {};
			// 	action.groups.Groups.forEach((group) => {
			// 		newGroups[group.id] = group;
			// 	});
			// 	return {
			// 		...state,
			// 		...newGroups,
			// 	};
			// } else {
			// 	return null;
			// }
		}

		case READ_MEMBER_DETAILS: {
			console.log(`reducer>>>>>>>>>>>>>`, action.group);
			// action.group["privated"] = action.group.private;
			// return {
			// 	...state,
			// 	...action.group,
			// };
		}

		case CREATE_MEMBERSHIP: {
			console.log(`reducer>>>>>>>>>>>>>`, action.group);
			// const newState = {
			// 	...state,
			// 	[action.group.id]: action.group,
			// };
			// return newState;
		}

		case UPDATE_MEMBERSHIP: {
			console.log(`reducer>>>>>>>>>>>>>`, action.group);
			// return { ...state, ...(state[action.group.id] = action.group) };
		}

		case DELETE_MEMBERSHIP: {
			console.log(`reducer>>>>>>>>>>>>>`, action.group);
			// const newState = { ...state };
			// delete newState[action.group.id];
			// return newState;
		}

		default:
			return state;
	}
};

export default memberReducer;
