//imports
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { useParams } from "react-router-dom";
import "./EventImages.css";
import Loading from "../Loading";

//main
export default function EventImages() {
	//states
	let dispatch = useDispatch();
	let { eventId } = useParams();
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

	//----------------

	const events = useSelector((state) => state.events);
	const event = events[eventId];
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
		createdAt,
	} = event;

	// console.log(`front images======`, groups[groupId]);

	// if (!organizer) return null;

	if (event) {
		// let image = EventImages.find((el) => el.preview === true);
		// event["image"] = image;

		//dates
		let date = new Date(createdAt).toString().split(" ");
		let month = date[1];
		let day = date[2];
		let year = date[3];

		//------------------------------------------------------

		//return
		return (
			<div className="images-ct">
				<div id="group-detail-images">
					<h2 className="about-title-font">
						{`Photos (${EventImages.length})`}
					</h2>

					<div className="images-comp">
						{EventImages.length > 0 ? (
							EventImages.map((image) => (
								<img
									className="images"
									key={image.id}
									src={image.url}
									alt={`Event Image for: "${image.url}"`}
								/>
							))
						) : (
							<div>No Event Images...</div>
						)}
					</div>
				</div>
			</div>
		);
	} else return <Loading />;
}
