//search bar

//imports
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import searchIcon from "../Groups/images/search-icon4.png";
import { thunkSearch } from "../../store/search";

//main
const Searchbar = () => {
	//states
	let dispatch = useDispatch();
	const [search, setSearch] = useState("");
	let searchbar = useSelector((state) => state.search);

	//handlers
	//click handler
	const clickHandler = (e) => {
		e.preventDefault();
		setSearch(e.target.value);
		let newsearch = search.toLowerCase().split(" ").join("");
		setSearch("");
		searchbar["search"] = newsearch;
		dispatch(thunkSearch(search));
		return (
			<NavLink
				to={`/groups?name=${search}`}
				id="search-bar-link"
			></NavLink>
		);
	};

	const handleKeyDown = (e) => {
		if (e.keycode === 13) {
			setSearch(e.target.value);
			dispatch(thunkSearch(search));
			setSearch("");
			return (
				<NavLink
					to={`/groups?name=${search}`}
					id="search-bar-link"
				></NavLink>
			);
		}
	};

	//return
	return (
		<div id="nav-mid">
			<form
				onSubmit={handleKeyDown}
				id="nav-search-bar"
				className="search"
			>
				<input
					type="search"
					id="navbar-search"
					placeholder="Search for Groups"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					onKeyDown={handleKeyDown}
				/>

				<NavLink
					to={`/groups`}
					id="search-btn-container"
					defaultValue=""
					onClick={clickHandler}
				>
					<img id="search-bar-button" src={searchIcon} />
				</NavLink>
			</form>
		</div>
	);
};

export default Searchbar;
