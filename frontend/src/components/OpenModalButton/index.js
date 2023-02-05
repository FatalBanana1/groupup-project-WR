// frontend/src/components/OpenModalButton/index.js
import React from "react";
import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import "./OpenModalButton.css";

function OpenModalButton({
	modalComponent, // component to render inside the modal
	buttonText, // text of the button that opens the modal
	onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
	onModalClose, // optional: callback function that will be called once the modal is closed
	props,
}) {
	const { setModalContent, setOnModalClose } = useModal();
	let dynClass;

	// console.log(`log in class PARAMS--------`, props);

	if (props) {
		dynClass = props;
	} else {
		dynClass = `login-btns`;
	}

	const onClick = () => {
		if (typeof onButtonClick === "function") onButtonClick();
		if (typeof onModalClose === "function") setOnModalClose(onModalClose);
		setModalContent(modalComponent);
	};

	return (
		// <button className="users-button dropdown-buttons" onClick={onClick}>
		<button className={dynClass} onClick={onClick}>
			{buttonText}
		</button>
	);
}

export default OpenModalButton;
