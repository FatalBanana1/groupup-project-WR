//imports
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../../store/session";
import { useParams } from "react-router-dom";
import "../GroupImages.css";
import { thunkDeleteGroupIMAGE } from "../../../store/groups";

//main
export default function ReadGroupImages({ image, host, curr }) {
	//states
	let dispatch = useDispatch();
	let { groupId } = useParams();
	const [showDelete, setShowDelete] = useState(false);

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

	const handleDeleteImageConfirm = () => {
		setShowDelete(true);
	};
	const handleCancel = () => {
		setShowDelete(false);
	};
	const handleDelete = async () => {
		setShowDelete(false);
		let payload = { ...image, groupId };
		await dispatch(thunkDeleteGroupIMAGE(payload));
	};

	//----------------

	if (image) {
		//dates
		// let date = new Date(createdAt).toString().split(" ");
		// let month = date[1];
		// let day = date[2];
		// let year = date[3];

		//dates
		const formatStart = new Date(image.createdAt).toLocaleDateString(
			"en-US",
			{
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
				hour: "numeric",
				minute: "numeric",
			}
		);
		if (host && host.length > 0) {
			host = host[0].status;
		}
		if (curr && curr.length > 0) {
			curr = curr[0].status;
		}

		// console.log(`front images======`, host, curr);

		//------------------------------------------------------

		//return
		return (
			<>
				<div className="above-image">
					<div>{`Posted on ${formatStart}`}</div>

					{host === "co-host" && !showDelete ? (
						<div
							className="image-delete"
							onClick={handleDeleteImageConfirm}
						>
							Delete
						</div>
					) : host === "co-host" && showDelete ? (
						<div className="image-delete" onClick={handleCancel}>
							Cancel
						</div>
					) : null}
				</div>

				{showDelete ? (
					<div className="confirmImageDelete">
						<div
							className="delete-image-text"
							onClick={handleDelete}
						>
							Click Here to Confirm Delete
						</div>
					</div>
				) : (
					<img
						className="images"
						key={image.id}
						src={image.url}
						alt={`Group Image`}
					/>
				)}
			</>
		);
	} else return null;
}
