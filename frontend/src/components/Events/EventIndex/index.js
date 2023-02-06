//groups page

//imports
//hooks
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkReadEvents } from "../../../store/events";
import { NavLink, useParams } from "react-router-dom";
import CreateEventModalButton from "../CreateEvent/CreateEventModalButton";
import OpenModalButton from "../../OpenModalButton";
import * as sessionActions from "../../../store/session";
import ReadEvent from "../ReadEvent";
import CreateEvent from "../CreateEvent";
import LoginFormModal from "../../LoginFormModal";
import { removeSearch, thunkSearchEvents } from "../../../store/search";
import "../ReadEvent/ReadEvent.css";
import Loading from "../../Loading";

//main
const EventIndex = () => {
	let dispatch = useDispatch();
	let [errors, setErrors] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	let [search2, setSearch] = useState(1);

	//-----------------

	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const closeMenu = () => setShowMenu(false);

	//----------------
	const user = useSelector((state) => state.session.user);
	const search = useSelector((state) => state.search.search);

	useEffect(() => {
		dispatch(thunkReadEvents())
			.then(() => setIsLoaded(true))
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.message)
					setErrors((data[errors] = [data.message]));
				if (data && data.errors) setErrors(Object.values(data.errors));
			});
	}, [dispatch, isLoaded, search2]);

	const resetGroupsHandler = () => {
		setSearch(1);
		dispatch(removeSearch());
	};

	const nextPageHandler = () => {
		setIsLoaded(false);
		setSearch(search2 + 1);
		dispatch(thunkSearchEvents(search2 + 1)).then(() => setIsLoaded(true));
	};

	const previousPageHandler = () => {
		setIsLoaded(false);
		setSearch(search2 - 1);
		dispatch(thunkSearchEvents(search2 - 1)).then(() => setIsLoaded(true));
	};

	let selector = useSelector((state) => state.events);
	if (search) {
		selector = search;
	}
	const events = Object.values(selector);

	if (isLoaded) {
		// let newer = events.sort((a, b) => {
		// 	// console.log(b["id"]);
		// 	if (a.startDate - b.startDate > 0) {
		// 		return -1;
		// 	} else return 1;
		// });
		// let newer = events.sort((a, b) => a.startDate - b.startDate);
		// console.log(`Events++++++-=1111===`, events);
		// console.log(`Events++++++-=1111===`, newer[0]);

		//return
		return (
			<div className="center">
				<div className="margin-groups-container">
					<div className="sticky-groups">
						<div id="group-detail-header">
							<NavLink
								className="groups-page-link remove-color"
								exact
								to="/events"
								onClick={resetGroupsHandler}
							>
								<h2 id="header-groups-pg">Events</h2>
							</NavLink>
							<NavLink
								className="other-page-link remove-color"
								exact
								to="/groups"
								onClick={resetGroupsHandler}
							>
								<h2 id="header-groups-pg">Groups</h2>
							</NavLink>
						</div>
					</div>

					{isLoaded && search === `No Groups were found.` ? (
						<div className="nothing-found">{`${search}..`}</div>
					) : isLoaded ? (
						<div id="groups-container">
							<div id="group-detail-container">
								{events.map((event) => {
									if (event && event.id >= 0) {
										return (
											<NavLink
												id="event-detail"
												key={event.id}
												to={`/events/${event.id}`}
											>
												<ReadEvent event={event} />
											</NavLink>
										);
									}
								})}
							</div>

							<div className="pages">
								{search2 > 1 ? (
									<NavLink
										className="page-button"
										to={`/events?page=${search2 - 1}`}
										onClick={previousPageHandler}
									>
										{`< Previous Page`}
									</NavLink>
								) : null}
								{events.length === 10 ? (
									<NavLink
										className="page-button"
										onClick={nextPageHandler}
										to={`/events?page=${search2 + 1}`}
									>
										{`Next Page >`}
									</NavLink>
								) : null}
							</div>

							<div>
								{user ? (
									<div className="groups-link-container-signin">
										<CreateEventModalButton
											className="splash-link join-group"
											buttonText="Create an Event"
											id="create-splash"
											onButtonClick={closeMenu}
											modalComponent={<CreateEvent />}
										/>
									</div>
								) : (
									<div className="groups-link-container">
										<OpenModalButton
											props="link-buttons border"
											buttonText="Create an Event"
											onButtonClick={closeMenu}
											modalComponent={<LoginFormModal />}
										/>
									</div>
								)}
							</div>
						</div>
					) : null}
				</div>
			</div>
		);
	} else return <Loading />;
};

// {
// 	id
// 	name,
// 	description,
// 	type,
// 	numAttending,
// 	previewImage,
// 	price,
// 	capacity,
// 	startDate,
// 	venueId,
// 	type,
// 	Group,
// 	Venue,
// }

//exports
export default EventIndex;
