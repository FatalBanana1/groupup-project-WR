//home js

//imports
import Groups from "../Groups";
import { Redirect, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Splash.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import joinGroup from "../Groups/images/join-group.png";
import startGroup from "../Groups/images/start-group.png";
import tickets from "../Groups/images/tickets2.png";
import CreateModalButton from "../Groups/CreateGroup/CreateModalButton";
import CreateGroup from "../Groups/CreateGroup";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import Searchbar from "../Searchbar";
import { actionResetState, thunkReadGroups } from "../../store/groups";
import { removeSearch } from "../../store/search";
import SplashModalButton from "./SplashModalButton";

//main
const Splash = () => {
	//states
	let dispatch = useDispatch();
	let [errors, setErrors] = useState([]);
	const [isLoaded, setIsLoaded] = useState(false);

	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();

	useEffect(() => {
		dispatch(removeSearch());
	}, [dispatch]);

	const clickHandler = () => {};

	const closeMenu = () => setShowMenu(false);

	const user = useSelector((state) => state.session.user);

	//return
	return (
		<div id="splash">
			<div id="splash-container">
				<div id="left">
					<div className="north">
						<h1 className="splash-font-h">
							The people platform—Where interests become
							friendships
						</h1>
					</div>
					<div className="south splash-font">
						Whatever your interest, from hiking and reading to
						networking and skill sharing, there are thousands of
						people who share it on Groupup. Events are happening
						every day—log in to join the fun.
					</div>
				</div>
				<div id="right">
					<img
						id="splash-img-right"
						src="/images/splash-transp-ppl-1.png"
					/>
				</div>
			</div>
			<div className="how-meetup-works">
				<h2>How Groupup works</h2>
				<div className="text-works">{`Meet new people who share your interests through online and in-person events. It’s free to create an account.`}</div>
			</div>

			<div id="groups-link-container">
				<div className="join-group">
					<img className="splash-imgs" src={joinGroup} />

					<NavLink
						className="splash-group-button"
						to="/groups"
						onClick={clickHandler}
					>
						Join a group
					</NavLink>

					<div className="splash-after-link">
						Do what you love, meet others who love it, find your
						community. The rest is history!
					</div>
				</div>

				<div className="join-group">
					<img className="splash-imgs-event" src={tickets} />

					<NavLink
						className="splash-group-button"
						to="/events"
						onClick={clickHandler}
					>
						Find an Event
					</NavLink>

					<div className="splash-after-link">
						Events are happening on just about any topic you can
						think of, from online gaming to yoga.
					</div>
				</div>

				<div className="join-group">
					<img className="splash-imgs" src={startGroup} />

					{user ? (
						<CreateModalButton
							buttonText="Start a group"
							onButtonClick={closeMenu}
							modalComponent={<CreateGroup />}
						/>
					) : (
						<SplashModalButton
							buttonText="Start a group"
							onButtonClick={closeMenu}
							modalComponent={<LoginFormModal />}
						/>
					)}
					<div className="splash-after-link">
						{`You don’t have to be an expert to gather people together and
					explore shared interests.`}
					</div>
				</div>
			</div>
		</div>
	);
};

//exports
export default Splash;
