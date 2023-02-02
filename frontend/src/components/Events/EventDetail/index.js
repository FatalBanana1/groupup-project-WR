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
// import Members from "../JoiningGroups/Members";
import ErrorHandler from "../../ErrorHandler";
import { actionResetMember } from "../../../store/members";
import { thunkReadMembers } from "../../../store/members";
import LoginFormModal from "../../LoginFormModal";

//main
const EventDetail = () => {
	//states
	let dispatch = useDispatch();
	let [errors, setErrors] = useState([]);
	let history = useHistory();
	const [isLoaded, setIsLoaded] = useState(false);

	let { eventId } = useParams();
	// let groupId = useSelector((state) => state.groups.id);
	// if (!groupId) {
	// 	groupId = params.groupId;
	// }
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

		let host;
		if (user) {
			host = Group.Memberships.find((el) => el.userId === user.id);
		}
		//return
		return (
			<div>
				<div className="event-details-page">
					{errors.length > 0 ? (
						<div className="error-handler-container">
							<ErrorHandler errors={errors} />
						</div>
					) : null}
					<div className="event-details-container-header">
						<div id="event-right-details-header">
							<div id="event-name-details-div">
								<h1 id="right-details-header-name">{name}</h1>
							</div>

							<div className="details-info">{`Hosted By`}</div>
							<div>
								{`${Group.Organizer.firstName} ${Group.Organizer.lastName}`}
							</div>

							<div className="details-info">{`${Venue.city}, ${Venue.state}`}</div>
							<div className="details-info li-tag-members-line">
								{`${numAttending} Attending`}
								<li className="li-tags" />
								{`${
									Group.private ? "Private" : "Public"
								} event`}
							</div>
						</div>

						<div className="event-left-details-img">
							{image ? (
								<img
									src={image}
									id="details-img-default"
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

					<div id="details-container-body">
						<div id="details-nav-section">
							<div id="update-groups-link-container">
								<div className="members-link details-nav-section-border">
									{user ? (
										<NavLink
											to={`/events/${eventId}/attendees`}
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

						<div id="about-section-container">
							<div id="about-section-container-left">
								<h2 className="about-title-font">Details</h2>
								<div className="about-details-font">
									{description}
								</div>

								<div id="group-detail-images">
									<h2 className="about-title-font">
										Event Images
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
			</div>
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
