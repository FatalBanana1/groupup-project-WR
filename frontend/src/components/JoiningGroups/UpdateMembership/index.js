//read group detail

//imports
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useModal } from "../../../context/Modal";
import { thunkReadGroupDetails, thunkUpdateGroup } from "../../../store/groups";
import * as sessionActions from "../../../store/session";
import { NavLink } from "react-router-dom";
import "./UpdateGroup.css";
import icon from "../../Groups/images/favicon.ico";
import {
	thunkDeleteMembership,
	thunkReadMembers,
	thunkUpdateMembership,
} from "../../../store/members";

//main
const UpdateMembership = ({ member }) => {
	let { id, firstName, lastName, username, email } = member;
	// states
	const dispatch = useDispatch();
	let params = useParams();
	const [status, setStatus] = useState(member.status);
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	let groupId = useSelector((state) => state.groups.id);
	if (!groupId) {
		groupId = params.groupId;
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);

		const payload = {
			groupId,
			memberId: member.id,
			status,
		};
		if (status === "remove") {
			dispatch(thunkDeleteMembership(payload))
				.then(() => dispatch(thunkReadMembers(payload)))
				.then(closeModal)
				.catch(async (res) => {
					const data = await res.json();
					if (data && data.errors)
						setErrors(Object.values(data.errors));
				});
		} else {
			return dispatch(thunkUpdateMembership(payload))
				.then((data) => {
					dispatch(thunkReadMembers(data));
				})
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
						*Username:{" "}
						<input
							type="text"
							value={username}
							// onChange={(e) => setUsername(e.target.value)}
							required
							disabled
						/>
					</label>
				</div>

				<div className="private">
					<label className="private-container">
						<div className="privated">*Status:</div>
						<div className="private-select">
							<select
								className="selected"
								value={status}
								onChange={(e) => setStatus(e.target.value)}
							>
								<option
									value={"member"}
									className="options"
									onChange={() => setStatus("member")}
								>
									Member
								</option>
								<option
									value={"co-host"}
									className="options"
									onChange={() => setStatus("co-host")}
								>
									Co-host
								</option>

								<option
									value={"remove"}
									className="options"
									onChange={() => setStatus("remove")}
								>
									Delete Member
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
};

//exports
export default UpdateMembership;