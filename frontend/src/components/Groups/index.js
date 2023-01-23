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
	const [isLoaded, setIsLoaded] = useState(false);

	//-----------------

	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const closeMenu = () => setShowMenu(false);

	//----------------
	const search = useSelector((state) => state.groups.search);
	// console.log(`search search 000000----`, search);

	useEffect(() => {
		// if (search) {
		// 	let payload = JSON.parse(JSON.stringify(search));

		// 	dispatch(thunkReadGroups(`?name=${payload}`))
		// 		.then(() => setIsLoaded(true))
		// 		.catch(async (res) => {
		// 			const data = await res.json();
		// 			if (data && data.message)
		// 				setErrors((data[errors] = [data.message]));
		// 			if (data && data.errors)
		// 				setErrors(Object.values(data.errors));
		// 		});
		// } else {
		dispatch(thunkReadGroups())
			.then(() => setIsLoaded(true))
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.message)
					setErrors((data[errors] = [data.message]));
				if (data && data.errors) setErrors(Object.values(data.errors));
			});
	}, [dispatch]);

	// {groups: {1:{1}, 2:{2}...} }
	const selector = useSelector((state) => state.groups);
	// console.log(`selector>>> groups: `, selector);

	const groups = Object.values(selector);

	//return
	return (
		<div className="margin-groups-container">
			<div id="group-detail-header">
				<NavLink
					className="groups-page-link remove-color"
					exact
					to="/groups"
				>
					<h2 id="header-groups-pg">Groups</h2>
				</NavLink>
			</div>
			<div id="groups-container">
				<div id="group-detail-container">
					{isLoaded &&
						groups.map((group) => {
							if (!group.name) {
								return null;
							} else {
								return (
									<NavLink
										id="group-detail"
										key={group.id}
										to={`/groups/${group.id}`}
										// group={group}
										// onClick={resetClickHandler}
									>
										<ReadGroups group={group} />
									</NavLink>
								);
							}
						})}
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
