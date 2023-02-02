//groups reducer

//imports
import { csrfFetch } from "./csrf";

//----------------------------------------------

//types crud - groups
const READ_EVENTS = `events/READ`;
const READ_EVENT_DETAILS = `event/READ`;
const CREATE_EVENT = `events/CREATE`;
const UPDATE_EVENT = `events/UPDATE`;
const DELETE_EVENT = `events/DELETE`;
const RESET_EVENT = "event/resetState";

//----------------------------------------------

//regular actions
//read
const actionReadEvents = (events) => ({
	type: READ_EVENTS,
	events,
});

//read event details
const actionReadEventDetails = (event) => ({
	type: READ_EVENT_DETAILS,
	event,
});

//create
const actionCreateEvent = (event) => ({
	type: CREATE_EVENT,
	event,
});

//update
const actionUpdateEvent = (event) => ({
	type: UPDATE_EVENT,
	event,
});

//delete
const actionDeleteEvent = (event) => ({
	type: DELETE_EVENT,
	event,
});

//reset
export const actionResetStateEvent = () => ({
	type: RESET_EVENT,
});

//----------------------------------------------

//thunk actions

// GET: Get All Events Route: /api/events
export const thunkReadEvents = (payload) => async (dispatch) => {
	let response;
	// console.log(`thunk>>> payload: `, payload);
	if (payload) {
		response = await csrfFetch(`/api/events${payload}`);
	} else {
		response = await csrfFetch(`/api/events`);
	}

	if (response.ok) {
		const events = await response.json();
		dispatch(actionReadEvents(events));
		// console.log(`thunk>>> events: `, events);
		return events;
	}
};

// GET: Get details of an Event Route: /api/events/:eventId
export const thunkReadEventDetails = (payload) => async (dispatch) => {
	// console.log(`response = thunk -----------`, payload);
	const response = await csrfFetch(`/api/events/${payload}`);

	if (response.ok) {
		const event = await response.json();
		dispatch(actionReadEventDetails(event));
		return event;
	}
};

// POST: Create Event Route: /api/events
export const thunkCreateEvent = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/events`, {
		method: `POST`,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const event = await response.json();
		dispatch(actionCreateEvent(event));
		return event;
	}
};

// PUT: Edit Event Route: /api/event/:eventId
export const thunkUpdateEvent = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/events/${payload.id}`, {
		method: `PUT`,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	if (response.ok) {
		const event = await response.json();
		dispatch(actionUpdateEvent(event));
		return event;
	}
};

// DELETE: Delete Event Route: /api/events/:eventId
export const thunkDeleteEvent = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/events/${payload.eventId}`, {
		method: `DELETE`,
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});

	// console.log(`group id in THUNK>>>>>>>`,response);
	if (response.ok) {
		const event = await response.json();
		dispatch(actionDeleteEvent(event));
		return event;
	}
};

//----------------------------------------------

//reducer

function defaultState() {
	const initialState = {};
	return initialState;
}

const eventsReducer = (state = defaultState(), action) => {
	switch (action.type) {
		case READ_EVENTS: {
			// console.log(`reducer>>> groups: `, action.events);
			const newEvents = action.events.Events.reduce((acc, event) => {
				acc[event.id] = event;
				return acc;
			}, {});
			return {
				...newEvents,
			};
		}

		case READ_EVENT_DETAILS: {
			return {
				...state,
				...action.group,
			};
		}

		case CREATE_EVENT: {
			const newState = {
				...state,
				[action.event.id]: action.event,
			};
			return newState;
		}

		case UPDATE_EVENT: {
			return { ...state, ...(state[action.event.id] = action.event) };
		}

		case DELETE_EVENT: {
			const newState = { ...state };
			delete newState[action.event.id];
			return newState;
		}

		case RESET_EVENT:
			return defaultState();

		default:
			return state;
	}
};

export default eventsReducer;
