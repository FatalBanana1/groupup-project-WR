// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./ProfileButton.css";
import DemoFormModal from "../DemoFormModal";
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
	}, [showMenu]);

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
				{showMenu ? `^` : `v`}
				<button className="profile-button" onClick={openMenu}>
					<i className="fas fa-user-circle" />
					{/* <i className="fa-solid fa-person" /> */}
				</button>
			</div>
			<ul className={ulClassName} ref={ulRef}>
				{user ? (
					<>
						<div>{user.username}</div>
						<div>
							{user.firstName} {user.lastName}
						</div>
						<div>{user.email}</div>
						<div>
							<button onClick={logout}>Log Out</button>
						</div>
					</>
				) : (
					<>
						<div>
							<OpenModalButton
								buttonText="Log In"
								onButtonClick={closeMenu}
								modalComponent={<LoginFormModal />}
							/>
						</div>
						<div>
							<OpenModalButton
								buttonText="Sign Up"
								onButtonClick={closeMenu}
								modalComponent={<SignupFormModal />}
							/>
						</div>
						<div>
							{/* <OpenModalButton
								buttonText="Demo User"
								onButtonClick={closeMenu}
								modalComponent={<DemoFormModal />}
							/> */}
							<button onClick={demoSignin1}>
								Demo User (Admin)
							</button>
						</div>
						<div>
							<button onClick={demoSignin2}>
								Demo User (Member)
							</button>
						</div>
						<div>
							<button onClick={demoSignin3}>
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
