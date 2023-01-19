// create membership - join group

//create form modal

//imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkCreateMembership } from "../../../store/members";
import * as sessionActions from "../../../store/session";
import "./CreateMembership.css";

//main
const CreateMembership = () => {
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

		return dispatch(thunkCreateMembership(payload))
			.then((data) => history.push(`/groups/${data.memberId}/`))
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
				<div className="signup-form-image">
					<img
						className="signup-image-logo"
						src="https://cdn.icon-icons.com/icons2/1703/PNG/512/basket_112184.png"
					/>
				</div>
				<div className="signup-header-name">Join Group</div>
			</div>

			<form onSubmit={handleSubmit}>
				<div id="errors-create-group">
					<ul>
						{Object.values(errors).map((error) => (
							<li key={error}>{error}</li>
						))}
					</ul>
				</div>

				<div id="name" className="create">
					<label>
						First Name:{" "}
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							disabled
						/>
					</label>
				</div>
				<div id="name" className="create">
					<label>
						Last Name:{" "}
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}

							disabled
						/>
					</label>
				</div>

				<div id="about" className="create">
					<label>
						About:{" "}
						<input
							type="text"
							value={about}
							onChange={(e) => setAbout(e.target.value)}

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

						/>
					</label>
				</div>

				<div id="about" className="create">
					<label>
						Group Image:{" "}
						<input
							type="text"
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
					Create Group
				</button>
			</form>
		</div>
	);
};

export default CreateMembership;
