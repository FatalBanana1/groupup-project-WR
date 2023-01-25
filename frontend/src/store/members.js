//members reducer

//imports
import { csrfFetch } from "./csrf";

//----------------------------------------------

//types crud - members
const READ_MEMBERS = `members/READ`;
const READ_MEMBER_DETAILS = `member/READ`;
const CREATE_MEMBERSHIP = `member/CREATE`;
const UPDATE_MEMBERSHIP = `member/UPDATE`;
const DELETE_MEMBERSHIP = `member/DELETE`;
const RESET = "member/resetState";

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

//reset
export const actionResetMember = () => ({
	type: RESET,
});

//----------------------------------------------

//thunk actions

// GET: Get All Members of a Group - Route: /api/groups/:groupId/members
export const thunkReadMembers = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/groups/${payload.groupId}/members`);

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
export const thunkDeleteMembership = (payload) => async (dispatch) => {
	const response = await csrfFetch(
		`/api/groups/${payload.groupId}/membership`,
		{
			method: `DELETE`,
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		}
	);
	console.log(`THUNK DELETE res`, response);

	if (response.ok) {
		const member = await response.json();
		dispatch(actionDeleteMembership(member));
		return member;
	}
};

//----------------------------------------------

//reducer

const initialState = {};

function defaultState() {
	const initialState = {};
	return initialState;
}

const memberReducer = (state = defaultState(), action) => {
	switch (action.type) {
		case READ_MEMBERS: {
			if (action.members.Members[0]) {
				// const newMembers = [...action.members.Members];
				const newMembers = action.members.Members.reduce(
					(acc, member) => {
						acc[member.id] = member;
						return acc;
					},
					{}
				);
				return {
					...state,
					...newMembers,
				};
			} else {
				return null;
			}
		}

		case READ_MEMBER_DETAILS: {
			// console.log(`reducer>>>>>>>>>>>>>`, action.group);
			// action.group["privated"] = action.group.private;
			// return {
			// 	...state,
			// 	...action.group,
			// };
		}

		case CREATE_MEMBERSHIP: {
			const newState = {
				...state,
				[action.membership.id]: action.membership,
			};
			return newState;
		}

		case UPDATE_MEMBERSHIP: {
			return {
				...state,
				...(state[action.membership.memberId] = action.membership),
			};
		}

		case DELETE_MEMBERSHIP: {
			const newState = { ...state };
			delete newState[action.membership.id];
			return newState;
		}

		case RESET:
			return defaultState();

		default:
			return state;
	}
};

export default memberReducer;
