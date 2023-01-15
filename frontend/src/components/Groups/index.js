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
import "./Groups.css";
import CreateGroup from "./CreateGroup";

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
	const groups = Object.values(selector);
	// console.log(`-----groups--------`, groups);

	//return
	return (
		<div id="groups-container">
			<div id="group-detail-header">
				<NavLink className="groups-page-link" exact to="/groups">
					<h2>Groups</h2>
				</NavLink>
			</div>
			<div id="group-detail-container">
				{groups.map((group) => (
					<div id="group-detail" key={group.id}>
						<ReadGroups group={group} />
					</div>
				))}
			</div>
			<div id="groups-link-container">
				<OpenModalButton
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
