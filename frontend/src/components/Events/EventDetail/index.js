//event detail js

//imports
//hooks
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../../OpenModalButton";
import DeleteModalButton from "../../Groups/DeleteGroup/DeleteModalButton.js";
import EditModalButton from "../../Groups/UpdateGroup/EditModalButton.js";
import * as sessionActions from "../../../store/session";
import { NavLink, useHistory, useParams } from "react-router-dom";

//comps
import { thunkReadEventDetails } from "../../../store/events";
import UpdateGroup from "../../Groups/UpdateGroup";
import "./EventDetail.css";
import DeleteGroup from "../../Groups/DeleteGroup";
import ErrorHandler from "../../ErrorHandler";
// import { thunkReadMembers } from "../../../store/members";
import LoginFormModal from "../../LoginFormModal";
import clock from "../../Groups/images/clock-icon.png";
import location from "../../Groups/images/location-icon.png";

//main
const EventDetail = () => {
	//states
	let dispatch = useDispatch();
	let [errors, setErrors] = useState([]);
	let history = useHistory();
	const [isLoaded, setIsLoaded] = useState(false);

	let { eventId } = useParams();
	let state = useSelector((state) => state);
	let user = state.session.user;
	const event = state.events;
	// let members = state.members;

	useEffect(() => {
		// let payload = {
		// 	groupId: event[eventId].groupId,
		// };
		dispatch(thunkReadEventDetails(eventId))
			.then(() => setIsLoaded(true))
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(Object.values(data.errors));
			});
	}, [dispatch]);

	//-----------------

	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();
	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;
		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};
		document.addEventListener("click", closeMenu);
		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const closeMenu = () => setShowMenu(false);

	//----------------

	if (isLoaded) {
		let {
			id,
			venueId,
			groupId,
			name,
			description,
			type,
			capacity,
			price,
			startDate,
			endDate,
			Group,
			Venue,
			EventImages,
			numAttending,
			previewImage: image,
		} = event[eventId];

		//dates
		let date = new Date(startDate).toString().split(" ");
		let month = date[1];
		let day = date[2];
		let year = date[3];
		let time = date[4].split(":").splice(0, 2).join(":");
		let ampm = Number(time.slice(0, 2));
		if (ampm > 12) {
			if (ampm > 21) {
				time = ampm - 12 + time.slice(2) + " PM";
			} else {
				time = ampm - 12 + time.slice(2) + " PM";
			}
		} else if (ampm === 12) {
			time += " PM";
		} else {
			time += " AM";
		}
		let weekday = date[0];

		let date2 = new Date(endDate).toString().split(" ");
		let month2 = date2[1];
		let day2 = date2[2];
		let year2 = date2[3];
		let time2 = date2[4].split(":").splice(0, 2).join(":");
		let ampm2 = Number(time2.slice(0, 2));
		if (ampm2 > 12) {
			if (ampm2 > 21) {
				time2 = ampm2 - 12 + time2.slice(2) + " PM EST";
			} else {
				time2 = ampm2 - 12 + time2.slice(2) + " PM EST";
			}
		} else if (ampm2 === 12) {
			time2 += " PM EST";
		} else {
			time2 += " AM EST";
		}
		let weekday2 = date2[0];

		let host;
		if (user) {
			host = Group.Memberships.find((el) => el.userId === user.id);
		}
		//return
		return (
			<>
				<div className="event-details-page">
					{errors.length > 0 ? (
						<div className="error-handler-container">
							<ErrorHandler errors={errors} />
						</div>
					) : null}
					<div className="event-details-container-header">
						<div id="event-right-details-header">
							<div id="event-name-details-div">
								<h1 className="event-details-header-name">
									{name}
								</h1>
							</div>

							<div className="hosted-by-events">
								<div className="left-events-hosted">
									<img
										className="events-small-avatar-icon"
										src={Group.Organizer.avatar}
									/>
								</div>

								<div className="right-events-hosted">
									<div>{`Hosted By`}</div>
									<div className="event-details-info-bold">
										{`${Group.Organizer.firstName} ${Group.Organizer.lastName}`}
									</div>
								</div>
							</div>

							<div className="event-info-header">
								<div class="event-details-info-container icons-container">
									<div className="icons">
										<img
											src={clock}
											className="small-icons"
											alt="share icon"
										/>
									</div>
									<div className="event-details-info">{`${weekday}, ${month} ${day}, ${year} at ${time} to ${weekday2}, ${month2} ${day2}, ${year2} at ${time2}`}</div>
								</div>

								<div class="event-details-info-container icons-container">
									<div className="icons">
										<img
											src={location}
											className="small-icons"
											alt="share icon"
										/>
									</div>
									<div className="event-venue-details-header">
										<div className="event-venue-details-info">{`${Venue.address}`}</div>
										<div className="event-venue-details-info gray-text">{`${Venue.city}, ${Venue.state}`}</div>
									</div>
								</div>

								<div class="event-details-info-container icons-container">
									<NavLink
										to={`/groups/${groupId}`}
										className="icons"
									>
										<img
											src={Group.GroupImages[0].url}
											className="small-group-image"
											alt="share icon"
										/>
									</NavLink>
									<NavLink to={`/groups/${groupId}`}>
										<div className="event-venue-details-info">{`${Group.name}`}</div>
										<div className="event-venue-details-info gray-text">
											{`${
												Group.private
													? "Private"
													: "Public"
											} group`}
										</div>
									</NavLink>
								</div>
							</div>
						</div>

						<div className="event-left-details-img">
							{image ? (
								<img
									src={image}
									className="event-details-img-default"
									alt="event image"
								/>
							) : (
								<img
									src="https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns="
									className="no-groups-img-detail"
									alt="No Event Image"
								/>
							)}
						</div>

						<div id="details-nav-section">
							<div id="update-groups-link-container">
								<div className="members-link">
									{user ? (
										<NavLink
											to={`/events/${eventId}/attendees`}
											className="details-nav-section-border"
										>
											Attendees
										</NavLink>
									) : (
										<OpenModalButton
											buttonText="Attendees"
											onButtonClick={closeMenu}
											modalComponent={<LoginFormModal />}
										/>
									)}
								</div>
								<div className="members-link">
									<NavLink
										to={`/groups/${groupId}`}
										className="details-nav-section-border"
									>
										Group
									</NavLink>
								</div>

								<div className="margin-div" />

								{host && host.length ? (
									<div>
										<EditModalButton
											id="update-group-button"
											buttonText="Edit Event"
											onButtonClick={closeMenu}
											modalComponent={
												<UpdateGroup event={event} />
											}
										/>
									</div>
								) : null}

								{host && host.length ? (
									<div>
										<DeleteModalButton
											id="delete-group-button"
											buttonText="Delete Event"
											onButtonClick={closeMenu}
											modalComponent={
												<DeleteGroup event={event} />
											}
										/>
									</div>
								) : null}
							</div>
						</div>
					</div>

					<div id="details-container-body">
						<div id="about-section-container">
							<div id="about-section-container-left">
								<h2 className="about-title-font">Details</h2>
								<div className="about-details-font">
									{description}
								</div>

								<div id="group-detail-images">
									<h2 className="about-title-font">
										{`Photos (${
											EventImages.length > 1
												? EventImages.length - 1
												: 0
										})`}
									</h2>
									<div className="about-details-font">
										{EventImages.length > 1 ? (
											EventImages.map((image) =>
												image.preview ? null : (
													<img
														className="read-group-images"
														key={image.id}
														src={image.url}
														alt={`Event Image for: "${image.url}"`}
													/>
												)
											)
										) : (
											<div>No Event Images...</div>
										)}
									</div>
								</div>
							</div>

							<div id="about-section-container-right">
								<div class="event-details-info-container icons-container">
									<NavLink
										to={`/groups/${groupId}`}
										className="icons"
									>
										<img
											src={Group.GroupImages[0].url}
											className="small-group-image"
											alt="share icon"
										/>
									</NavLink>
									<NavLink to={`/groups/${groupId}`}>
										<div className="event-venue-details-info">{`${Group.name}`}</div>
										<div className="event-venue-details-info gray-text">
											{`${
												Group.private
													? "Private"
													: "Public"
											} group`}
										</div>
									</NavLink>
								</div>

								<div className="events-side-panel">
									<div class="event-details-info-container icons-container">
										<div className="icons">
											<img
												src={clock}
												className="small-icons"
												alt="share icon"
											/>
										</div>
										<div className="event-details-info">{`${weekday}, ${month} ${day}, ${year} at ${time} to ${weekday2}, ${month2} ${day2}, ${year2} at ${time2}`}</div>
									</div>
									<div class="event-details-info-container icons-container">
										<div className="icons">
											<img
												src={location}
												className="small-icons"
												alt="share icon"
											/>
										</div>
										<div className="event-venue-details-header">
											<div className="event-venue-details-info">{`${Venue.address}`}</div>
											<div className="event-venue-details-info gray-text">{`${Venue.city}, ${Venue.state}`}</div>
										</div>
									</div>
								</div>

								<div id="organizer-details-container">
									<h2
										id="organizer-details"
										className="about-title-font"
									>
										Organizer
									</h2>
								</div>
								{/* <div className="about-details-font">{`${organizer.firstName} ${organizer.lastName}`}</div> */}
								<div className="about-details-font">{`Type: ${type}`}</div>
								<div className="about-details-font">{`Est: ${month} ${day}, ${year}`}</div>
							</div>
						</div>
					</div>
				</div>
			</>
		);
	} else return null;
};

//exports
export default EventDetail;

/*

{
	id,
	venueId,
	groupId,
	name,
	description,
	type,
	capacity,
	price,
	startDate,
	endDate,
	Group: {
		id,
		organizerId,
		name,
		private,
		Organizer: {
			id,
			firstName,
			lastName,
			avatar,
		},
		Memberships:[
			{
				userId,
				status,
			},
		]
	},
	Venue: {
		id,
		address,
		city,
		state,
		lat,
		lng,
	},
	EventImages: [],
	numAttending,
	previewImage,
}

*/
