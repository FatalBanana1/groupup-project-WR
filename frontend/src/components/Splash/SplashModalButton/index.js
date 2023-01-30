// frontend/src/components/OpenModalButton/index.js
import React from "react";
import { useModal } from "../../../context/Modal";
import "./SplashModalButton.css";

function SplashModalButton({
	modalComponent,
	buttonText,
	onButtonClick,
	onModalClose,
}) {
	const { setModalContent, setOnModalClose } = useModal();

	const onClick = () => {
		if (typeof onButtonClick === "function") onButtonClick();
		if (typeof onModalClose === "function") setOnModalClose(onModalClose);
		setModalContent(modalComponent);
	};

	return (
		// <button className="users-button dropdown-buttons" onClick={onClick}>
		<button className="splash-group-button" id="start-group-btn" onClick={onClick}>
			{buttonText}
		</button>
	);
}

export default SplashModalButton;
