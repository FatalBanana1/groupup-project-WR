//read group detail

//imports
//hooks
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkReadGroupDetails, thunkUpdateGroup } from "../../../store/groups";
import "./UpdateGroup.css";
import icon from "../images/favicon.ico";
import apple from "../images/apple1.png";

//main
const UpdateGroup = ({ group }) => {
	const dispatch = useDispatch();
	let [type, setType] = useState(group.type);
	let [city, setCity] = useState(group.city);
	let [state, setState] = useState(group.state);
	let [name, setName] = useState(group.name);
	let [url, setUrl] = useState("");
	let [preview, setPreview] = useState(false);
	let [about, setAbout] = useState(group.about);
	let [privated, setPrivated] = useState(group.private);
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});

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
				dispatch(thunkReadGroupDetails(data.id));
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
				<div className="signup-header-name">Edit Group</div>
			</div>

			{/* <div id="errors-create-group">
				<ul>
					{Object.values(errors).map((error) => (
						<div className="errors-li" key={error}>
							{`- ${error}`}
						</div>
					))}
				</ul>
			</div> */}

			<form className="edit-group-form" onSubmit={handleSubmit}>
				<div id="name" className="create">
					<label className="col">
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
					<label className="col">
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
					<label className="col">
						{errors.image ? (
							<div>{errors.image}</div>
						) : (
							<div>Group Image Url:</div>
						)}
						<input
							type="url"
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
