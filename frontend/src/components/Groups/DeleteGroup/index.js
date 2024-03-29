//imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkDeleteGroup, thunkReadGroups } from "../../../store/groups";
import "./DeleteGroup.css";
import icon from "../images/favicon.ico";
import apple from "../images/apple1.png";

//main
const DeleteGroup = ({ group }) => {
	let {
		id,
		organizerId,
		about,
		type,
		private: privated,
		city,
		state,
		numMembers,
		previewImage,
	} = group;

	const dispatch = useDispatch();
	let history = useHistory();
	let [name, setName] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	// console.log(`privated`, group.group);

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);

		if (name === `Delete ${group.name}`) {
			const payload = {
				groupId: group.id,
			};

			return dispatch(thunkDeleteGroup(payload))
				.then(closeModal)
				.then(history.push("/groups"))
				.catch(async (res) => {
					const data = await res.json();
					if (data && data.message)
						setErrors((data[errors] = [data.message]));
					if (data && data.errors)
						setErrors(Object.values(data.errors));
				});
		} else {
			setErrors([
				"Please type out Delete followed by group name in final textbox.",
			]);
		}
	};

	return (
		<div id="delete-group-container">
			<div className="sign-up-container" id="create-group">
				<div className="form-icon">
					<img className="image-logo fall" src={apple} />
					<img className="image-logo spins" src={icon} />
				</div>
				<div className="signup-header-name">Delete Group</div>
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

			<form className="delete-form" onSubmit={handleSubmit}>
				<div id="name" className="create">
					<label>
						Name:{" "}
						<input
							type="text"
							readOnly
							defaultValue={group.name}
							required
							disabled
						/>
					</label>
				</div>

				<div id="about" className="create">
					<label>
						About:{" "}
						<input
							type="text"
							readOnly
							defaultValue={about}
							required
							disabled
						/>
					</label>
				</div>

				<div id="type">
					<label id="type-container">
						<div id="text-type">Type:</div>
						<div id="type-select">
							<select
								className="selected"
								readOnly
								defaultValue={type}
								disabled
							>
								<option className="options">{type}</option>
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
								readOnly
								defaultValue={privated ? `Yes` : `No`}
								disabled
							>
								<option className="options">
									{privated ? `Yes` : `No`}
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
							readOnly
							defaultValue={city}
							required
							disabled
						/>
					</label>
				</div>

				<div id="state" className="create">
					<label>
						State:{" "}
						<input
							type="text"
							readOnly
							defaultValue={state}
							required
							disabled
						/>
					</label>
				</div>

				<div id="confirm-name" className="creator">
					<label id="deleting-confirm-container">
						<div id="confirming-delete">
							Confirm Delete by typing out Delete followed by the
							name of the Group:
							<div id="check-delete-type">{`Delete ${group.name}`}</div>
						</div>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							className="deleting-confirm"
						/>
					</label>
				</div>

				<button
					id="submit-button"
					type="submit"
					className="create selected"
				>
					Delete Group
				</button>
			</form>
		</div>
	);
};

//exports
export default DeleteGroup;
