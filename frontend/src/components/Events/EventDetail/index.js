//event detail js

//imports
//hooks
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../../OpenModalButton";
import DeleteModalButton from "../../Groups/DeleteGroup/DeleteModalButton.js";
import EditModalButton from "../../Groups/UpdateGroup/EditModalButton.js";
import { NavLink, useParams } from "react-router-dom";
import { thunkReadEventDetails } from "../../../store/events";
import UpdateGroup from "../../Groups/UpdateGroup";
import "./EventDetail.css";
import ErrorHandler from "../../ErrorHandler";
import LoginFormModal from "../../LoginFormModal";
import clock from "../../Groups/images/clock-icon.png";
import location from "../../Groups/images/location-icon.png";
import Loading from "../../Loading";
import AboutEvent from "../AboutEvent";
import EventImages from "../../EventImages";
import UpdateEvent from "../UpdateEvent";
import DeleteEvent from "../DeleteEvent";
import {
	thunkCreateRsvp,
	thunkDeleteRsvp,
	thunkReadRsvps,
} from "../../../store/rsvps";

//main
const EventDetail = () => {
	//states
	let dispatch = useDispatch();
	let [errors, setErrors] = useState([]);
	let { eventId } = useParams();
	const [isLoaded, setIsLoaded] = useState(false);
	const [isImages, setIsImages] = useState(false);
	const [isAbout, setIsAbout] = useState(true);
	//selectors
	let user = useSelector((state) => state.session.user);
	let events = useSelector((state) => state.events);
	let allRsvps = useSelector((state) => state.rsvps);
	let rsvps = Object.values(allRsvps);
	let event = events[eventId];
	const [isAttending, setIsAttending] = useState("");

	//-----------------

	let aboutClickHandler = () => {
		setIsImages(false);
		setIsAbout(true);
	};
	let imagesClickHandler = () => {
		setIsImages(true);
		setIsAbout(false);
	};

	//-----------------

	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();
	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};
	let payload = { eventId };
	useEffect(() => {
		dispatch(thunkReadEventDetails(eventId))
			.then(() => dispatch(thunkReadRsvps(payload)))
			.then(() => setIsLoaded(true))
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(Object.values(data.errors));
			});
	}, [dispatch]);

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

	// console.log(`inside event deets=====`, event.Group);

	if (isLoaded && event && event.Group && rsvps) {
		let {
			id,
			venueId,
			groupId,
			name,
			description,
			type,
			capacity,
			startDate,
			endDate,
			Group,
			Venue,
			numAttending,
			previewImage: image,
		} = event;

		//dates
		const formatStart = new Date(startDate).toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
		});
		const formatEnd = new Date(endDate).toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
		});
		let host;
		if (user) {
			host = Group.Memberships.find((el) => el.userId === user.id);
		}

		if (Venue.city === "N/A" || !Venue.city) {
			Venue.city = "Online";
			Venue.state = "";
		}
		// const price = event.price.toLocaleString("en-US", {
		// 	style: "currency",
		// 	currency: "USD",
		// });

		//-------------------------------------------------------

		let curr;
		if (user) {
			curr = rsvps.find((el) => el.id === user.id);
		}
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

		// console.log(`event deets=====>>>>------`, member);

		//-------------------------------------------------------

		//return
		return (
			<div id="group-details-page">
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
							<div className="event-details-info-container icons-container">
								<div className="icons">
									<img
										src={clock}
										className="small-icons"
										alt="share icon"
									/>
								</div>
								<div className="event-details-info">
									{`${formatStart} to ${formatEnd}`}
								</div>
							</div>

							<div className="event-details-info-container icons-container">
								<div className="icons">
									<img
										src={location}
										className="small-icons"
										alt="share icon"
									/>
								</div>
								<div className="event-venue-details-header">
									<div className="event-venue-details-info">{`${Venue.address}`}</div>
									{Venue.state ? (
										<div className="event-venue-details-info gray-text">{`${Venue.city}, ${Venue.state}`}</div>
									) : (
										<div className="event-venue-details-info gray-text">{`${Venue.city} Only`}</div>
									)}
								</div>
							</div>

							<div className="event-details-info-container icons-container">
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
											Group.private ? "Private" : "Public"
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
				</div>

				<div className="details-ct-body">
					<div className="borders sticky-deets">
						<div id="details-nav-section">
							<div id="update-groups-link-container">
								<div className="members-link details-nav-section-border">
									{isAbout ? (
										<div className="highlighted">About</div>
									) : (
										<div
											onClick={aboutClickHandler}
											className="clicker"
										>
											About
										</div>
									)}
								</div>

								<div className="members-link details-nav-section-border">
									{isImages ? (
										<div className="highlighted">
											{`Photos(${event.EventImages.length})`}
										</div>
									) : (
										<div
											onClick={imagesClickHandler}
											className="clicker"
										>
											{`Photos(${event.EventImages.length})`}
										</div>
									)}
								</div>

								<div className="members-link details-nav-section-border">
									{user ? (
										<NavLink
											to={`/events/${eventId}/attendees`}
										>
											{`Attendees(${rsvps.length})`}
										</NavLink>
									) : (
										<OpenModalButton
											props="link-buttons"
											buttonText="Attendees"
											onButtonClick={closeMenu}
											modalComponent={<LoginFormModal />}
										/>
									)}
								</div>

								<div className="members-link details-nav-section-border">
									<NavLink to={`/groups/${groupId}`}>
										Group
									</NavLink>
								</div>

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

								{host ? (
									<div className="crud-btns">
										<EditModalButton
											id="update-group-button"
											buttonText="Edit Event"
											onButtonClick={closeMenu}
											modalComponent={
												<UpdateEvent event={event} />
											}
										/>

										<DeleteModalButton
											id="delete-group-button"
											buttonText="Delete Event"
											onButtonClick={closeMenu}
											modalComponent={
												<DeleteEvent event={event} />
											}
										/>
									</div>
								) : null}
							</div>
						</div>
					</div>

					{isLoaded && isAbout ? (
						<AboutEvent event={event} rsvps={rsvps} />
					) : isLoaded && isImages ? (
						<EventImages event={event} />
					) : null}

					{user && (
						<div
							className="attend-ct"
							title={`${
								!member
									? "Must be Group Member to Attend Event"
									: null
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
					)}
				</div>
			</div>
		);
	} else return <Loading />;
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
