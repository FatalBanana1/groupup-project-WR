//read group detail

//imports
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import {
// 	thunkCreateMembership,
// 	thunkReadMembers,
// 	thunkDeleteMembership,
// 	actionResetState,
// } from "../../../store/members";
import { NavLink, useHistory, useParams } from "react-router-dom";
// import OpenModalButton from "../../OpenModalButton";
import * as sessionActions from "../../../store/session";

//comps
import ReadMembers from "../../Memberships/ReadMembers";
import { thunkReadRsvps } from "../../../store/rsvps";
import ReadRsvp from "../ReadRsvp";
import "./RsvpIndex.css";

//main
const RsvpIndex = () => {
	let dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);

	let { eventId } = useParams();

	useEffect(() => {
		dispatch(thunkReadRsvps(eventId)).then(() => setIsLoaded(true));
	}, [dispatch]);

	let allRsvps = useSelector((state) => state.rsvps);

	let rsvps = Object.values(allRsvps);

	if (isLoaded) {
		//return
		return (
			<div id="member-container">
				<div id="member-headers">
					<div className="group-detail-header-members">
						<NavLink
							className="members-page-link curr-link"
							to={`/events/${eventId}/attendees`}
						>
							<h2>Attendees</h2>
						</NavLink>
					</div>
					<div className="group-detail-header-members">
						<NavLink
							className="members-page-link"
							to={`/events/${eventId}`}
						>
							<h2 id="header-groups-pg">Event</h2>
						</NavLink>
					</div>
					{rsvps.length ? (
						<div className="group-detail-header-members">
							<NavLink
								className="members-page-link"
								to={`/groups/${rsvps[0].Attendances[0].Event.groupId}`}
							>
								<h2>Group</h2>
							</NavLink>
						</div>
					) : null}
					{rsvps.length ? (
						<div className="group-detail-header-members">
							<NavLink
								className="members-page-link"
								to={`/groups/${rsvps[0].Attendances[0].Event.groupId}/members`}
							>
								<h2>Members</h2>
							</NavLink>
						</div>
					) : null}
				</div>

				<div className="rsvp-detail-container">
					{rsvps ? (
						rsvps.map((rsvp) => {
							if (!rsvp.firstName) {
								return null;
							} else {
								return (
									<NavLink
										id="group-detail"
										key={rsvp.id}
										to={`/events/${eventId}/attendees`}
									>
										<ReadRsvp rsvp={rsvp} />
									</NavLink>
								);
							}
						})
					) : (
						<div>No Members to display.</div>
					)}
				</div>
			</div>
		);
	} else return null;
};

//exports
export default RsvpIndex;

/*

{
	id,
	firstName,
	lastName,
	Attendances: [{userId, status, createdAt, Event: {
			groupId,
			id,
			venueId,
			name,
			description,
			type,
			capacity,
			price,
			startDate,
			endDate,
		}
	}]
	Memberships: [{groupId, status, createdAt}]

}


*/
