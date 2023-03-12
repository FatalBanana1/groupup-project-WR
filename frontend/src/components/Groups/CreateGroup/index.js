//create form modal

//imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkCreateGroups } from "../../../store/groups";
import icon from "../images/favicon.ico";
import apple from "../images/apple1.png";
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
	const [url, setUrl] = useState("");
	const [preview, setPreview] = useState(true);
	const [privated, setPrivated] = useState(false);
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});

		const payload = {
			name: name.trim(),
			about: about.trim(),
			type,
			private: privated,
			city: city.trim(),
			state: state.trim(),
			image: { url, preview: true },
		};
		return dispatch(thunkCreateGroups(payload))
			.then((data) => {
				history.push(`/groups/${data.id}`);
			})
			.then(closeModal)
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
	};

	return (
		<div id="create-group-container">
			<div className="sign-up-container" id="create-group">
				<div className="form-icon">
					<img className="image-logo fall" src={apple} />
					<img className="image-logo spins" src={icon} />
				</div>
				<div className="signup-header-name">Create a Group</div>
			</div>

			{/* <div id="errors-create-group">
				{Object.values(errors).length > 0 ? (
					<ul>
						{Object.values(errors).map((error) => (
							<div className="errors-li" key={error}>
								{`- ${error}`}
							</div>
						))}
					</ul>
				) : null}
			</div> */}

			<form className="create-group-form" onSubmit={handleSubmit}>
				<div id="name" className="create">
					<label>
						{errors.name ? (
							<div className="errors-form">{errors.name}</div>
						) : (
							<div>Name:</div>
						)}
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							placeholder="Required"
						/>
					</label>
				</div>

				<div id="about" className="create">
					<label>
						{errors.about ? (
							<div className="errors-form">{errors.about}</div>
						) : (
							<div>About:</div>
						)}
						<input
							type="text"
							value={about}
							onChange={(e) => setAbout(e.target.value)}
							required
							placeholder="Required"
						/>
					</label>
				</div>

				<div id="type" className="mtop5">
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

				<div className="private mtop5">
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
						{errors.city ? (
							<div className="errors-form">{errors.city}</div>
						) : (
							<div>City:</div>
						)}
						<input
							type="text"
							value={city}
							onChange={(e) => setCity(e.target.value)}
							required
							placeholder="Required"
						/>
					</label>
				</div>

				<div id="state" className="create">
					<label>
						{errors.state ? (
							<div className="errors-form">{errors.state}</div>
						) : (
							<div>State:</div>
						)}
						<input
							type="text"
							value={state}
							onChange={(e) =>
								setState(e.target.value.toUpperCase())
							}
							required
							placeholder="Required"
						/>
					</label>
				</div>

				<div id="about" className="create">
					<label>
						{errors.image ? (
							<div className="errors-form">{errors.image}</div>
						) : (
							<div>Group Image:</div>
						)}
						<input
							type="url"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							required
							placeholder="Url Required"
						/>
					</label>
				</div>

				<button
					id="submit-button"
					type="submit"
					className="create selected"
				>
					Create Group
				</button>
			</form>
		</div>
	);
};

export default CreateGroup;
