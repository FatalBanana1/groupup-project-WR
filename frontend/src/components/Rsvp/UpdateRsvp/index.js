//imports
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import "../Rsvps.css";
import icon from "../../Groups/images/favicon.ico";
import {
	thunkDeleteRsvp,
	thunkReadRsvps,
	thunkUpdateRsvp,
} from "../../../store/rsvps";

//main
const UpdateRsvp = ({ rsvp }) => {
	let { firstName, lastName, username, Attendances } = rsvp;
	let currStatus = Attendances[0].status;
	let currId = Attendances[0].id;
	let eventId = Attendances[0].Event.id;
	// states
	const dispatch = useDispatch();
	let history = useHistory();
	let params = useParams();
	const [status, setStatus] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	// console.log(`1111111111event in update rsvp>>>-----`, eventId);

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		let payload = {
			eventId,
			id: currId,
			status,
			userId: rsvp.id,
		};
		if (status === "remove") {
			dispatch(thunkDeleteRsvp(payload))
				.then(() => dispatch(thunkReadRsvps(payload)))
				.then(closeModal)
				.catch(async (res) => {
					const data = await res.json();
					if (data && data.errors)
						setErrors(Object.values(data.errors));
				});
		} else {
			if (payload.status === "pending" || payload.status === "") {
				payload.status = "attending";
			}
			return dispatch(thunkUpdateRsvp(payload))
				.then(() => dispatch(thunkReadRsvps(payload)))
				.then(closeModal)
				.catch(async (res) => {
					const data = await res.json();
					if (data && data.message)
						setErrors((data[errors] = [data.message]));
					if (data && data.errors)
						setErrors(Object.values(data.errors));
				});
		}
	};

	if (rsvp) {
		// console.log(`update members==========`, currStatus);

		//return
		return (
			<div id="create-group-container">
				<div className="sign-up-container" id="create-group">
					<div className="form-icon">
						<img className="image-logo" src={icon} />
					</div>
					<div className="signup-header-name">Edit Group</div>
				</div>

				<form className="edit-group-form" onSubmit={handleSubmit}>
					<div id="name" className="create">
						<label>
							<div>Name:</div>
							<input
								type="text"
								value={`${firstName} ${lastName}`}
								required
								disabled
							/>
						</label>
					</div>

					<div id="name" className="create">
						<label>
							<div>Username:</div>
							<input
								type="text"
								value={username}
								required
								disabled
							/>
						</label>
					</div>

					<div className="private status">
						<label className="private-container">
							<div className="privated">*Status:</div>
							<div className="private-select">
								<select
									className="selected status"
									value={status}
									onChange={(e) => setStatus(e.target.value)}
								>
									<option
										value={"attending"}
										className="options"
										onChange={() => setStatus("attending")}
									>
										Attending
									</option>

									<option
										value={"waitlist"}
										className={`options`}
										onChange={() => setStatus("waitlist")}
									>
										Waitlist
									</option>

									<option
										value={"remove"}
										className="options"
										onChange={() => setStatus("remove")}
									>
										Delete Attendee
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
						Edit Member
					</button>
				</form>
			</div>
		);
	} else return null;
};
//exports
export default UpdateRsvp;
