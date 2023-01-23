//read group detail

//imports
//hooks
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkReadGroupDetails, thunkUpdateGroup } from "../../../store/groups";
import * as sessionActions from "../../../store/session";

//comps
import { NavLink } from "react-router-dom";
import "./UpdateGroup.css";
import icon from "../images/favicon.ico";

//main
const UpdateGroup = ({ group }) => {
	// let {
	// 	id,
	// 	organizerId,
	// 	name,
	// 	about,
	// 	type,
	// 	privates,
	// 	city,
	// 	state,
	// 	numMembers,
	// 	previewImage,
	// } = group;
	console.log(`group =============`, group);

	const dispatch = useDispatch();
	let history = useHistory();
	let [type, setType] = useState(group.type);
	let [city, setCity] = useState(group.city);
	let [state, setState] = useState(group.state);
	let [name, setName] = useState(group.name);
	let [url, setUrl] = useState("");
	let [preview, setPreview] = useState(false);
	let [about, setAbout] = useState(group.about);
	let [privated, setPrivated] = useState(group.private);
	let [showPreview, setShowPreview] = useState("hidden");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();
	const stateError = "State is required";

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);

		const payload = {
			id: group.id,
			name,
			about,
			type,
			private: privated,
			city,
			state,
			image: { url, preview },
		};

		return dispatch(thunkUpdateGroup(payload))
			.then((data) => {
				console.log(`data returned from update`, data);
				dispatch(thunkReadGroupDetails(data.id));
			})
			.then(closeModal)
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.message === "Authentication required")
					setErrors((data[errors] = [data.message]));
				if (data && data.errors) setErrors(Object.values(data.errors));
			});
	};

	return (
		<div id="create-group-container">
			<div className="sign-up-container" id="create-group">
				<div className="form-icon">
					<img className="image-logo" src={icon} />
				</div>
				<div className="signup-header-name">Edit Group</div>
				<div className="edit-group-req">(* is required)</div>
			</div>

			<div id="errors-create-group">
				<ul>
					{Object.values(errors).map((error) => (
						<div className="errors-li" key={error}>
							{`- ${error}`}
						</div>
					))}
				</ul>
			</div>

			<form className="edit-group-form" onSubmit={handleSubmit}>
				<div id="name" className="create">
					<label>
						*Name:{" "}
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
						*About:{" "}
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
						<div className="privated">Private:</div>
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
								<option
									value={true}
									className="options"
									onChange={() => setPrivated(true)}
								>
									Yes
								</option>
								<option
									value={false}
									className="options"
									onChange={() => setPrivated(false)}
								>
									No
								</option>
							</select>
						</div>
					</label>
				</div>

				<div id="city" className="create">
					<label>
						*City:{" "}
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
						*State:{" "}
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
						Group Image Url:{" "}
						<input
							type="text"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
						/>
					</label>
				</div>

				<div className="private" id="private-edit">
					<label className="private-container">
						<div className="text-private">
							Set as Default Image:
						</div>
						<div className="private-select">
							<select
								className="selected"
								value={preview}
								onChange={(e) =>
									setPreview(
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

				<button
					id="submit-button"
					type="submit"
					className="create selected"
				>
					Edit Group
				</button>
			</form>
		</div>
	);
};

//exports
export default UpdateGroup;

//structure of group prop
// {
// 	id,
// 	organizerId,
// 	name,
// 	about,
// 	type,
// 	privates,
// 	city,
// 	state,
// 	numMembers,
// 	previewImage,
// }
