//read member detail

//imports
//hooks

//comps
import { useParams } from "react-router-dom";
// import GroupDetail from "../../Groups/GroupDetail";
import "./ReadMembers.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditModalButton from "../UpdateMembership/EditModalButton";
import UpdateMembership from "../UpdateMembership";
import { thunkReadGroupDetails } from "../../../store/groups";
import Loading from "../../Loading";

//main
const ReadMembers = ({ member }) => {
	let {
		id,
		firstName,
		lastName,
		username,
		email,
		status,
		organizerId,
		logId,
		avatar,
	} = member;

	let [isLoaded, setIsLoaded] = useState(false);
	let dispatch = useDispatch();
	let [hidden, setHidden] = useState("hidden");
	let params = useParams();
	let groupId = useSelector((state) => state.groups.id);
	if (!groupId) {
		groupId = params.groupId;
	}
	const user = useSelector((state) => state.session.user);

	// console.log(`groupId ----`, groupId, params);

	//---------

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

	//---------
	let members = useSelector((state) => state.members);
	let organizer = Object.values(members).filter(
		(el) => el.id === user.id && el.status === "co-host"
	);

	//hide organizer option if not organizer
	if (organizerId !== user.id) {
		member["hidden"] = hidden;
	} else {
		member["hidden"] = "";
	}

	if (member && id) {
		// console.log(`front member======`, organizerId, user.id);

		//return
		return (
			<div id="detail-container">
				<div id="detail-left">
					{avatar && user.id === id ? (
						<img
							src={avatar}
							id="read-members-img"
							className="you-are-here"
						/>
					) : avatar ? (
						<img src={avatar} id="read-members-img" />
					) : (
						<img
							src="https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns="
							className="no-groups-img-read"
							id="read-members-img"
						/>
					)}
				</div>

				<div className="detail-right-members">
					<h3 id="detail-right-name">
						{firstName} {lastName}
					</h3>
					{user.id === id ? (
						<div className="about-section you-are-here2">{`Username: ${username}`}</div>
					) : (
						<div className="about-section">{`Username: ${username}`}</div>
					)}

					<div className="about-section">{`Email: ${email}`}</div>

					<div className="about-section">{`Status: ${
						organizerId === id
							? `Organizer`
							: status[0].toUpperCase() + status.substring(1)
					}`}</div>

					{organizer.length && organizerId !== id ? (
						<div className="hiddens">
							<EditModalButton
								id="update-group-button"
								buttonText="Edit Status"
								onButtonClick={closeMenu}
								modalComponent={
									<UpdateMembership member={member} />
								}
							/>
						</div>
					) : null}
				</div>
			</div>
		);
	} else return null;
};

//exports
export default ReadMembers;

//structure
// {id,firstName,lastName,username,email,status}
/*
{
	"Members": [
			{
					"id": 1,
					"firstName": "Walter",
					"lastName": "White",
					"username": "heisenberg",
					"email": "h20@gmail.com",
					"status": "organizer",
					avatar
			},
		]
	}
*/
