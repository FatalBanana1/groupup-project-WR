//group detail js

//imports
//hooks
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import DeleteModalButton from "../Groups/DeleteGroup/DeleteModalButton.js";
import EditModalButton from "../Groups/UpdateGroup/EditModalButton.js";
import * as sessionActions from "../../store/session";
import { NavLink, useParams } from "react-router-dom";

//comps
import { thunkReadGroupDetails } from "../../store/groups";
import UpdateGroup from "../Groups/UpdateGroup";
import "./GroupDetail.css";
import DeleteGroup from "../Groups/DeleteGroup";
import Members from "../JoiningGroups/Members";

//main
const GroupDetail = () => {
	//states
	let dispatch = useDispatch();
	let { groupId } = useParams();

	useEffect(() => {
		dispatch(thunkReadGroupDetails(groupId));
		return () => {};
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
	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
		closeMenu();
	};

	//----------------

	// {groups: {1:{1}, 2:{2}...} }
	const group = useSelector((state) => state.groups);
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
	} = group;
	if (!organizer) return null;

	let image = groupImages.find((el) => el.preview === true);
	group["image"] = image;

	//dates
	let date = new Date(createdAt).toString().split(" ");
	let month = date[1];
	let day = date[2];
	let year = date[3];

	//return
	return (
		<div id="group-details-page">
			<div id="details-container-header">
				<div id="left-details-img">
					{image !== undefined ? (
						<img src={image.url} id="details-img-default" />
					) : (
						<img
							src="https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns="
							className="no-groups-img-detail"
						/>
					)}
				</div>
				<div id="right-details-header">
					<div id="name-details-div">
						<div id="right-details-header-name">{name}</div>
					</div>
					<div className="details-info">{`${city}, ${state}`}</div>
					<div className="details-info li-tag-members-line">
						{`${numMembers} members`}
						<li className="li-tags" />
						{`${privated ? "Private" : "Public"} group`}
					</div>
					<div className="details-info">{`Organized by ${organizer.firstName} ${organizer.lastName}`}</div>
				</div>
			</div>
			<div id="details-container-body">
				<div id="details-nav-section">
					<div id="update-groups-link-container">
						<EditModalButton
							id="update-group-button"
							buttonText="Edit Group"
							onButtonClick={closeMenu}
							modalComponent={<UpdateGroup group={group} />}
						/>
						<DeleteModalButton
							id="delete-group-button"
							buttonText="Delete Group"
							onButtonClick={closeMenu}
							modalComponent={<DeleteGroup group={group} />}
						/>
						<NavLink to={`/groups/${group.id}/members`}>
							Members
						</NavLink>
					</div>
				</div>

				<div id="about-section-container">
					<div id="about-section-container-left">
						<h2 className="about-title-font">What we're about</h2>
						<div className="about-details-font">{about}</div>

						<div id="group-detail-images">
							<h2 className="about-title-font">Group Images</h2>
							<div className="about-details-font">
								{groupImages.length
									? groupImages.map((image) =>
											image.preview ? null : (
												<img
													className="read-group-images"
													key={image.id}
													src={image.url}
													alt={`Group Image for: "${image.url}"`}
												/>
											)
									  )
									: null}
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
						<div className="about-details-font">{`Est: ${month}, ${day}, ${year}`}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

//exports
export default GroupDetail;

/*
//---------------
TODO:
organizer div >>> user details pg

*/
