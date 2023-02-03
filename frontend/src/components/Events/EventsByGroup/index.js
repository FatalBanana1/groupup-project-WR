//groups page

//imports
//hooks
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkReadEvents, thunkReadEventsbyGroup } from "../../../store/events";
import { NavLink, useParams } from "react-router-dom";
import CreateEventModalButton from "../CreateEvent/CreateEventModalButton";
import OpenModalButton from "../../OpenModalButton";
import * as sessionActions from "../../../store/session";
import ReadEvent from "../ReadEvent";
import CreateEvent from "../CreateEvent";
import LoginFormModal from "../../LoginFormModal";
import { removeSearch } from "../../../store/search";
import "../ReadEvent/ReadEvent.css";

//main
const EventsByGroup = ({ events }) => {
	let dispatch = useDispatch();
	let [errors, setErrors] = useState([]);
	// const [isLoaded, setIsLoaded] = useState(false);

	// //-----------------

	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const closeMenu = () => setShowMenu(false);

	// //----------------
	const user = useSelector((state) => state.session.user);

	// useEffect(() => {
	// 	dispatch(thunkReadEventsbyGroup())
	// 		.then(() => setIsLoaded(true))
	// 		.catch(async (res) => {
	// 			const data = await res.json();
	// 			if (data && data.message)
	// 				setErrors((data[errors] = [data.message]));
	// 			if (data && data.errors) setErrors(Object.values(data.errors));
	// 		});
	// }, [dispatch]);

	console.log(`events BY group =====`, events);

	if (!events.length) {
		return <div className="no-display">No Events to Display...</div>;
	}

	//return
	return (
		<div className="margin-groups-container">
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
								buttonText="Create an Event"
								onButtonClick={closeMenu}
								modalComponent={<LoginFormModal />}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
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
export default EventsByGroup;
