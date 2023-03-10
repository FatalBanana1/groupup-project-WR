//read group detail

//imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { thunkReadEventDetails } from "../../../store/events";
import { thunkReadRsvps } from "../../../store/rsvps";
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

	let allRsvps = useSelector((state) => state.rsvps);
	let events = useSelector((state) => state.events);
	let event = events[eventId];

	let rsvps = Object.values(allRsvps);

	if (isLoaded && rsvps) {
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
		const price = event.price.toLocaleString("en-US", {
			style: "currency",
			currency: "USD",
		});

		// console.log(`front rsvp index-------------------`, price);

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
						{rsvps ? (
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
											<ReadRsvp rsvp={rsvp} />
										</div>
									);
								}
							})
						) : (
							<div>No Members to display.</div>
						)}
					</div>
				</div>

				<div className="attend-ct">
					<div>
						<div className="date-attend">Date:</div>
						<div className="date-attend-time">{`${formatStart} to ${formatEnd}`}</div>
					</div>

					<div>
						<div className="price-attend">Price:</div>
						<div className="price-attend">{`${price}`}</div>
					</div>

					<div className="event-attend splash-group-button">
						Attend
					</div>
				</div>
			</>
		);
	} else return <Loading />;
};

//exports
export default RsvpIndex;
