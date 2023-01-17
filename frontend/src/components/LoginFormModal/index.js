// frontend/src/components/LoginFormModal/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
	const dispatch = useDispatch();
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(sessionActions.login({ credential, password }))
			.then(closeModal)
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
	};

	return (
		<div id="login-container">
			<h1>Log In</h1>
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
