//imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import "../Events.css";
import icon from "../../Groups/images/favicon.ico";
import apple from "../../Groups/images/apple1.png";
import { thunkDeleteEvent } from "../../../store/events";

//main
export default function DeleteEvent({ event }) {
	let { id, type } = event;

	const dispatch = useDispatch();
	let history = useHistory();
	let [name, setName] = useState("");
	const [errors, setErrors] = useState({});
	const { closeModal } = useModal();

	// console.log(`privated`, group.group);

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});

		if (name === `Delete ${event.name}`) {
			const payload = {
				eventId: event.id,
			};

			return dispatch(thunkDeleteEvent(payload))
				.then(closeModal)
				.then(history.push("/events"))
				.catch(async (res) => {
					const data = await res.json();
					if (data && data.message)
						setErrors((data[errors] = [data.message]));
					if (data && data.errors) setErrors(data.errors);
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
				<div className="signup-header-name">Delete Event</div>
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
						<div>Name:</div>
						<input
							type="text"
							readOnly
							defaultValue={event.name}
							required
							disabled
						/>
					</label>
				</div>

				<div id="type">
					<label id="type-container">
						<div>Type:</div>
						<select
							className="selected"
							readOnly
							defaultValue={type}
							disabled
						>
							<option className="options">{type}</option>
						</select>
					</label>
				</div>

				<div id="confirm-name" className="creator">
					<label id="deleting-confirm-container">
						<div id="confirming-delete">
							Confirm Delete by typing out Delete followed by the
							name of the Group:
							<div id="check-delete-type">{`Delete ${event.name}`}</div>
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
					Delete Event
				</button>
			</form>
		</div>
	);
}
