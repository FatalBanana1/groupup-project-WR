//home js

//imports
//hooks

//comps
import Groups from "../Groups";
import { Redirect, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Splash.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

//main
const Splash = () => {
	//states

	//handler

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
						// src="https://i.pinimg.com/564x/11/cd/2c/11cd2ce3a8f1faa87632f7f8a7080647.jpg"
					/>
				</div>
			</div>
			<div id="groups-link-container">
				<NavLink className="splash-link" to="/groups">
					Find Groups
				</NavLink>
			</div>
		</div>
	);
};

//exports
export default Splash;
