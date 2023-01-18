// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<div className="nav-container">
			<NavLink className="nav-title" exact to="/">
				Groupup
			</NavLink>
			{/* <NavLink to="/groups">Groups</NavLink> */}
			<ul id="dropdown">
				{isLoaded && (
					<div className="profile-container">
						<ProfileButton user={sessionUser} />
					</div>
				)}
			</ul>
		</div>
	);
}

export default Navigation;
