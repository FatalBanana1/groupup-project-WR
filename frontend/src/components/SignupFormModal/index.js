// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import icon from "../Groups/images/favicon.ico";
import apple from "../Groups/images/apple1.png";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [wemail, wsetEmail] = useState("");
	const [username, setUsername] = useState("");
	const [wusername, wsetUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [wfirstName, wsetFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [wlastName, wsetLastName] = useState("");
	const [password, setPassword] = useState("");
	const [wpassword, wsetPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [wconfirmPassword, wsetConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		let err = {};
		if (firstName.length < 2 || firstName.length > 20) {
			err[
				"firstName"
			] = `First Name must be between 2 and 20 characters long!`;
		}
		if (lastName.length < 2 || lastName.length > 20) {
			err[
				"lastName"
			] = `Last Name must be between 2 and 20 characters long!`;
		}
		if (password.length < 6 || password.length > 20) {
			err[
				"password"
			] = `Password must be between 6 and 20 characters long!`;
		}
		if (username.length < 4 || username.length > 20) {
			err[
				"username"
			] = `Username must be between 4 and 20 characters long!`;
		}
		if (email.length < 4 || email.length > 20) {
			err["email"] = `Email must be between 4 and 20 characters long!`;
		}
		if (!email.includes("@") || !email.includes(".")) {
			err["email"] = `Email address is incorrect!`;
		}
		if (password !== confirmPassword) {
			err["passwords"] = "Confirm Password does not match Password";
		}

		if (Object.keys(err).length > 0) {
			setErrors(err);
		}

		if (Object.keys(err).length === 0) {
			setErrors({});
			return dispatch(
				sessionActions.signup({
					email,
					username,
					firstName,
					lastName,
					password,
				})
			)
				.then(() => {
					return dispatch(
						sessionActions.login({ credential: email, password })
					);
				})
				.then(() => history.push("/"))
				.then(closeModal)
				.catch(async (res) => {
					const data = await res.json();
					if (data && data.errors) setErrors(data.errors);
				});
		}
	};

	//-------------------------
	//handlers

	const handleFirst = (e) => {
		const val = e.target.value;
		if (val.length < 2) {
			wsetFirstName(
				`First Name must be between 2 and 20 characters long!`
			);
		} else {
			wsetFirstName("");
		}
		setFirstName(val);
	};
	const handleLast = (e) => {
		const val = e.target.value;
		if (val.length < 2) {
			wsetLastName(`Last Name must be between 2 and 20 characters long!`);
		} else {
			wsetLastName("");
		}
		setLastName(val);
	};
	const handleUsername = (e) => {
		const val = e.target.value;

		if (val.length < 4 || val.length > 20) {
			wsetUsername(`Username must be between 4 and 20 characters long!`);
		} else {
			wsetUsername("");
		}
		setUsername(val);
	};
	const handleEmail = (e) => {
		const val = e.target.value;
		const isValidEmail = /\S+@\S+\.\S+/.test(val);
		if (!isValidEmail) {
			wsetEmail(`Email address is incorrect!`);
		} else {
			wsetEmail("");
		}
		setEmail(val);
	};
	const handlePassword = (e) => {
		const val = e.target.value;

		if (val.length < 6 || val.length > 20) {
			wsetPassword(`Password must be between 6 and 20 characters long!`);
		} else {
			wsetPassword("");
		}
		setPassword(val);
	};
	const handleConfirm = (e) => {
		const val = e.target.value;

		if (val !== password) {
			wsetConfirmPassword(`Confirm Password does not match Password`);
		} else {
			wsetConfirmPassword("");
		}
		setConfirmPassword(val);
	};

	//-------------------------

	return (
		<div id="signup-container">
			<div className="sign-up-container">
				<div className="form-icon">
					<img className="image-logo fall" src={apple} />
					<img className="image-logo spins" src={icon} />
				</div>
				<div className="signup-header-name">Sign Up</div>
			</div>
			{/* {errors.length === 0 ? null : (
				<div id="errors-list">
					<ul id="errors-list-signup">
						{errors.map((error) => (
							<div className="errors-li" key={error}>
								{`- ${error}`}
							</div>
						))}
					</ul>
				</div>
			)} */}
			<form className="signup-form" onSubmit={handleSubmit}>
				<div id="name" className="signup">
					<label className="col">
						{wfirstName ? (
							<div className="errors-form">{wfirstName}</div>
						) : (
							<div>First Name:</div>
						)}
					</label>
					<input
						type="text"
						className="input"
						value={firstName}
						onChange={handleFirst}
						required
						placeholder="Required"
					/>
				</div>

				<div id="lastname" className="signup">
					<label className="col">
						{wlastName ? (
							<div className="errors-form">{wlastName}</div>
						) : (
							<div>Last Name:</div>
						)}
					</label>
					<input
						type="text"
						className="input"
						value={lastName}
						onChange={handleLast}
						required
						placeholder="Required"
					/>
				</div>

				<div id="email" className="signup">
					<label className="col">
						{wemail ? (
							<div className="errors-form">{wemail}</div>
						) : (
							<div>Email:</div>
						)}
					</label>
					<input
						type="text"
						className="input"
						value={email}
						onChange={handleEmail}
						required
						placeholder="Required"
					/>
				</div>

				<div className="signup">
					<label className="col">
						{wusername ? (
							<div className="errors-form">{wusername}</div>
						) : (
							<div>Username:</div>
						)}
					</label>
					<input
						type="text"
						className="input"
						value={username}
						onChange={handleUsername}
						required
						placeholder="Required"
					/>
				</div>

				<div className="signup">
					<label className="col">
						{wpassword ? (
							<div className="errors-form">{wpassword}</div>
						) : (
							<div>Password:</div>
						)}
					</label>
					<input
						className="input"
						type="password"
						value={password}
						onChange={handlePassword}
						required
						placeholder="Required"
					/>
				</div>

				<div className="signup">
					<label className="col">
						{wconfirmPassword ? (
							<div className="errors-form">
								{wconfirmPassword}
							</div>
						) : (
							<div>Confirm Password:</div>
						)}
					</label>
					<input
						type="password"
						className="input"
						value={confirmPassword}
						onChange={handleConfirm}
						required
						placeholder="Required"
					/>
				</div>

				<button
					className="signup-button"
					id="submit-button"
					type="submit"
				>
					Sign Up
				</button>
			</form>
		</div>
	);
}

export default SignupFormModal;
