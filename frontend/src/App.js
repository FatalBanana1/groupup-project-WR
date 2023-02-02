import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

//imports
import { Route } from "react-router-dom";
import Splash from "./components/Splash";
import Groups from "./components/Groups";
import GroupDetail from "./components/GroupDetail";
import Members from "./components/JoiningGroups/Members";
import ReadEvents from "./components/Events/ReadEvents";
import EventDetail from "./components/Events/EventDetail";
import RsvpIndex from "./components/Rsvp/RsvpIndex";

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<Switch>
					<Route exact path="/">
						<Splash />
					</Route>

					<Route path="/groups/:groupId/members">
						<Members />
					</Route>

					<Route path="/groups/:groupId">
						<GroupDetail />
					</Route>

					<Route exact path="/groups">
						<Groups />
					</Route>

					<Route path="/groups?name=">
						<Groups />
					</Route>

					<Route path="/events/:eventId/attendees">
						<RsvpIndex />
					</Route>

					<Route path="/events/:eventId">
						<EventDetail />
					</Route>

					<Route exact path="/events">
						<ReadEvents />
					</Route>

					<Route path="/events?name=">
						<ReadEvents />
					</Route>

					<Route>
						<div>404: Error Not Found.</div>
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;

// eye dropper
// page ruler
// paint tool
