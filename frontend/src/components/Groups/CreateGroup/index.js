//create form modal

//imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkCreateGroups } from "../../../store/groups";
import * as sessionActions from "../../../store/session";
import "./CreateGroup.css";

//main
const CreateGroup = () => {
	const dispatch = useDispatch();
	let history = useHistory();
	const [type, setType] = useState("In person");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [name, setName] = useState("");
	const [about, setAbout] = useState("");
	const [privated, setPrivated] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);

		const payload = {
			name,
			about,
			type,
			private: privated,
			city,
			state,
		};

		return dispatch(thunkCreateGroups(payload))
			.then(closeModal)
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});

		//------------

		// let createdGroup = dispatch(thunkCreateGroups(payload));
		// console.log(`created group------`, createdGroup);

		// if (createdGroup) {
		// 	history.push(`/groups/${createdGroup.id}`);
		// }
	};

	return (
		<div id="create-group-container">
			<div id="create-group">
				<h1>Create a Group</h1>
			</div>
			<form onSubmit={handleSubmit}>
				<div id="errors">
					<ul>
						{Object.values(errors).map((error) => (
							<li key={error}>{error}</li>
						))}
					</ul>
				</div>

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
							<select
								value={type}
								onChange={(e) => setType(e.target.value)}
							>
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
							<select
								value={privated}
								onChange={(e) =>
									setPrivated(
										e.target.value === "false"
											? false
											: true
									)
								}
							>
								<option value={true}>True</option>
								<option value={false}>False</option>
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
