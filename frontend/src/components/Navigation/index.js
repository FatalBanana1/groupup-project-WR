// frontend/src/components/Navigation/index.js
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../Groups/images/groupup-logo.png";
import searchIcon from "../Groups/images/search-icon4.png";

function Navigation({ isLoaded }) {
	let [search, setSearch] = useState("");
	const sessionUser = useSelector((state) => state.session.user);

	//search handler
	const searchHandler = (e) => {
		setSearch(e.target.value);
	};

	//click handler
	const clickHandler = (e) => {
		let newsearch = search.toString();
		console.log(newsearch);
		// return
	};

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
						value={search}
						onChange={searchHandler}
					/>
				</div>

				<div to={`/groups/${clickHandler}`} id="search-btn-container">
					<button className="navbar-search-button">
						<img
							id="search-bar-button"
							src={searchIcon}
							onClick={clickHandler}
						/>
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
