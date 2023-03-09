//imports
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { thunkReadEventDetails, thunkUpdateEvent } from "../../../store/events";
import icon from "../../Groups/images/favicon.ico";
import apple from "../../Groups/images/apple1.png";

//main
export default function UpdateEvent({ event }) {
	const dispatch = useDispatch();
	const { closeModal } = useModal();
	const starting = new Date(event.startDate).toISOString().slice(0, -8);
	const ending = new Date(event.endDate).toISOString().slice(0, -8);
	//states
	const [name, setName] = useState(event.name);
	const [description, setDescription] = useState(event.description);
	const [capacity, setCapacity] = useState(event.capacity);
	const [type, setType] = useState(event.type);
	const [address, setAddress] = useState(event.Venue.address);
	const [city, setCity] = useState(event.Venue.city);
	const [state, setState] = useState(event.Venue.state);
	const [price, setPrice] = useState(event.price);
	const [startDate, setStartDate] = useState(starting);
	const [endDate, setEndDate] = useState(ending);
	const [url, setUrl] = useState("");
	const [preview, setPreview] = useState(false);
	const [errors, setErrors] = useState({});

	// submit
	const handleSubmit = (e) => {
		e.preventDefault();
		if (Object.values(errors).length > 0) {
			return;
		}
		let payload;
		if (type === "Online") {
			payload = {
				id: event.id,
				groupId: event.Group.id,
				name,
				description,
				type,
				price,
				capacity,
				startDate,
				endDate,
				venueId: 1,
				image: { url, preview },
			};
		} else {
			payload = {
				id: event.id,
				groupId: event.Group.id,
				name,
				description,
				type,
				price,
				capacity,
				startDate,
				endDate,
				venueId: event.Venue.id,
				venue: { address, city, state },
				image: { url, preview },
			};
		}
		return dispatch(thunkUpdateEvent(payload))
			.then((data) => dispatch(thunkReadEventDetails(data.id)))
			.then(closeModal)
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			});
	};

	//---------------------------------------

	const handleName = (e) => {
		const val = e.target.value;
		if (val.length < 2) {
			setErrors({ name: `Name must be at least 2 characters` });
		} else {
			setErrors({});
		}
		setName(val);
	};
	const handleDescription = (e) => {
		const val = e.target.value;
		if (val.length > 1000) {
			setErrors({
				description: `Description must be less than 1000 characters`,
			});
		} else {
			setErrors({});
		}
		setDescription(val);
	};
	const handleState = (e) => {
		const val = e.target.value.toUpperCase();
		const newVal = val.replace(/\s/g, "");
		const isLettersOnly = /^[a-zA-Z\s]*$/.test(newVal);

		if (!isLettersOnly) {
			setErrors({ state: "State can only contain letters" });
		}
		if (newVal.length > 2 || newVal.length < 2) {
			setErrors({ state: `State must be 2 characters` });
		} else {
			setErrors({});
		}
		setState(newVal);
	};
	const handlePrice = (e) => {
		const inputValue = e.target.value;
		if (inputValue < 0) {
			setErrors({ price: `Price must be a valid number` });
		}
		if (/^\d*$/.test(inputValue)) {
			setErrors({});
			setPrice(inputValue);
		}
	};
	const handleCapacity = (e) => {
		let val = e.target.value;
		if (val < 0 || val > 400000000) {
			setErrors({ capacity: `Capacity must be a valid number` });
		} else {
			setErrors({});
			const inputValue = e.target.value;
			if (/^\d*$/.test(inputValue)) {
				setCapacity(inputValue);
			}
		}
	};
	const handleStartDateChange = (event) => {
		const val = event.target.value;
		if (Date.parse(val) < Date.parse(new Date()) || !val) {
			setErrors({
				startDate: `Start date and time must be in the future`,
			});
		} else {
			setErrors({});
			setStartDate(val);
		}
	};
	const handleEndDateChange = (event) => {
		const val = event.target.value;
		if (
			Date.parse(val) < Date.parse(new Date()) ||
			Date.parse(val) < Date.parse(startDate) ||
			!startDate ||
			!val
		) {
			setErrors({
				endDate: `End date and time must be after Start time`,
			});
		} else {
			setErrors({});
			setEndDate(val);
		}
	};

	//---------------------------------------

	// console.log(`group in create event ================`, event.type);
	// console.log(`group in create event ================`, errors);

	if (event && event.type) {
		//return
		return (
			<div id="create-group-container">
				<div className="sign-up-container" id="create-group">
					<div className="form-icon">
						<img className="image-logo fall" src={apple} />
						<img className="image-logo spins" src={icon} />
					</div>
					<div className="signup-header-name">Edit Event</div>
				</div>

				<form className="create-group-form" onSubmit={handleSubmit}>
					<div id="name" className="create">
						<label>
							{errors.name ? (
								<div className="errors-form">{errors.name}</div>
							) : (
								<div>Name:</div>
							)}
							<input
								type="text"
								value={name}
								onChange={handleName}
								placeholder="Required"
								required
							/>
						</label>
					</div>

					<div id="about" className="create">
						<label>
							{errors.description ? (
								<div className="errors-form">
									{errors.description}
								</div>
							) : (
								<div>Description:</div>
							)}
							<textarea
								type="text"
								value={description}
								onChange={handleDescription}
							/>
						</label>
					</div>

					<div className="create">
						<label>
							<div>Type:</div>
							<select
								value={type}
								onChange={(e) => {
									setCity("");
									setState("");
									setAddress("");
									setType(e.target.value);
								}}
							>
								<option value="In person" className="options">
									In person
								</option>
								<option value="Online" className="options">
									Online
								</option>
							</select>
						</label>
					</div>

					<div id="about" className="create">
						<label>
							{errors.capacity ? (
								<div className="errors-form">
									{errors.capacity}
								</div>
							) : (
								<div>Capacity:</div>
							)}
							<input
								value={capacity}
								type="number"
								id="number-input"
								onChange={handleCapacity}
								placeholder="Number Required"
								required
							></input>
						</label>
					</div>

					<div id="about" className="create">
						<label>
							{errors.price ? (
								<div className="errors-form">
									{errors.price}
								</div>
							) : (
								<div>Price:</div>
							)}
							<input
								value={price}
								type="number"
								id="number-input"
								placeholder="Number Required"
								onChange={handlePrice}
								required
							></input>
						</label>
					</div>

					{type === "In person" && (
						<>
							<div className="create">
								<label>
									{errors.address ? (
										<div className="errors-form">
											{errors.address}
										</div>
									) : (
										<div>Address:</div>
									)}
									<input
										type="text"
										value={address}
										onChange={(e) =>
											setAddress(e.target.value)
										}
										placeholder="Required"
										required
									/>
								</label>
							</div>

							<div id="city" className="create">
								<label>
									{errors.city ? (
										<div className="errors-form">
											{errors.city}
										</div>
									) : (
										<div>City:</div>
									)}
									<input
										type="text"
										value={city}
										placeholder="Required"
										onChange={(e) =>
											setCity(e.target.value)
										}
										required
									/>
								</label>
							</div>

							<div id="state" className="create">
								<label>
									{errors.state ? (
										<div className="errors-form">
											{errors.state}
										</div>
									) : (
										<div>State:</div>
									)}
									<input
										type="text"
										placeholder="Required"
										value={state}
										onChange={handleState}
										required
									/>
								</label>
							</div>
						</>
					)}

					<div className="create">
						<label>
							{errors.startDate ? (
								<div className="errors-form">
									{errors.startDate}
								</div>
							) : (
								<div>Start Date:</div>
							)}
							<input
								type="datetime-local"
								id="start-date-time-input"
								value={startDate}
								onChange={handleStartDateChange}
								required
							/>
						</label>
					</div>

					<div className="create">
						<label>
							{errors.endDate ? (
								<div className="errors-form">
									{errors.endDate}
								</div>
							) : (
								<div>End Date:</div>
							)}
							<input
								type="datetime-local"
								id="end-date-time-input"
								value={endDate}
								onChange={handleEndDateChange}
								required
							/>
						</label>
					</div>

					<div id="about" className="create">
						<label>
							{errors.image ? (
								<div className="errors-form">
									{errors.image}
								</div>
							) : (
								<div>Event Image:</div>
							)}
							<input
								type="url"
								value={url}
								onChange={(e) => {
									setErrors({});
									setUrl(e.target.value);
								}}
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
						Edit Event
					</button>
				</form>
			</div>
		);
	} else return null;
}
