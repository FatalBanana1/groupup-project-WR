// errors modal

import React from "react";
import { useModal } from "../../../context/Modal";
import "./ErrorModal.css";

function ErrorModalButton({
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
		<button
			className="users-button"
			id="create-group-button"
			onClick={onClick}
		>
			{buttonText}
		</button>
	);
}

export default ErrorModalButton;
