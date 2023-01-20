//groups page

//imports
//hooks
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkReadGroups, actionResetState } from "../../store/groups";
import { NavLink, useLocation, useParams } from "react-router-dom";
import CreateModalButton from "./CreateGroup/CreateModalButton";
import OpenModalButton from "../../components/OpenModalButton";
import * as sessionActions from "../../store/session";

//comps
import ReadGroups from "./ReadGroups";
import CreateGroup from "./CreateGroup";
import "./Groups.css";

//main
const Groups = (props) => {
	let location = useLocation();
	let dispatch = useDispatch();
	let [errors, setErrors] = useState([]);

	// let params = useParams();
	// console.log(`location ===`, location);
	// console.log(`location ===`, location.props);
	// console.log(`location ===`, location.props.query);

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
		console.log(`location ====`, location);
		if (location.props && location.props.query) {
			let payload = JSON.parse(JSON.stringify(location));

			console.log(`location ====`, location);
			console.log(`payload====`, payload);

			dispatch(
				thunkReadGroups(`?name=${payload.location.props.query}`)
			).catch(async (res) => {
				const data = await res.json();
				if (data && data.message === "Authentication required")
					setErrors((data[errors] = [data.message]));
				if (data && data.errors) setErrors(Object.values(data.errors));
			});
		} else {
			console.log(`location ====`, location);
			dispatch(thunkReadGroups()).catch(async (res) => {
				const data = await res.json();
				if (data && data.message === "Authentication required")
					setErrors((data[errors] = [data.message]));
				if (data && data.errors) setErrors(Object.values(data.errors));
			});
		}
	}, [dispatch]);

	// {groups: {1:{1}, 2:{2}...} }
	const selector = useSelector((state) => state.groups);
	console.log(`selector>>> groups: `, selector);

	if (!selector)
		return <div className="groups-null">No Groups to display...</div>;
	const groups = Object.values(selector);

	//resetClickHandler

	const resetClickHandler = () => {
		dispatch(actionResetState());
	};

	//return
	return (
		<div className="margin-groups-container">
			<div id="group-detail-header">
				<NavLink className="groups-page-link" exact to="/groups">
					<h2 id="header-groups-pg">Groups</h2>
				</NavLink>
			</div>
			<div id="groups-container">
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
										onClick={resetClickHandler}
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
					<CreateModalButton
						className="create-group-button"
						buttonText="Create Group"
						onButtonClick={closeMenu}
						modalComponent={<CreateGroup />}
					/>
				</div>
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
