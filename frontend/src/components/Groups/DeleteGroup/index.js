//read group detail

//imports
//hooks
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkDeleteGroup, thunkReadGroups } from "../../../store/groups";
import * as sessionActions from "../../../store/session";

//comps
import { NavLink } from "react-router-dom";
import Groups from "..";
import "./DeleteGroup.css";

//main
const DeleteGroup = (group) => {
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
	} = group.group;

	const dispatch = useDispatch();
	let history = useHistory();
	let [name, setName] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	useEffect(() => {
		dispatch(thunkReadGroups());
	}, [dispatch]);

	// {groups: {1:{1}, 2:{2}...} }
	const selector = useSelector((state) => state.groups);
	if (!selector)
		return <div className="groups-null">No Groups to display...</div>;
	const groups = Object.values(selector);

	console.log(`refreshing deleted!!! ====`, groups);

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);

		if (name === `Delete ${group.group.name}.`) {
			const payload = {
				...group,
				id: group.group.id,
				name,
				about,
				type,
				private: privated,
				city,
				state,
			};

			return dispatch(thunkDeleteGroup(payload))
				.then(() => history.push("/groups"))
				.then(closeModal)
				.catch(async (res) => {
					const data = await res.json();
					if (data && data.message === "Authentication required")
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
				<div className="signup-form-image">
					<img
						className="signup-image-logo"
						src="https://cdn.icon-icons.com/icons2/1703/PNG/512/basket_112184.png"
					/>
				</div>
				<div className="signup-header-name">Delete Group</div>
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
						Name:{" "}
						<input
							type="text"
							readOnly
							defaultValue={group.group.name}
							required
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
							>
								<option className="options">In person</option>
								<option className="options">Online</option>
							</select>
						</div>
					</label>
				</div>

				<div id="private">
					<label id="private-container">
						<div id="text-private">Private:</div>
						<div id="private-select">
							<select
								className="selected"
								readOnly
								defaultValue={privated}
							>
								<option
									readOnly
									defaultValue={true}
									className="options"
								>
									Yes
								</option>
								<option
									readOnly
									defaultValue={false}
									className="options"
								>
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
							readOnly
							defaultValue={city}
							required
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
						/>
					</label>
				</div>

				<div id="confirm-name" className="creator">
					<label id="deleting-confirm-container">
						<div id="confirming-delete">
							Confirm Delete by typing out Delete followed by the
							name of the Group:
							<div id="check-delete-type">{`Delete ${group.group.name}.`}</div>
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
