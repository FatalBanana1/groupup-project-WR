// //groups reducer

// //imports
// import { csrfFetch } from "./csrf";

// //----------------------------------------------

// //types crud - groups
// const READ_MEMBERS = `members/READ`;
// const READ_MEMBER_DETAILS = `member/READ`;
// const CREATE_MEMBERSHIP = `member/CREATE`;
// const UPDATE_MEMBERSHIP = `member/UPDATE`;
// const DELETE_MEMBERSHIP = `member/DELETE`;

// //----------------------------------------------

// //regular actions
// //read
// const actionReadMembers = (members) => ({
// 	type: READ_MEMBERS,
// 	members,
// });

// //read group details
// const actionReadMemberDetails = (member) => ({
// 	type: READ_MEMBER_DETAILS,
// 	member,
// });

// //create
// const actionCreateMembership = (membership) => ({
// 	type: CREATE_MEMBERSHIP,
// 	membership,
// });

// //update
// const actionUpdateMembership = (membership) => ({
// 	type: UPDATE_MEMBERSHIP,
// 	membership,
// });

// //delete
// const actionDeleteMembership = (membership) => ({
// 	type: DELETE_MEMBERSHIP,
// 	membership,
// });

// //----------------------------------------------

// //thunk actions

// // GET: Get All Members of a Group - Route: /api/groups/:groupId/members
// export const thunkReadMembers = (payload) => async (dispatch) => {
// 	const response = await csrfFetch(`/api/groups/${payload.id}/members`);

// 	if (response.ok) {
// 		const members = await response.json();
// 		dispatch(actionReadMembers(members));
// 		return members;
// 	}
// };

// // GET: Get All Groups by Current User - Route: /api/groups/current
// export const thunkReadMemberDetails = (payload) => async (dispatch) => {
// 	const response = await csrfFetch(`/api/groups/current`);
// 	// console.log(`response = thunk -----------`, response);

// 	if (response.ok) {
// 		const member = await response.json();
// 		dispatch(actionReadMemberDetails(member));
// 		return member;
// 	}
// };

// // POST: Request Membership to a Group - Route: /api/groups/:groupId/membership
// export const thunkCreateMembership = (payload) => async (dispatch) => {
// 	const response = await csrfFetch(`/api/groups`, {
// 		method: `POST`,
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify(payload),
// 	});

// 	if (response.ok) {
// 		const group = await response.json();
// 		dispatch(actionCreateGroup(group));
// 		console.log(`group=====thunk====`, group);
// 		return group;
// 	}
// };

// // PUT: Change membership status Route: /api/groups/:groupId/membership
// export const thunkUpdateGroup = (payload) => async (dispatch) => {
// 	const response = await csrfFetch(`/api/groups/${payload.id}`, {
// 		method: `PUT`,
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify(payload),
// 	});

// 	if (response.ok) {
// 		const group = await response.json();
// 		dispatch(actionUpdateGroup(group));
// 		return group;
// 	}
// };

// // DELETE: Delete a Group Membership - Route: /api/groups/:groupId/membership
// export const thunkDeleteGroup = (payload) => async (dispatch) => {
// 	const response = await csrfFetch(`/api/groups/${payload.id}`, {
// 		method: `DELETE`,
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify(payload),
// 	});

// 	if (response.ok) {
// 		const group = await response.json();
// 		dispatch(actionUpdateGroup(group));
// 		return group;
// 	}
// };

// //----------------------------------------------

// //reducer

// const initialState = {};

// const memberReducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case READ_GROUPS: {
// 			if (action.groups.Groups) {
// 				const newGroups = {};
// 				action.groups.Groups.forEach((group) => {
// 					newGroups[group.id] = group;
// 				});
// 				return {
// 					...state,
// 					...newGroups,
// 				};
// 			} else {
// 				return null;
// 			}
// 		}

// 		case READ_GROUP_DETAILS: {
// 			action.group["privated"] = action.group.private;
// 			return {
// 				...state,
// 				...action.group,
// 			};
// 		}

// 		case CREATE_GROUP: {
// 			const newState = {
// 				...state,
// 				[action.group.id]: action.group,
// 			};
// 			return newState;
// 		}

// 		case UPDATE_GROUP: {
// 			return { ...state, ...(state[action.group.id] = action.group) };
// 		}

// 		case DELETE_GROUP: {
// 			console.log(`reducer>>>>>>>>>>>>>`, action.group);
// 			const newState = { ...state };
// 			delete newState[action.group.id];
// 			return newState;
// 		}

// 		default:
// 			return state;
// 	}
// };

// export default memberReducer;
