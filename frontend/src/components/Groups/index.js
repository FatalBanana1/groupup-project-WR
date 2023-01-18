//groups page

//imports
//hooks
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkReadGroups } from "../../store/groups";
import { NavLink } from "react-router-dom";
import OpenModalButton from "../../components/OpenModalButton";
import * as sessionActions from "../../store/session";

//comps
import ReadGroups from "./ReadGroups";
import CreateGroup from "./CreateGroup";
import "./Groups.css";

//main
const Groups = () => {
	let dispatch = useDispatch();

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
		dispatch(thunkReadGroups());
	}, [dispatch]);

	// {groups: {1:{1}, 2:{2}...} }
	const selector = useSelector((state) => state.groups);
	if (!selector)
		return <div className="groups-null">No Groups to display...</div>;
	const groups = Object.values(selector);

	//return
	return (
		<div id="groups-container">
			<div id="group-detail-header">
				<NavLink className="groups-page-link" exact to="/groups">
					<h2>Groups</h2>
				</NavLink>
			</div>
			<div id="group-detail-container">
				{groups.length > 0 ? (
					groups.map((group) => {
						if (!group.name) {
							return null;
						} else {
							return (
								<NavLink
									id="group-detail"
									key={group.id}
									to={`/groups/${group.id}`}
									group={group}
								>
									<ReadGroups group={group} />
								</NavLink>
							);
						}
					})
				) : (
					<div>No Groups to display.</div>
				)}
			</div>
			<div id="groups-link-container">
				<OpenModalButton
					className="create-group-button"
					buttonText="Create Group"
					onButtonClick={closeMenu}
					modalComponent={<CreateGroup />}
				/>
			</div>
		</div>
	);
};

// ,name,about,type,private,city,state,numMembers,previewImage

// {
// 	id
// 	organizerId,
// 	name,
// 	about,
// 	type,
// 	private,
// 	city,
// 	state
// 	numMembers
// 	previewImage
// }

//exports
export default Groups;
