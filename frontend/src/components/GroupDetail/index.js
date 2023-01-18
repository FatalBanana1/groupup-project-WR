//group detail js

//imports
//hooks
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../../components/OpenModalButton";
import * as sessionActions from "../../store/session";
import { useParams } from "react-router-dom";

//comps
import { thunkReadGroupDetails } from "../../store/groups";
import "./GroupDetail.css";

//main
const GroupDetail = () => {
	//states
	let dispatch = useDispatch();
	let { groupId } = useParams();
	// console.log(`groupId----`, groupId);

	useEffect(() => {
		dispatch(thunkReadGroupDetails(groupId));
	}, []);

	// {groups: {1:{1}, 2:{2}...} }
	const selector = useSelector((state) => state.groups);
	const {
		id,
		organizerId,
		name,
		about,
		type,
		privated,
		city,
		state,
		createdAt,
		updatedAt,
		GroupImages: groupImages,
		Organizer: organizer,
		Venues: venues,
		numMembers,
	} = selector;
	if (!organizer) return null;

	let imgs = groupImages.find((el) => el.preview === true);

	console.log(venues);

	//return
	return (
		<div id="group-details-page">
			<div id="details-container-header">
				<div id="left-details-img">
					{imgs.id >= 0 ? (
						<img src={imgs.url} id="details-img-default" />
					) : (
						"N/A"
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
				<div id="about-section-container">
					<div id="about-section-container-left">
						<h2 id="about-section">What we're about:</h2>
						<div id="about-section">{about}</div>
					</div>
					<div id="about-section-container-right">
						<h2 id="organizer-details">Organizer</h2>
						<div>{`${organizer.firstName} ${organizer.lastName}`}</div>
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
