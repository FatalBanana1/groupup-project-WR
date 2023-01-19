// members

//imports
//hooks
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkReadMembers } from "../../../store/members";
import { NavLink, useParams } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton";
import * as sessionActions from "../../../store/session";

//comps
import ReadMembers from "../ReadMembers";
import CreateMembership from "../CreateMembership";
import CreateModalButton from "../CreateMembership/CreateModalButton";
import "./Members.css";

//main
const Members = () => {
	let dispatch = useDispatch();
	let { groupId } = useParams();

	// console.log(`members comp props ====`, groupId);

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

	useEffect(() => {
		let payload = {
			groupId,
		};
		dispatch(thunkReadMembers(payload));
		return () => {};
	}, [dispatch]);

	const selector = useSelector((state) => state.members);
	if (!selector)
		return <div className="groups-null">No Members to display...</div>;
	const groups = Object.values(selector);
	// const groups = selector;
	console.log(`members comp ====`, groups);

	//TODO: id > class group detail header

	return (
		<div id="groups-container">
			<div id="member-headers">
				<div className="group-detail-header-members">
					<NavLink
						className="members-page-link"
						to={`/groups/${groupId}`}
					>
						<h2 id="header-groups-pg">Group</h2>
					</NavLink>
				</div>
				<div className="group-detail-header-members">
					<NavLink
						className="members-page-link"
						to={`/groups/${groupId}/members`}
					>
						<h2>Members</h2>
					</NavLink>
				</div>
			</div>

			<div id="group-detail-container">
				{groups.length > 0 ? (
					groups.map((group) => {
						if (!group.firstName) {
							return null;
						} else {
							return (
								<NavLink
									id="group-detail"
									key={groupId}
									to={`/groups/${groupId}/members`}
									group={group}
								>
									<ReadMembers member={group} />
								</NavLink>
							);
						}
					})
				) : (
					<div>No Groups to display.</div>
				)}
			</div>
			<div id="groups-link-container">
				<CreateModalButton
					className="create-group-button"
					buttonText="Join Group"
					onButtonClick={closeMenu}
					modalComponent={<CreateMembership />}
				/>
			</div>
		</div>
	);

	// return <div>Members Page</div>;
};

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
					"status": "organizer"
			},
		]
	}
*/

//exports
export default Members;
