// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./ProfileButton.css";
import { useModal } from "../../context/Modal";

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();
	const { closeModal } = useModal();

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu, dispatch]);

	const closeMenu = () => setShowMenu(false);

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
		closeMenu();
	};

	const demoSignin1 = (e) => {
		e.preventDefault();
		let credential = "Demo-lition";
		let password = "password";
		return dispatch(sessionActions.login({ credential, password })).then(
			closeModal
		);
	};

	const demoSignin2 = (e) => {
		e.preventDefault();
		let credential = "baggins";
		let password = "password2";
		return dispatch(sessionActions.login({ credential, password })).then(
			closeModal
		);
	};

	const demoSignin3 = (e) => {
		e.preventDefault();
		let credential = "thebaby";
		let password = "password4";
		return dispatch(sessionActions.login({ credential, password })).then(
			closeModal
		);
	};

	const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

	return (
		<>
			<div className="button-container">
				<div id="v-dropdown">
					{showMenu ? (
						<img
							onClick={openMenu}
							className="nav-arrow"
							src="https://cdn.icon-icons.com/icons2/936/PNG/512/up-arrow_icon-icons.com_73351.png"
							alt="up arrow"
						/>
					) : (
						<img
							onClick={openMenu}
							className="nav-arrow"
							src="https://cdn.icon-icons.com/icons2/936/PNG/512/angle-arrow-down_icon-icons.com_73683.png"
							alt="down arrow"
						/>
					)}
				</div>
				<button className="profile-button" onClick={openMenu}>
					<i className="fas fa-user-circle" />
					{/* <i className="fa-solid fa-person" /> */}
				</button>
			</div>
			<ul className={ulClassName} ref={ulRef}>
				{user ? (
					<>
						<div className="nav-details">{user.username}</div>
						<div className="nav-details">
							{user.firstName} {user.lastName}
						</div>
						<div className="nav-details">{user.email}</div>
						<div className="nav-details">
							<button id="nav-details-log-out" onClick={logout}>
								Log Out
							</button>
						</div>
					</>
				) : (
					<>
						<div className="users">
							<OpenModalButton
								className="users-button dropdown-buttons"
								buttonText="Log In"
								onButtonClick={closeMenu}
								modalComponent={<LoginFormModal />}
							/>
						</div>
						<div className="users">
							<OpenModalButton
								className="users-button dropdown-buttons"
								buttonText="Sign Up"
								onButtonClick={closeMenu}
								modalComponent={<SignupFormModal />}
							/>
						</div>
						<div className="users">
							<button
								className="users-button dropdown-buttons"
								onClick={demoSignin1}
							>
								Demo User (Admin)
							</button>
						</div>
						<div className="users">
							<button
								className="users-button dropdown-buttons"
								onClick={demoSignin2}
							>
								Demo User (Member)
							</button>
						</div>
						<div className="users">
							<button
								className="users-button dropdown-buttons"
								onClick={demoSignin3}
							>
								Demo User (Non-member)
							</button>
						</div>
					</>
				)}
			</ul>
		</>
	);
}

export default ProfileButton;
