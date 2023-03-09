// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useModal } from "../../context/Modal";
import "./ProfileButton.css";
import upArrow from "../Groups/images/up-arrow.png";
import downArrow from "../Groups/images/down-arrow.png";
import { NavLink, useHistory } from "react-router-dom";
import CreateGroup from "../Groups/CreateGroup";
import CreateModalButton from "../Groups/CreateGroup/CreateModalButton";
import CreateModalDrop from "./CreateModalDrop";

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	let history = useHistory();
	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();
	const { closeModal } = useModal();

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	//-------------------

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
		history.push("/");
	};

	const demoSignin1 = (e) => {
		e.preventDefault();
		let credential = "heisenberg";
		let password = "password";
		return dispatch(sessionActions.login({ credential, password }))
			.then(closeModal)
			.then(() => history.push("/"));
	};

	const demoSignin2 = (e) => {
		e.preventDefault();
		let credential = "baggins";
		let password = "password2";
		return dispatch(sessionActions.login({ credential, password }))
			.then(closeModal)
			.then(() => history.push("/"));
	};

	const demoSignin3 = (e) => {
		e.preventDefault();
		let credential = "thebaby";
		let password = "password4";
		return dispatch(sessionActions.login({ credential, password }))
			.then(closeModal)
			.then(() => history.push("/"));
	};

	const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

	return (
		<>
			{user ? (
				<div className="button-container">
					<div id="v-dropdown">
						{showMenu ? (
							<img
								onClick={openMenu}
								className="nav-arrow"
								src={upArrow}
								alt="up arrow"
							/>
						) : (
							<img
								onClick={openMenu}
								className="nav-arrow"
								src={downArrow}
								alt="down arrow"
							/>
						)}
					</div>
					<button className="profile-button" onClick={openMenu}>
						{user.avatar ? (
							<img src={user.avatar} id="nav-members-img" />
						) : (
							<i className="fas fa-user-circle" />
						)}

						{/* <i className="fa-solid fa-person" /> */}
					</button>
				</div>
			) : (
				<div className="no-user-container">
					<div className="no-user">
						<div className="users">
							<OpenModalButton
								buttonText="Log In"
								onButtonClick={closeMenu}
								modalComponent={<LoginFormModal />}
							/>
						</div>
					</div>
					<div className="no-user">
						<div className="users">
							<OpenModalButton
								buttonText="Sign Up"
								onButtonClick={closeMenu}
								modalComponent={<SignupFormModal />}
							/>
						</div>
					</div>

					<div id="v-dropdown" className="no-login-hide">
						{showMenu ? (
							<img
								onClick={openMenu}
								className="nav-arrow"
								src={upArrow}
								alt="up arrow"
							/>
						) : (
							<img
								onClick={openMenu}
								className="nav-arrow"
								src={downArrow}
								alt="down arrow"
							/>
						)}
					</div>
				</div>
			)}

			<ul className={ulClassName} ref={ulRef}>
				{user ? (
					<div className="row">
						<div className="drop-left">
							<NavLink className="nav-details" to={`/`}>
								Home
							</NavLink>

							<div className="nav-details">Edit Profile</div>

							<div className="nav-details">My Groups</div>

							<CreateModalDrop
								buttonText="Create a group"
								onButtonClick={closeMenu}
								modalComponent={<CreateGroup />}
							/>
						</div>

						<div className="drop-right">
							<div>
								<div className="dropdown-tags">Username:</div>
								<div className="nav-details">
									{user.username}
								</div>
							</div>
							<div>
								<div className="dropdown-tags">Name:</div>
								<div className="nav-details">
									{user.firstName} {user.lastName}
								</div>
							</div>
							<div>
								<div className="dropdown-tags">Email:</div>
								<div className="nav-details">{user.email}</div>
							</div>
							<div className="nav-details">
								<button
									id="nav-details-log-out"
									onClick={logout}
								>
									Log Out
								</button>
							</div>
						</div>
					</div>
				) : (
					<>
						<div className="users">
							<OpenModalButton
								props="login-btns small-drop"
								buttonText="Log In"
								onButtonClick={closeMenu}
								modalComponent={<LoginFormModal />}
							/>
						</div>
						<div className="users">
							<OpenModalButton
								props="login-btns small-drop"
								buttonText="Sign Up"
								onButtonClick={closeMenu}
								modalComponent={<SignupFormModal />}
							/>
						</div>
						<div className="users">
							<button
								className="login-btns small-drop"
								onClick={demoSignin1}
							>
								Demo User (Admin)
							</button>
						</div>
						<div className="users">
							<button
								className="login-btns small-drop"
								onClick={demoSignin2}
							>
								Demo User (Member)
							</button>
						</div>
						<div className="users">
							<button
								className="login-btns small-drop"
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
