// errors modal

//imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import { useModal } from "../../../context/Modal";
// import * as sessionActions from "../../../store/session";
import icon from "../Groups/images/favicon.ico";
import "./ErrorHandler.css";

//main
const ErrorHandler = ({ errors }) => {
	const dispatch = useDispatch();
	let history = useHistory();
	// let [errors, setErrors] = useState([]);

	console.log(`ERRORS MODAL -------`, errors);

	return (
		<div id="create-group-container">
			<div className="sign-up-container" id="create-group">
				<div className="signup-header-name">Errors</div>
			</div>

			<div id="errors-create-group">
				{Object.values(errors).length > 0 ? (
					<ul>
						<div className="errors-h">Errors</div>
						{Object.values(errors).map((error) => (
							<li className="errors-li" key={error}>
								{error}
							</li>
						))}
					</ul>
				) : null}
			</div>
		</div>
	);
};

export default ErrorHandler;
