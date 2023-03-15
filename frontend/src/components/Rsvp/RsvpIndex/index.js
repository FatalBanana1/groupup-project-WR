//read group detail

//imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { thunkReadEventDetails } from "../../../store/events";
import {
	thunkCreateRsvp,
	thunkDeleteRsvp,
	thunkReadRsvps,
} from "../../../store/rsvps";
import Loading from "../../Loading";
import ReadRsvp from "../ReadRsvp";
import "./RsvpIndex.css";

//main
const RsvpIndex = () => {
	let dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);

	let { eventId } = useParams();

	useEffect(() => {
		let payload = {
			eventId,
		};
		dispatch(thunkReadRsvps(payload))
			.then(() => dispatch(thunkReadEventDetails(eventId)))
			.then(() => setIsLoaded(true));
	}, [dispatch]);

	let user = useSelector((state) => state.session.user);
	let allRsvps = useSelector((state) => state.rsvps);
	let events = useSelector((state) => state.events);
	let event = events[eventId];

	let rsvps = Object.values(allRsvps);

	if (isLoaded && rsvps && user) {
		//dates
		const formatStart = new Date(event.startDate).toLocaleDateString(
			"en-US",
			{
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
				hour: "numeric",
				minute: "numeric",
			}
		);
		const formatEnd = new Date(event.endDate).toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
		});
		// const price = event.price.toLocaleString("en-US", {
		// 	style: "currency",
		// 	currency: "USD",
		// });

		const curr = rsvps.find((el) => el.id === user.id);
		let member;
		let status;
		let attending;
		if (curr) {
			member = curr.Memberships.find(
				(el) => el.groupId === event.groupId
			);
			status = member.status;
			attending = curr.Attendances[0].status;
		}
		if (!curr) {
			member = event.Group.Memberships.find(
				(el) => el.userId === user.id
			);
			if (member) {
				status = member.status;
			}
		}

		//--------------------------------------------------------------
		//handlers

		const createRsvp = () => {
			let payload = { eventId, userId: user.id };
			dispatch(thunkCreateRsvp(payload)).then(() =>
				dispatch(thunkReadRsvps(payload))
			);
		};

		const deleteRsvp = () => {
			let payload = { eventId, userId: user.id };
			dispatch(thunkDeleteRsvp(payload)).then(() =>
				dispatch(thunkReadRsvps(payload))
			);
		};

		//--------------------------------------------------------------

		// console.log(`front rsvp index-------------------`, rsvps);
		// console.log(`front rsvp index-------------------`, member);

		//return
		return (
			<>
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

						<div className="group-detail-header-members">
							<NavLink
								className="members-page-link"
								to={`/groups/${event.groupId}`}
							>
								<h2>Group</h2>
							</NavLink>
						</div>
					</div>

					<div className="rsvp-detail-container">
						{rsvps && rsvps.length > 0 ? (
							rsvps.map((rsvp) => {
								if (!rsvp.firstName) {
									return null;
								} else {
									return (
										<div
											id="group-detail"
											className="group-detail-first"
											key={rsvp.id}
										>
											<ReadRsvp
												rsvp={rsvp}
												user={user}
												status={status}
											/>
										</div>
									);
								}
							})
						) : (
							<div className="none">No Attendees to display.</div>
						)}
					</div>
				</div>

				<div
					className="attend-ct"
					title={`${
						!member ? "Must be Group Member to Attend Event" : ""
					}`}
				>
					<div>
						<div className="date-attend">Date:</div>
						<div className="date-attend-time">{`${formatStart} to ${formatEnd}`}</div>
					</div>

					<div>
						<div className="price-attend">Price:</div>
						<div className="price-attend">{`$${event.price}.00`}</div>
					</div>

					{attending && member ? (
						<div
							className="event-attend splash-group-button"
							onClick={deleteRsvp}
						>
							Not Attend
						</div>
					) : !attending && member ? (
						<div
							className="event-attend splash-group-button"
							onClick={createRsvp}
						>
							Attend
						</div>
					) : null}
				</div>
			</>
		);
	} else return <Loading />;
};

//exports
export default RsvpIndex;
