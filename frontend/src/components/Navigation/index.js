// frontend/src/components/Navigation/index.js
import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../Groups/images/groupup-logo.png";
import searchIcon from "../Groups/images/search-icon4.png";

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	return (
		<div className="nav-container">
			<div id="nav-left-container">
				<NavLink id="nav-title" exact to="/">
					<img
						id="groupup-logo-wr"
						src={logo}
						alt="Groupup site logo"
					/>
				</NavLink>
			</div>

			<div id="nav-mid">
				<div id="nav-search-bar">
					<input
						type="search"
						id="navbar-search"
						placeholder="Search for Groups"
						value=""
					/>
				</div>

				<div id="search-btn-container">
					<button class="navbar-search-button">
						<img id="search-bar-button" src={searchIcon} />
					</button>
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
