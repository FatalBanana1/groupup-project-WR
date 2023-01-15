//create form modal

//imports
//hooks

//comps

//main
// export default CreateGroupModal = () => {
// 	//return
// 	return;
// };

//exports

// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import * as sessionActions from "../../../store/session";
import "./CreateGroup.css";

const CreateGroup = () => {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

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
			<div id="sign-up">
				<h1>Sign Up</h1>
			</div>
			<form onSubmit={handleSubmit}>
				{errors ? null : (
					<div id="errors">
						<ul>
							{errors.map((error, idx) => (
								<li key={idx}>{error}</li>
							))}
						</ul>
					</div>
				)}
				<div id="name">
					<label>
						First Name
						<input
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							required
						/>
					</label>
				</div>
				<div id="lastname">
					<label>
						Last Name
						<input
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							required
						/>
					</label>
				</div>
				<div id="email">
					<label>
						Email
						<input
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</label>
				</div>
				<div id="username">
					<label>
						Username
						<input
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					</label>
				</div>

				<div id="password">
					<label>
						Password
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</label>
				</div>
				<div id="confirm-password">
					<label>
						Confirm Password
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
					</label>
				</div>
				<button id="submit-button" type="submit">
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default CreateGroup;
