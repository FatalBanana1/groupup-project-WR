import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";

//imports
import { Route } from "react-router-dom";
import Splash from "./components/Splash";
import Groups from "./components/Groups/GroupsIndex";
import GroupDetail from "./components/Groups/GroupDetail";
import Members from "./components/Memberships/Members";
import EventDetail from "./components/Events/EventDetail";
import RsvpIndex from "./components/Rsvp/RsvpIndex";
import EventIndex from "./components/Events/EventIndex";
import Footer from "./components/Footer";
import Scroller from "./components/Navigation/Scroller";
import NotFoundPage from "./components/NotFoundPage";

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
				<Scroller>
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
						<Route path="/groups?">
							<Groups />
						</Route>
						<Route path="/events/:eventId/attendees">
							<RsvpIndex />
						</Route>
						<Route path="/events/:eventId">
							<EventDetail />
						</Route>
						<Route exact path="/events">
							<EventIndex />
						</Route>
						<Route path="/events?name=">
							<EventIndex />
						</Route>
						<Route path="/notfound">
							<NotFoundPage />
						</Route>
						<Route>
							<NotFoundPage />
						</Route>
					</Switch>
				</Scroller>
			)}
			<Footer isLoaded={isLoaded} />
		</>
	);
}

export default App;

// eye dropper
// page ruler
// paint tool
