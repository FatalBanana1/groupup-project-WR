// footer

import { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Footer.css";
import { actionResetState } from "../../store/groups";
import { actionResetStateEvent } from "../../store/events";
import { removeSearch } from "../../store/search";
import Loading from "../Loading";

function Footer({ isLoaded }) {
	// const sessionUser = useSelector((state) => state.session.user);

	//return

	let dispatch = useDispatch();

	const clickHandlerGroups = () => {
		dispatch(removeSearch());
	};
	const clickHandlerEvents = () => {
		dispatch(removeSearch());
	};

	if (isLoaded) {
		return (
			<div className="footer-container">
				<div className="footer-header">
					<div className="footer-col">
						<div className="footer-title">Your Account</div>
						<NavLink exact to="/" id="footer-links">
							Home
						</NavLink>
					</div>

					<div className="footer-col">
						<div className="footer-title">Groupup</div>
						<NavLink
							exact
							to="/groups"
							id="footer-links"
							onClick={clickHandlerGroups}
						>
							Groups
						</NavLink>
						<NavLink
							exact
							to="/events"
							id="footer-links"
							onClick={clickHandlerEvents}
						>
							Events
						</NavLink>
					</div>

					<div className="footer-col">
						<div className="footer-title">Discover</div>
						<a
							id="footer-links-wr"
							href="https://wasiqr-portfolio.onrender.com/"
							target="_blank"
						>
							Wasiq Rashid
						</a>
						<a
							id="footer-links"
							href="https://www.linkedin.com/in/wasiq-rashid-fsd/"
							target="_blank"
						>
							Linkedin
						</a>
						<a
							href="https://github.com/FatalBanana1"
							id="footer-links"
							target="_blank"
						>
							GitHub
						</a>
						<a
							href="https://www.youtube.com/@leetwh"
							id="footer-links"
							target="_blank"
						>
							Youtube
						</a>
					</div>
				</div>

				<div className="footer-end-container">
					<div className="spacer-footer">2023 Groupup</div>

					<div className="last-footer-line">
						<a
							href="https://wasiqr-portfolio.onrender.com/"
							id="footer-links-wr"
							className="spacer-footer"
							target="_blank"
						>
							Made By Wasiq Rashid
						</a>

						<div className="spacer-footer">
							PERN Stack Project • PostgreSQL • Express • React •
							Node.js
						</div>
					</div>
				</div>
			</div>
		);
	} else return <Loading />;
}

export default Footer;
