// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";
import icon from "../Groups/images/favicon.ico";
import apple from "../Groups/images/apple1.png";

function LoginFormModal() {
	const dispatch = useDispatch();
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
	let history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(sessionActions.login({ credential, password }))
			.then(closeModal)
			.then(() => history.push("/"))
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
				if (data && data.message) setErrors(data.message);
			});
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
		let credential = "kramer";
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

	return (
		<div id="login-container">
			<div className="form-icon">
				<img className="image-logo fall" src={apple} />
				<img className="image-logo spins" src={icon} />
			</div>
			<div className="signup-header-name">Log In</div>
			<ul className="error-list-login">
				{Object.values(errors).map((error) => (
					<div className="errors-li-login" key={error}>
						{`- ${error}`}
					</div>
				))}
			</ul>
			<form className="login-form-container" onSubmit={handleSubmit}>
				<div id="username">
					<label>
						Username or Email:{" "}
						<input
							type="text"
							value={credential}
							onChange={(e) => setCredential(e.target.value)}
							required
						/>
					</label>
				</div>
				<div id="password">
					<label>
						Password:{" "}
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
				</div>
				<button id="login-button" type="submit">
					Log In
				</button>
			</form>

			<div className="users">
				<button
					className="users-button dropdown-buttons"
					id="login-form-buttons"
					onClick={demoSignin1}
				>
					Demo User (Admin)
				</button>
			</div>
			<div className="users">
				<button
					className="users-button dropdown-buttons"
					id="login-form-buttons"
					onClick={demoSignin2}
				>
					Demo User (Member)
				</button>
			</div>
			<div className="users">
				<button
					className="users-button dropdown-buttons"
					id="login-form-buttons"
					onClick={demoSignin3}
				>
					Demo User (Non-member)
				</button>
			</div>
		</div>
	);
}

export default LoginFormModal;
