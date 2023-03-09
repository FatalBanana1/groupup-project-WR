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
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
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

		return setErrors({
			confirmed:
				"Confirm Password field must be the same as the Password field",
		});
	};

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
						<div>First Name:</div>
						<input
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
							placeholder="Required"
						/>
					</label>
				</div>

				<div id="lastname" className="signup">
					<label className="col">
						<div>Last Name:</div>
						<input
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							required
							placeholder="Required"
						/>
					</label>
				</div>

				<div id="email" className="signup">
					<label className="col">
						<div>Email:</div>
						<input
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							placeholder="Required"
						/>
					</label>
				</div>

				<div className="signup">
					<label className="col">
						<div>Username:</div>
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
							placeholder="Required"
						/>
					</label>
				</div>

				<div className="signup">
					<label className="col">
						{errors.password ? (
							<div className="errors-form">{errors.password}</div>
						) : (
							<div>Password:</div>
						)}
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							placeholder="Required"
						/>
					</label>
				</div>

				<div className="signup">
					<label className="col">
						{errors.confirmed ? (
							<div className="errors-form">
								{errors.confirmed}
							</div>
						) : (
							<div>Confirm Password:</div>
						)}
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
							placeholder="Required"
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
