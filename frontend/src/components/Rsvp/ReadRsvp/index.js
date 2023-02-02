//read group detail

//imports
import "./ReadEvents.css";

//main
const ReadRsvp = ({ event }) => {
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
	} = event;

	//dates
	let date = new Date(startDate).toString().split(" ");
	let month = date[1];
	let day = date[2];
	let year = date[3];
	let time = date[4].split(":").splice(0, 2).join(":");
	let ampm = Number(time.slice(0, 2));
	if (ampm > 11) {
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
					<img src={previewImage} id="read-groups-img" />
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
				<div className="li-tag-members-line">
					{`${Group.name} attendees`}
					<li className="li-tags" />
					{`${Group.city}, ${Group.state}`}
				</div>
				<div className="li-tag-members-line">
					{`${numAttending} attendees`}
					{/* <li className="li-tags" /> */}
					{/* {`${price ? `Private` : `Public`}`} */}
				</div>
			</div>
		</div>
	);
};

//exports
export default ReadRsvp;

/*

{
	id,
	firstName,
	lastName,
	Attendance: {status}
	
}


*/
