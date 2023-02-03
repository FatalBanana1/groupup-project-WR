//create form modal

//imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkCreateGroups } from "../../../store/groups";
import { actionResetState } from "../../../store/members";
import { thunkReadMembers } from "../../../store/members";
import * as sessionActions from "../../../store/session";
import icon from "../../Groups/images/favicon.ico";

//main
const CreateEvent = () => {
	const dispatch = useDispatch();
	let history = useHistory();
	const [type, setType] = useState("In person");
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [name, setName] = useState("");
	const [about, setAbout] = useState("");
	const [url, setUrl] = useState("");
	const [preview, setPreview] = useState(true);
	const [privated, setPrivated] = useState(false);
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
	const stateError = "State is required";

	let groupId = useParams();
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
			image: { url, preview: true },
		};

		return dispatch(thunkCreateGroups(payload))
			.then((data) => {
				history.push(`/groups/${data.id}`);
			})
			.then(closeModal)
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.message)
					setErrors((data[errors] = [data.message]));
				if (data && data.errors) setErrors(Object.values(data.errors));
				console.log(`errors in create group`, errors);
			});
	};

	return (
		<div id="create-group-container">
			<div className="sign-up-container" id="create-group">
				<div className="form-icon">
					<img className="image-logo" src={icon} />
				</div>
				<div className="signup-header-name">Create an Event</div>
			</div>

			<div id="errors-create-group">
				{Object.values(errors).length > 0 ? (
					<ul>
						{/* <div className="errors-h">Errors</div> */}
						{Object.values(errors).map((error) => (
							<div className="errors-li" key={error}>
								{`- ${error}`}
							</div>
						))}
					</ul>
				) : null}
			</div>

			<form className="create-group-form" onSubmit={handleSubmit}>
				<div id="name" className="create">
					<label>
						Name:{" "}
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</label>
				</div>

				<div id="about" className="create">
					<label>
						Description:{" "}
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
						<div id="text-type">Type:</div>
						<div id="type-select">
							<select
								className="selected"
								value={type}
								onChange={(e) => setType(e.target.value)}
							>
								<option className="options">In person</option>
								<option className="options">Online</option>
							</select>
						</div>
					</label>
				</div>

				<div className="private">
					<label className="private-container">
						<div className="text-private">Private:</div>
						<div className="private-select">
							<select
								className="selected"
								value={privated}
								onChange={(e) =>
									setPrivated(
										e.target.value === "false"
											? false
											: true
									)
								}
							>
								<option value={true} className="options">
									Yes
								</option>
								<option value={false} className="options">
									No
								</option>
							</select>
						</div>
					</label>
				</div>

				<div id="city" className="create">
					<label>
						City:{" "}
						<input
							type="text"
							value={city}
							onChange={(e) => setCity(e.target.value)}
							required
						/>
					</label>
				</div>

				<div id="state" className="create">
					<label>
						State:{" "}
						<input
							type="text"
							value={state}
							onChange={(e) =>
								setState(e.target.value.toUpperCase())
							}
							required
						/>
					</label>
				</div>

				<div id="about" className="create">
					<label>
						Event Image:{" "}
						<input
							type="url"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
						/>
					</label>
				</div>

				<button
					id="submit-button"
					type="submit"
					className="create selected"
				>
					Create Event
				</button>
			</form>
		</div>
	);
};

export default CreateEvent;
