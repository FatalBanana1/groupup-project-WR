//imports
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { useParams } from "react-router-dom";
import "./GroupImages.css";
import Loading from "../Loading";
import ReadGroupImages from "./ReadImage";
import { thunkCreateGroupIMAGE } from "../../store/groups";
import { data } from "jquery";

//main
export default function GroupImages({ host, curr }) {
	//states
	let dispatch = useDispatch();
	let { groupId } = useParams();
	const [showAddImage, setShowAddImage] = useState(false);
	const [confirmed, setConfirmed] = useState(false);
	const [notConfirmed, setNOTConfirmed] = useState(false);
	const [url, setUrl] = useState("");
	const [errors, setErrors] = useState("");

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

	//clicks - state

	//show image form
	const clickAddImage = () => {
		setShowAddImage(true);
		setUrl("");
		setErrors("");
	};
	// cancel image button
	const clickCancelImage = () => {
		if (!confirmed) setShowAddImage(false);
		setErrors("");
	};
	// handle image
	const handleImage = (e) => {
		setUrl(e.target.value);
	};
	// handle image submit
	const handleSubmitImage = async () => {
		setErrors("");
		let err;
		if (!confirmed) {
			//check url
			const textValue = url.trim();
			const pattern = /\.(gif|jpg|jpeg|tiff|png)$/i;
			const isImageUrl = pattern.test(textValue);
			//send image
			let payload = { id: groupId, url, preview: false };
			if (isImageUrl) {
				await dispatch(thunkCreateGroupIMAGE(payload)).then((data) => {
					if (data && data.groupimage) {
						// img already been added
						err = "Image has already been uploaded!";
					} else {
						setConfirmed(true);
						setUrl("");
						setTimeout(() => {
							setConfirmed(false);
							setShowAddImage(false);
							setErrors("");
						}, 4000);
					}
				});
			} else {
				err = "Image was not uploaded! Image must be URL";
			}
		}
		//check errors
		if (err) {
			setErrors({ Error: err });
		}
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
		let host2;
		let curr2;
		if (host && host.length > 0) {
			host2 = host[0].status;
		}
		if (curr && curr.length > 0) {
			curr2 = curr[0].status;
		}

		// console.log(`front images======`, host2, curr2);

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

					{curr2 === "co-host" && !showAddImage && (
						<div className="image-delete" onClick={clickAddImage}>
							{/*  <div className="image-delete"> */}
							Add Image
						</div>
					)}

					{curr2 === "co-host" && showAddImage && (
						<>
							{confirmed ? (
								<div className="success-image">Image was successfully added!</div>
							) : (
								<>
									{errors && errors.Error && (
										<div className="image-errors">{`Error: ${errors.Error}`}</div>
									)}
									<input
										type="text"
										value={url}
										onChange={handleImage}
										className="image-upload-input"
										required
									/>
								</>
							)}

							<div className="row">
								<div
									className="mright15 submit-img"
									onClick={handleSubmitImage}
								>
									Submit
								</div>

								<div
									className="cancel-img"
									onClick={clickCancelImage}
								>
									Cancel
								</div>
							</div>
						</>
					)}

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
