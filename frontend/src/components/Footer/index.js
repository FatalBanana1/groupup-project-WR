// footer

import { useState } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Footer.css";

function Footer({ isLoaded }) {
	// const sessionUser = useSelector((state) => state.session.user);

	//return
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
						<NavLink exact to="../groups" id="footer-links">
							Groups
						</NavLink>
						<NavLink exact to="/events" id="footer-links">
							Events
						</NavLink>
					</div>

					<div className="footer-col">
						<div className="footer-title">Discover</div>
						<a
							id="footer-links"
							href="https://www.linkedin.com/in/wasiq-rashid-3164b2258/"
							target="_blank"
						>
							Wasiq Rashid
						</a>
						<a
							id="footer-links"
							href="https://www.linkedin.com/in/wasiq-rashid-3164b2258/"
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
					</div>
				</div>

				<div className="footer-end-container">
					<div className="spacer-footer">2023 Groupup</div>

					<div className="last-footer-line">
						<a
							href="https://github.com/FatalBanana1"
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
	}
}

export default Footer;
