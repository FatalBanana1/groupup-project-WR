//read group detail

//imports
import star from "../../Groups/images/star-icon.png";
import share from "../../Groups/images/share-icon.png";

//main
const ReadEvent = (props) => {
	let {
		id,
		name,
		description,
		type,
		numAttending,
		previewImage,
		price,
		capacity,
		startDate,
		venueId,
		Group,
		Venue,
		Venues,
		EventImages,
	} = props.event;

	//dates
	let date = new Date(startDate).toString().split(" ");
	let month = date[1];
	let day = date[2];
	let year = date[3];
	let time = date[4].split(":").splice(0, 2).join(":");
	let ampm = Number(time.slice(0, 2));
	if (ampm > 12) {
		if (ampm > 21) {
			time = ampm - 12 + time.slice(2) + " PM EST";
		} else {
			time = ampm - 12 + time.slice(2) + " PM EST";
		}
	} else if (ampm === 12) {
		time += " PM EST";
	} else {
		time += " AM EST";
	}
	let weekday = date[0];

	//return
	return (
		<div id="detail-container">
			<div id="detail-left">
				{previewImage ? (
					<img
						src={previewImage}
						id="read-groups-img"
						alt="event image"
					/>
				) : EventImages && EventImages[0] ? (
					<img
						src={EventImages[0].url}
						id="read-groups-img"
						alt="event image"
					/>
				) : (
					<img
						src="https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns="
						className="no-groups-img-read"
					/>
				)}
			</div>
			<div id="detail-right">
				<div className="about-section">{`${weekday}, ${month} ${day} ${time}`}</div>
				<h3 id="detail-right-name">{name}</h3>
				{/* <div className="about-section">{description}</div> */}
				{Group ? (
					<>
						<div className="li-tag-group-name-line">
							{`${Group.name} • ${Group.city}, ${Group.state}`}
						</div>

						<div className="li-tag-events-line">
							{`${numAttending} attendees`}

							<div className="events-last-icons-container">
								<div className="events-last-share-icon">
									<img
										src={share}
										className="small-icons"
										alt="share icon"
									/>
								</div>
								<div>
									<img
										src={star}
										className="small-icons"
										alt="share icon"
									/>
								</div>
							</div>
							{/* <li className="li-tags" /> */}
							{/* {`${price ? `Private` : `Public`}`} */}
						</div>
					</>
				) : Venue ? (
					<div className="li-tag-group-name-line">
						{`${Venue.city}, ${Venue.state}`}
					</div>
				) : null}
			</div>
		</div>
	);
};

//exports
export default ReadEvent;

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
