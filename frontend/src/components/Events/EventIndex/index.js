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
import { removeSearch } from "../../../store/search";
import "../ReadEvent/ReadEvent.css";
import Loading from "../../Loading";

//main
const EventIndex = () => {
	let dispatch = useDispatch();
	let [errors, setErrors] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

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
	}, [dispatch]);

	const resetGroupsHandler = () => {
		dispatch(removeSearch());
	};

	let selector = useSelector((state) => state.events);
	if (search) {
		selector = search;
	}
	const events = Object.values(selector);

	if (isLoaded) {
		//return
		return (
			<div className="margin-groups-container">
				<div id="group-detail-header">
					<NavLink
						className="groups-page-link remove-color"
						exact
						to="/groups"
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
					<div className="groups-margin-div" />
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
