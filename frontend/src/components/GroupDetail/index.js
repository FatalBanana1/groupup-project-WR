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

	// let details = Object.values(selector);
	// console.log(`group ----deeets======`, details);
	// console.log(`group ----deeets======`, groupImages);

	// if (groupImages.id) {
	// 	let imgs = Object.values(groupImages);
	// 	console.log(`group ----deeets======`, imgs);
	// }

	// if (imgs.length) {
	// 	let img = imgs.find((group) => group.preview === true);
	// }

	console.log(groupImages);

	//return
	return (
		<div id="other">
			Group Detail Page
			<div>Testing group details:</div>
			<div id="details-container">
				<div id="left">
					{/* {previewImage ? <img src={previewImage} /> : "N/A"} */}
				</div>
				<div id="right">
					<div id="name">
						<h1>{name}</h1>
					</div>
					<div id="name">{`${city}, ${state}`}</div>
					<div id="name">{`${numMembers} Members - ${
						privated ? "Private" : "Public"
					} group`}</div>
					<div id="name">{`Organized by ${organizer.firstName} ${organizer.lastName}`}</div>
				</div>
				<div id="about-section">{about}</div>
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
