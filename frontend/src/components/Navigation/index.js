// frontend/src/components/Navigation/index.js
import React, { useState } from "react";
import {
	NavLink,
	Redirect,
	useHistory,
	useLocation,
	useParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../Groups/images/groupup-logo5.png";
import Groups from "../Groups";
import { actionResetState } from "../../store/groups";
import Searchbar from "../Searchbar";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	//return
	return (
		<div className="nav-container">
			<div id="nav-left-container">
				<NavLink id="nav-title" exact to="/" className="remove-color">
					<img
						id="groupup-logo-wr"
						src={logo}
						alt="Groupup site logo"
					/>
				</NavLink>
			</div>

			<div id="nav-mid">
				<div id="nav-search-bar">
					<Searchbar />
				</div>
			</div>

			<div id="nav-right-container">
				<ul id="dropdown">
					{isLoaded && (
						<div className="profile-container">
							<ProfileButton user={sessionUser} />
						</div>
					)}
				</ul>
			</div>
		</div>
	);
}

export default Navigation;
