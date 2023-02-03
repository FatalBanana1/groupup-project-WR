//group detail js

//imports
//hooks
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import DeleteModalButton from "../Groups/DeleteGroup/DeleteModalButton.js";
import EditModalButton from "../Groups/UpdateGroup/EditModalButton.js";
import * as sessionActions from "../../store/session";
import { NavLink, useHistory, useParams } from "react-router-dom";

//comps
import { thunkReadGroupDetails } from "../../store/groups";
import UpdateGroup from "../Groups/UpdateGroup";
import "./GroupDetail.css";
import DeleteGroup from "../Groups/DeleteGroup";
import Members from "../JoiningGroups/Members";
import ErrorHandler from "../ErrorHandler";
import { actionResetMember } from "../../store/members";
import { thunkReadMembers } from "../../store/members";
import LoginFormModal from "../LoginFormModal";
import location from "../Groups/images/location2.png";
import people from "../Groups/images/people1.png";
import person from "../Groups/images/person1.png";
import email from "../Groups/images/email1.png";
import share1 from "../Groups/images/share-icon.png";
import share2 from "../Groups/images/share2.png";

//main
const GroupDetail = () => {
	//states
	let dispatch = useDispatch();
	let [errors, setErrors] = useState([]);
	let history = useHistory();
	const [isLoaded, setIsLoaded] = useState(false);

	let { groupId } = useParams();
	// let groupId = useSelector((state) => state.groups.id);
	// if (!groupId) {
	// 	groupId = params.groupId;
	// }

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
				setIsLoaded(true);
			})
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

	let user = useSelector((state) => state.session.user);
	const group = useSelector((state) => state.groups);
	let members = useSelector((state) => state.members);

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
		} = group[groupId];
		let image = groupImages.find((el) => el.preview === true);

		//dates
		let date = new Date(createdAt).toString().split(" ");
		let month = date[1];
		let day = date[2];
		let year = date[3];

		let host;
		if (user) {
			host = Object.values(members).filter(
				(el) => el.id === user.id && el.status === "co-host"
			);
		}
		let curr = Object.values(members).filter((el) => el.id === user.id);
		let status;
		if (curr[0]) {
			status = curr[0].status;
			if (status === "co-host") status = "You're a Co-host!";
			if (status === "pending") status = "You're invite is pending.";
			if (status === "member") status = "You're a member!";
		}

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
									<div className="details-info">
										{`${numMembers} members • ${
											privated
												? `Private group`
												: `Public group`
										}`}
									</div>
								</div>

								<div className="groups-icon-container">
									<div className="details-info">{`Organized by ${organizer.firstName} ${organizer.lastName}`}</div>
								</div>

								<div className="groups-icon-container  margin-groups-icon-last">
									<div className="share-icon-header">
										Share:
									</div>
									<div className="small-icons"></div>
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

							<div id="about-section-container">
								<div id="about-section-container-left">
									<h2 className="about-title-font">
										What we're about
									</h2>
									<div className="about-details-font">
										{about}
									</div>

									<div id="group-detail-images">
										<h2 className="about-title-font">
											{`Photos (${
												groupImages.length > 1
													? groupImages.length - 1
													: 0
											})`}
										</h2>
										<div className="about-details-font">
											{groupImages.length > 1 ? (
												groupImages.map((image) =>
													image.preview ? null : (
														<img
															className="read-group-images"
															key={image.id}
															src={image.url}
															alt={`Group Image for: "${image.url}"`}
														/>
													)
												)
											) : (
												<div>No Group Images...</div>
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
									<div className="about-details-font">{`${organizer.firstName} ${organizer.lastName}`}</div>
									<div className="about-details-font">{`Type: ${type}`}</div>
									<div className="about-details-font">{`Est: ${month} ${day}, ${year}`}</div>
								</div>
							</div>
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
