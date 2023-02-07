//read group detail

//imports

//main
const ReadRsvp = ({ rsvp }) => {
	let {
		id,
		firstName,
		lastName,
		avatar,
		username,
		Attendances,
		Memberships,
	} = rsvp;

	// console.log(` read rsvp >---`, rsvp);

	//dates
	let date = new Date(Attendances[0].createdAt).toString().split(" ");
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
				{avatar ? (
					<img
						src={avatar}
						id="read-members-img"
						alt="avatar image"
					/>
				) : (
					<img
						src="https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns="
						className="no-groups-img-read"
						id="read-members-img"
						alt="no image available"
					/>
				)}
			</div>

			<div className="rsvp-detail-right">
				<h3 id="detail-right-name">
					{firstName} {lastName}
				</h3>
				<div className="about-section">{`Username: ${username}`}</div>
				<div className="about-section">
					{`Status: ${
						Attendances[0].status[0].toUpperCase() +
						Attendances[0].status.substring(1)
					}`}
				</div>
			</div>
		</div>
	);
};

//exports
export default ReadRsvp;

/*
{organizer.length && organizerId !== id ? (
	<div className="hiddens">
		<EditModalButton
			id="update-group-button"
			buttonText="Edit Status"
			onButtonClick={closeMenu}
			modalComponent={
				<UpdateMembership member={member} />
			}
		/>
	</div>
) : null}

{
	id,
	firstName,
	lastName,
	avatar,
	username,
	Attendance: [{userId, status, createdAt}]
	Memberships: [{groupId, status, createdAt}]

}


*/
