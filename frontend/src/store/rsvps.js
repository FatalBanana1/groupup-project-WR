//rsvps reducer

//imports
import { csrfFetch } from "./csrf";

//----------------------------------------------

//types crud - rsvps
const READ_RSVPS = `rsvps/READ`;
const READ_RSVP_DETAILS = `rsvp/READ`;
const CREATE_RSVP = `rsvps/CREATE`;
const UPDATE_RSVP = `rsvps/UPDATE`;
const DELETE_RSVP = `rsvps/DELETE`;
const RESET_RSVP = "rsvps/resetState";

//----------------------------------------------

//regular actions
//read
const actionReadRsvps = (rsvps) => ({
	type: READ_RSVPS,
	rsvps,
});

//create
const actionCreateRsvp = (rsvp) => ({
	type: CREATE_RSVP,
	rsvp,
});

//update
const actionUpdateRsvp = (rsvp) => ({
	type: UPDATE_RSVP,
	rsvp,
});

//delete
const actionDeleteRsvp = (rsvp) => ({
	type: DELETE_RSVP,
	rsvp,
});

//reset
export const actionResetStateRsvp = () => ({
	type: RESET_RSVP,
});

//----------------------------------------------

//thunk actions

// GET: Get All Attendees of an event Route: /api/events/:eventId/attendees
export const thunkReadRsvps = (payload) => async (dispatch) => {
	let response = await csrfFetch(`/api/events/${payload}/attendees`);
	// console.log(`thunk>>> events: `, events);

	if (response.ok) {
		const rsvps = await response.json();
		dispatch(actionReadRsvps(rsvps));
		return rsvps;
	}
};

// POST: Create - request attendance to event Route: /api/events/:eventId/attendance
export const thunkCreateRsvp = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/events/${payload}/attendees`, {
		method: `POST`,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const rsvp = await response.json();
		dispatch(actionCreateRsvp(rsvp));
		return rsvp;
	}
};

// PUT: Edit - change attendance status Route: /api/events/:eventId/attendance
export const thunkUpdateRsvp = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/events/${payload}/attendance`, {
		method: `PUT`,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const rsvp = await response.json();
		dispatch(actionUpdateRsvp(rsvp));
		return rsvp;
	}
};

// DELETE: Delete attendance Route: /api/events/:eventId/attendance
export const thunkDeleteRsvp = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/events/${payload}/attendance`, {
		method: `DELETE`,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	// console.log(`group id in THUNK>>>>>>>`,response);
	if (response.ok) {
		const rsvp = await response.json();
		dispatch(actionDeleteRsvp(rsvp));
		return rsvp;
	}
};

//----------------------------------------------

//reducer

function defaultState() {
	const initialState = {};
	return initialState;
}

const rsvpsReducer = (state = defaultState(), action) => {
	switch (action.type) {
		case READ_RSVPS: {
			// console.log(`reducer>>> rsvps: `, action.rsvps);
			const newState = action.rsvps.Attendees.reduce((acc, rsvp) => {
				acc[rsvp.id] = rsvp;
				return acc;
			}, {});
			return {
				...state,
				...newState,
			};
		}

		case READ_RSVP_DETAILS: {
			const newState = { ...action.rsvp };
			return {
				...state,
				[action.rsvp.id]: newState,
			};
		}

		case CREATE_RSVP: {
			const newState = {
				...state,
				[action.rsvp.id]: action.rsvp,
			};
			return newState;
		}

		case UPDATE_RSVP: {
			return { ...state, ...(state[action.rsvp.id] = action.rsvp) };
		}

		case DELETE_RSVP: {
			const newState = { ...state };
			delete newState[action.rsvp.id];
			return newState;
		}

		case RESET_RSVP:
			return defaultState();

		default:
			return state;
	}
};

export default rsvpsReducer;
