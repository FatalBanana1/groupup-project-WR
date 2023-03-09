//imports
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Loading from "../../Loading";
import clock from "../../Groups/images/clock-icon.png";
import location from "../../Groups/images/location-icon.png";

//main
export default function AboutEvent({ event }) {
	let {
		id,
		venueId,
		groupId,
		name,
		description,
		type,
		capacity,
		price,
		startDate,
		endDate,
		Group,
		Venue,
		EventImages,
		numAttending,
		previewImage: image,
	} = event;

	let user = useSelector((state) => state.session.user);

	//dates
	let date = new Date(startDate).toString().split(" ");
	let month = date[1];
	let day = date[2];
	let year = date[3];
	let time = date[4].split(":").splice(0, 2).join(":");
	let ampm = Number(time.slice(0, 2));
	if (ampm > 12) {
		if (ampm > 21) {
			time = ampm - 12 + time.slice(2) + " PM";
		} else {
			time = ampm - 12 + time.slice(2) + " PM";
		}
	} else if (ampm === 12) {
		time += " PM";
	} else {
		time += " AM";
	}
	let weekday = date[0];

	let date2 = new Date(endDate).toString().split(" ");
	let month2 = date2[1];
	let day2 = date2[2];
	let year2 = date2[3];
	let time2 = date2[4].split(":").splice(0, 2).join(":");
	let ampm2 = Number(time2.slice(0, 2));
	if (ampm2 > 12) {
		if (ampm2 > 21) {
			time2 = ampm2 - 12 + time2.slice(2) + " PM EST";
		} else {
			time2 = ampm2 - 12 + time2.slice(2) + " PM EST";
		}
	} else if (ampm2 === 12) {
		time2 += " PM EST";
	} else {
		time2 += " AM EST";
	}
	let weekday2 = date2[0];

	let host;
	if (user) {
		host = Group.Memberships.find((el) => el.userId === user.id);
	}

	if (Venue.city === "N/A" || !Venue.city) {
		Venue.city = "Online";
		Venue.state = "";
	}

	if (event) {
		return (
			<div id="about-section-container">
				<div id="about-section-container-left">
					<h2 className="about-title-font">Details</h2>
					<div className="about-details-font">{description}</div>

					<div id="group-detail-images">
						<h2 className="about-title-font">
							{`Photos (${
								EventImages.length > 1
									? EventImages.length - 1
									: 0
							})`}
						</h2>
						<div className="about-details-font">
							{EventImages.length > 0 ? (
								EventImages.map((image) => (
									<img
										className="read-group-images"
										key={image.id}
										src={image.url}
										alt={`Event Image for: "${image.url}"`}
									/>
								))
							) : (
								<div>No Event Images...</div>
							)}
						</div>
					</div>
				</div>

				<div id="about-section-container-right">
					<div className="events-sticky">
						<NavLink
							to={`/groups/${groupId}`}
							className="events-side-panel events-link-side icons-container"
						>
							<div className="icons">
								<img
									src={Group.GroupImages[0].url}
									className="small-group-image"
									alt="share icon"
								/>
							</div>
							<div>
								<div className="event-venue-details-info">{`${Group.name}`}</div>
								<div className="event-venue-details-info gray-text">
									{`${
										Group.private ? "Private" : "Public"
									} group`}
								</div>
							</div>
						</NavLink>

						<div className="events-side-panel">
							<div className="event-details-info-container icons-container">
								<div className="icons">
									<img
										src={clock}
										className="small-icons"
										alt="share icon"
									/>
								</div>
								<div className="event-details-info">{`${weekday}, ${month} ${day}, ${year} at ${time} to ${weekday2}, ${month2} ${day2}, ${year2} at ${time2}`}</div>
							</div>
							<div className="event-details-info-container icons-container">
								<div className="icons">
									<img
										src={location}
										className="small-icons"
										alt="share icon"
									/>
								</div>
								<div className="event-venue-details-header">
									<div className="event-venue-details-info">{`${Venue.address}`}</div>
									{Venue.city === "Online" ? (
										<div className="event-venue-details-info gray-text">{`Online Only`}</div>
									) : (
										<div className="event-venue-details-info gray-text">{`${Venue.city}, ${Venue.state}`}</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	} else return <Loading />;
}
