// frontend/src/components/Navigation/index.js
import React, { useState } from "react";
import { NavLink, Redirect, useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../Groups/images/groupup-logo5.png";
import searchIcon from "../Groups/images/search-icon4.png";
import Groups from "../Groups";

function Navigation({ isLoaded }) {
	let [search, setSearch] = useState("");
	const sessionUser = useSelector((state) => state.session.user);
	let history = useHistory();

	//search handler
	const searchHandler = (e) => {
		setSearch(e.target.value);

		// (`/groups?name=${newsearch}`)
	};

	//click handler
	const clickHandler = (e) => {
		// let trimmed = "?";
		// let newsearch = search.toLowerCase().split(" ").join("");

		// //check if type
		// if (newsearch.includes("in person")) {
		// 	trimmed += `type=In person`;
		// }
		// if (newsearch.includes("online")) {
		// 	trimmed += `type=Online`;
		// }
		// //check if name
		// if (newsearch) {
		// 	trimmed += `name=${newsearch}`;
		// }

		let newsearch = search.toLowerCase().split(" ").join("");

		console.log(`trimmed in nav---`, newsearch);

		return (
			<NavLink
				to={{
					pathname: `/groups?name=${newsearch}`,
					props: { query: newsearch },
				}}
				id=""
			>
				<Groups />
			</NavLink>
		);

		// console.log(`trimmed in nav---`, newsearch);
		// setSearch(newsearch);
		// history.push(`/groups?name=${newsearch}`);
	};

	//return
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
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>

				<div id="button-submit-query">
					<button
						type="submit"
						className="navbar-search-button"
						onClick={clickHandler}
					>
						<img id="search-bar-button" src={searchIcon} />
					</button>
				</div>

				<div id="nav-link-query">
					<NavLink
						to={{
							pathname: `/groups`,
							props: { query: search },
						}}
						id="search-btn-container"
					>
						Search
					</NavLink>
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
