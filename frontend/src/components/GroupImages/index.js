//imports
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { useParams } from "react-router-dom";
import "./GroupImages.css";
import Loading from "../Loading";
import ReadGroupImages from "./ReadImage";

//main
export default function GroupImages({ host, curr }) {
	//states
	let dispatch = useDispatch();
	let { groupId } = useParams();
	const [isLoaded, setIsLoaded] = useState();

	// useEffect(() => {
	// 	dispatch(thunkReadGroupDetails(groupId)).then(() => setIsLoaded(true));
	// }, [dispatch]);

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

	const groups = useSelector((state) => state.groups);
	const group = groups[groupId];
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

	if (group) {
		let image = groupImages.find((el) => el.preview === true);
		group["image"] = image;

		//dates
		// let date = new Date(createdAt).toString().split(" ");
		// let month = date[1];
		// let day = date[2];
		// let year = date[3];

		//dates
		// const formatStart = new Date(startDate).toLocaleDateString("en-US", {
		// 	weekday: "long",
		// 	year: "numeric",
		// 	month: "long",
		// 	day: "numeric",
		// 	hour: "numeric",
		// 	minute: "numeric",
		// });

		// console.log(`front images======`, host, curr);

		//------------------------------------------------------

		//return
		return (
			<div className="images-ct">
				<div id="group-detail-images">
					<h2 className="about-title-font">
						{`Photos (${
							groupImages.length > 0 ? groupImages.length : 0
						})`}
					</h2>

					<div className="images-comp">
						{groupImages.length >= 1 ? (
							groupImages.map((image) => (
								<ReadGroupImages
									image={image}
									host={host}
									curr={curr}
									key={image.id}
								/>
							))
						) : (
							<div className="nothing-found">
								No Group Images...
							</div>
						)}
					</div>
				</div>
			</div>
		);
	} else return <Loading />;
}
