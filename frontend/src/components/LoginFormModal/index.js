// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";

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

	return (
		<div id="login-container">
			<div className="signup-form-image">
				<img
					className="signup-image-logo"
					src="https://cdn.icon-icons.com/icons2/1703/PNG/512/basket_112184.png"
				/>
			</div>
			<div className="signup-header-name">Log In</div>
			<form onSubmit={handleSubmit}>
				<ul className="error-list-login">
					{Object.values(errors).map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
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
		</div>
	);
}

export default LoginFormModal;
