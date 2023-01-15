//create form modal

//imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import * as sessionActions from "../../../store/session";
import "./CreateGroup.css";

//main
const CreateGroup = () => {
	const dispatch = useDispatch();
	const [type, setType] = useState("In person");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [name, setName] = useState("");
	const [about, setAbout] = useState("");
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
					name,
					about,
					type,
					city,
					state,
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
		<div id="create-group-container">
			<div id="create-group">
				<h1>Create a Group</h1>
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
						Name
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</label>
				</div>
				<div id="about">
					<label>
						About
						<input
							type="text"
							value={about}
							onChange={(e) => setAbout(e.target.value)}
							required
						/>
					</label>
				</div>
				<div id="type">
					<label id="type-container">
						<div id="text-type">Type</div>
						<div id="type-select">
							<select>
								<option>In person</option>
								<option>Online</option>
							</select>
						</div>
					</label>
				</div>

				<div id="private">
					<label id="private-container">
						<div id="text-private">Private</div>
						<div id="private-select">
							<select>
								<option>True</option>
								<option>False</option>
							</select>
						</div>
					</label>
				</div>

				<div id="city">
					<label>
						City
						<input
							type="text"
							value={city}
							onChange={(e) => setCity(e.target.value)}
							required
						/>
					</label>
				</div>

				<div id="state">
					<label>
						State
						<input
							type="text"
							value={state}
							onChange={(e) => setState(e.target.value)}
							required
						/>
					</label>
				</div>

				<button id="submit-button" type="submit">
					Create Group
				</button>
			</form>
		</div>
	);
};

export default CreateGroup;
