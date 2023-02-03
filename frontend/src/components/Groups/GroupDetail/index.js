//group detail js

//imports
//hooks
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../../OpenModalButton";
import DeleteModalButton from "../DeleteGroup/DeleteModalButton.js";
import EditModalButton from "../UpdateGroup/EditModalButton.js";
import * as sessionActions from "../../../store/session";
import { NavLink, useHistory, useParams } from "react-router-dom";

//comps
import { thunkReadGroupDetails } from "../../../store/groups";
import UpdateGroup from "../UpdateGroup";
import "./GroupDetail.css";
import DeleteGroup from "../DeleteGroup";
import Members from "../../Memberships/Members";
import ErrorHandler from "../../ErrorHandler";
import { actionResetMember } from "../../../store/members";
import { thunkReadMembers } from "../../../store/members";
import LoginFormModal from "../../LoginFormModal";
import location from "../images/location2.png";
import people from "../images/people1.png";
import person from "../images/person1.png";
import email from "../images/email1.png";
import share1 from "../images/share-icon.png";
import share2 from "../images/share2.png";
import { thunkReadEventsbyGroup } from "../../../store/events";
import AboutGroup from "../AboutGroup/AboutGroup";
import EventsByGroup from "../../Events/EventsByGroup";

//main
const GroupDetail = () => {
	//states
	let dispatch = useDispatch();
	let [errors, setErrors] = useState([]);
	let history = useHistory();
	const [isLoaded, setIsLoaded] = useState(false);
	let [isAbout, setIsAbout] = useState(true);
	let [isEvents, setIsEvents] = useState(false);

	let { groupId } = useParams();
	// let groupId = useSelector((state) => state.groups.id);
	// if (!groupId) {
	// 	groupId = params.groupId;
	// }

	let aboutClickHandler = () => {
		setIsAbout(true);
		setIsEvents(false);
	};

	let eventsClickHandler = () => {
		setIsAbout(false);
		setIsEvents(true);
	};

	//-----------------

	let user = useSelector((state) => state.session.user);
	const group = useSelector((state) => state.groups);
	let members = useSelector((state) => state.members);

	useEffect(() => {
		let payload = {
			groupId,
		};
		dispatch(thunkReadGroupDetails(groupId))
			.then(() => {
				dispatch(thunkReadMembers(payload));
			})
			.then(() => {
				dispatch(sessionActions.restoreUser());
			})
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
		const {
			id,
			organizerId,
			name,
			about,
			type,
			private: privated,
			city,
			state,
			createdAt,
			updatedAt,
			GroupImages: groupImages,
			Organizer: organizer,
			Venues: venues,
			numMembers,
			Events,
		} = group[groupId];
		let image = groupImages.find((el) => el.preview === true);

		//dates
		let date = new Date(createdAt).toString().split(" ");
		let month = date[1];
		let day = date[2];
		let year = date[3];

		let host;
		let curr;
		if (user) {
			host = Object.values(members).filter(
				(el) => el.id === user.id && el.status === "co-host"
			);
			curr = Object.values(members).filter((el) => el.id === user.id);
		}

		let status;
		if (curr && curr[0]) {
			status = curr[0].status;
			if (status === "co-host") {
				status = "You're a Co-host!";
			} else if (status === "pending") {
				status = "You're invite is pending";
			} else if (status === "member") {
				status = "You're a Member!";
			}
		}
		if (!curr) status = "You're not signed in!";

		//return
		return (
			<>
				{isLoaded && (
					<div id="group-details-page">
						{errors.length > 0 ? (
							<div className="error-handler-container">
								<ErrorHandler errors={errors} />
							</div>
						) : null}
						<div id="details-container-header">
							<div id="left-details-img">
								{image && image.url ? (
									<img
										src={image.url}
										className="details-img-default"
										alt="group image"
									/>
								) : (
									<img
										src="https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns="
										className="no-groups-img-detail"
										alt="No Group Image"
									/>
								)}
							</div>
							<div id="right-details-header">
								<div id="name-details-div">
									<h1 id="right-details-header-name">
										{name}
									</h1>
								</div>

								<div className="groups-icon-container margin-groups-icon-first">
									<div className="icons">
										<img
											src={location}
											className="small-icons"
											alt="share icon"
										/>
									</div>
									<div className="details-info">{`${city}, ${state}`}</div>
								</div>

								<div className="groups-icon-container">
									<div className="icons">
										<img
											src={people}
											className="small-icons"
											alt="share icon"
										/>
									</div>

									<div className="details-info">
										{`${numMembers} members • ${
											privated
												? `Private group`
												: `Public group`
										}`}
									</div>
								</div>

								<div className="groups-icon-container">
									<div className="icons">
										<img
											src={person}
											className="small-icons"
											alt="share icon"
										/>
									</div>

									<div className="details-info">{`Organized by ${organizer.firstName} ${organizer.lastName}`}</div>
								</div>

								<div className="groups-icon-container  margin-groups-icon-last">
									<div className="share-icon-header">
										Share:
									</div>
									<div className="small-icons icon-stack-share">
										<img
											src={share2}
											className="small-icons"
											alt="share icon"
										/>
										<img
											src={email}
											className="small-icons"
											alt="share icon"
										/>
										<img
											src={share1}
											className="small-icons"
											alt="share icon"
										/>
									</div>
								</div>

								<div className="groups-icon-container  margin-groups-icon-last">
									<div className="status-drop-header">
										{status}
									</div>
									<div className="small-icons"></div>
								</div>
							</div>
						</div>

						<div id="details-container-body">
							<div id="details-nav-section">
								<div id="update-groups-link-container">
									<div className="members-link details-nav-section-border">
										<div
											onClick={aboutClickHandler}
											className="clicker"
										>
											About
										</div>
									</div>

									<div className="members-link details-nav-section-border">
										{user ? (
											<NavLink
												to={`/groups/${id}/members`}
											>
												Members
											</NavLink>
										) : (
											<OpenModalButton
												buttonText="Members"
												onButtonClick={closeMenu}
												modalComponent={
													<LoginFormModal />
												}
											/>
										)}
									</div>

									<div className="members-link details-nav-section-border">
										<div
											onClick={eventsClickHandler}
											className="clicker"
										>
											Events
										</div>
									</div>

									<div className="margin-div" />

									{host && host.length ? (
										<div>
											<EditModalButton
												id="update-group-button"
												buttonText="Edit Group"
												onButtonClick={closeMenu}
												modalComponent={
													<UpdateGroup
														group={group[groupId]}
													/>
												}
											/>
										</div>
									) : null}

									{host && host.length ? (
										<div>
											<DeleteModalButton
												id="delete-group-button"
												buttonText="Delete Group"
												onButtonClick={closeMenu}
												modalComponent={
													<DeleteGroup
														group={group[groupId]}
													/>
												}
											/>
										</div>
									) : null}
								</div>
							</div>

							{isAbout ? (
								<AboutGroup group={group[groupId]} />
							) : isEvents ? (
								<EventsByGroup events={Events} />
							) : null}
						</div>
					</div>
				)}
			</>
		);
	} else return null;
};

//exports
export default GroupDetail;

/*
//---------------
TODO:
organizer div >>> user details pg

*/
