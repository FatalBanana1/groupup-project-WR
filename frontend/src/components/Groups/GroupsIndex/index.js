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
import { removeSearch, thunkSearchPage } from "../../../store/search";
import Loading from "../../Loading";

//main
const GroupsIndex = (props) => {
	let dispatch = useDispatch();
	let [errors, setErrors] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);
	let [search2, setSearch] = useState(1);

	//-----------------

	const [showMenu, setShowMenu] = useState(false);
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
	}, [dispatch, isLoaded, search2]);

	const resetGroupsHandler = () => {
		setSearch(1);
		dispatch(removeSearch());
	};

	const nextPageHandler = () => {
		setIsLoaded(false);
		setSearch(search2 + 1);
		dispatch(thunkSearchPage(search2 + 1))
			// .then(() => dispatch(thunkReadGroups()))
			.then(() => setIsLoaded(true));
	};

	const previousPageHandler = () => {
		setIsLoaded(false);
		setSearch(search2 - 1);
		dispatch(thunkSearchPage(search2 - 1))
			// .then(() => dispatch(thunkReadGroups()))
			.then(() => setIsLoaded(true));
	};

	if (isLoaded) {
		if (search) {
			selector = search;
		}
		const groups = Object.values(selector);

		//return
		return (
			<div className="center">
				<div className="margin-groups-container">
					<div className="sticky-groups">
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
						</div>
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

							<div className="pages">
								{search2 > 1 ? (
									<NavLink
										className="page-button"
										to={`/groups?page=${search2 - 1}`}
										onClick={previousPageHandler}
									>
										{`< Previous Page`}
									</NavLink>
								) : null}
								{groups.length === 10 ? (
									<NavLink
										className="page-button"
										onClick={nextPageHandler}
										to={`/groups?page=${search2 + 1}`}
									>
										{`Next Page >`}
									</NavLink>
								) : null}
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
											props="link-buttons border"
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
			</div>
		);
	} else return <Loading />;
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
