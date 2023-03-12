//imports
import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import CreateEventModalButton from "../CreateEvent/CreateEventModalButton";
import ReadEvent from "../ReadEvent";
import CreateEvent from "../CreateEvent";
import "../Events.css";

//main
const EventsByGroup = ({ events }) => {
	let [errors, setErrors] = useState([]);
	let { groupId } = useParams();

	// //-----------------
	const [showMenu, setShowMenu] = useState(false);
	const closeMenu = () => setShowMenu(false);
	// //----------------
	const user = useSelector((state) => state.session.user);
	const groups = useSelector((state) => state.groups);
	const group = groups[groupId];
	const org = group.organizerId === user.id;

	//return
	return (
		<div className="margin-events-container">
			<div className="groups-events-container events-padding-top">
				<div className="create-event-ct">
					{user && org ? (
						<div className="groups-link-container-signin">
							<CreateEventModalButton
								className="splash-link join-group"
								buttonText="Create an Event"
								id="create-splash"
								onButtonClick={closeMenu}
								modalComponent={<CreateEvent />}
							/>
						</div>
					) : null}
				</div>

				{events.length ? (
					<div id="group-detail-container">
						{events.map((event) => {
							if (event && event.id >= 0) {
								return (
									<NavLink
										className="event-detail"
										key={event.id}
										to={`/events/${event.id}`}
									>
										<ReadEvent event={event} />
									</NavLink>
								);
							}
						})}
					</div>
				) : (
					<div className="no-display">No Events to Display...</div>
				)}
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
