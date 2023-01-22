// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
import icon from "../Groups/images/favicon.ico";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			setErrors([]);
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

		return setErrors([
			"Confirm Password field must be the same as the Password field",
		]);
	};

	return (
		<div id="signup-container">
			<div className="sign-up-container">
				<div className="form-icon">
					<img className="image-logo" src={icon} />
				</div>
				<div className="signup-header-name">Sign Up</div>
			</div>
			<form className="signup-form" onSubmit={handleSubmit}>
				{errors.length === 0 ? null : (
					<div id="errors-list">
						<ul id="errors-list-signup">
							{errors.map((error) => (
								<div className="errors-li" key={error}>
									{`- ${error}`}
								</div>
							))}
						</ul>
					</div>
				)}

				<div id="name" className="signup">
					<label>
						First Name:{" "}
						<input
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
						/>
					</label>
				</div>
				<div id="lastname" className="signup">
					<label>
						Last Name:{" "}
						<input
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							required
						/>
					</label>
				</div>
				<div id="email" className="signup">
					<label>
						Email:{" "}
						<input
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>
				</div>
				<div className="signup">
					<label>
						Username:{" "}
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</label>
				</div>

				<div className="signup">
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
				<div className="signup">
					<label>
						Confirm Password:{" "}
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</label>
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
