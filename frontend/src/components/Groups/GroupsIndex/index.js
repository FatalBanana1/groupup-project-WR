//groups page

//imports
//hooks
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkReadGroups, actionResetState } from "../../../store/groups";
import { NavLink, useLocation, useParams } from "react-router-dom";
import CreateModalButton from "../CreateGroup/CreateModalButton";
import OpenModalButton from "../../OpenModalButton";
import * as sessionActions from "../../../store/session";

//comps
import ReadGroups from "../ReadGroups";
import CreateGroup from "../CreateGroup";
import LoginFormModal from "../../LoginFormModal";
import "./GroupsIndex.css";
import { removeSearch } from "../../../store/search";

//main
const GroupsIndex = (props) => {
	let location = useLocation();
	let dispatch = useDispatch();
	let [errors, setErrors] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	//-----------------

	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	const closeMenu = () => setShowMenu(false);

	//----------------
	const user = useSelector((state) => state.session.user);
	const search = useSelector((state) => state.search.search);
	let selector = useSelector((state) => state.groups);

	useEffect(() => {
		dispatch(thunkReadGroups())
			.then(() => setIsLoaded(true))
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.message)
					setErrors((data[errors] = [data.message]));
				if (data && data.errors) setErrors(Object.values(data.errors));
			});
	}, [dispatch]);

	const resetGroupsHandler = () => {
		dispatch(removeSearch());
	};

	if (isLoaded) {
		if (search) {
			selector = search;
		}
		const groups = Object.values(selector);

		//return
		return (
			<div className="margin-groups-container">
				<div id="group-detail-header">
					<NavLink
						className="other-page-link remove-color"
						exact
						to="/events"
						onClick={resetGroupsHandler}
					>
						<h2 id="header-groups-pg">Events</h2>
					</NavLink>
					<NavLink
						className="groups-page-link remove-color"
						exact
						to="/groups"
						onClick={resetGroupsHandler}
					>
						<h2 id="header-groups-pg">Groups</h2>
					</NavLink>
					<div className="groups-margin-div" />
				</div>
				{isLoaded && search === `No Groups were found.` ? (
					<div className="nothing-found">{`${search}..`}</div>
				) : isLoaded ? (
					<div id="groups-container">
						<div id="group-detail-container">
							{groups.map((group) => {
								if (group && group.id >= 0) {
									return (
										<NavLink
											id="group-detail"
											key={group.id}
											to={`/groups/${group.id}`}
										>
											<ReadGroups group={group} />
										</NavLink>
									);
								}
							})}
						</div>
						<div>
							{user ? (
								<div className="groups-link-container-signin">
									<CreateModalButton
										className="splash-link join-group"
										buttonText="Create a group"
										id="create-splash"
										onButtonClick={closeMenu}
										modalComponent={<CreateGroup />}
									/>
								</div>
							) : (
								<div className="groups-link-container">
									<OpenModalButton
										buttonText="Create a group"
										onButtonClick={closeMenu}
										modalComponent={<LoginFormModal />}
									/>
								</div>
							)}
						</div>
					</div>
				) : null}
			</div>
		);
	} else return null;
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
export default GroupsIndex;
