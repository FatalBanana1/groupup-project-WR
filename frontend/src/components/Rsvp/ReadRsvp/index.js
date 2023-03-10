//imports
import EditModalButtonRSVP from "../UpdateRsvp/EditModalButton";
import UpdateRsvp from "../UpdateRsvp";
import { useEffect, useRef, useState } from "react";

//main
const ReadRsvp = ({ rsvp, user, status }) => {
	let {
		id,
		firstName,
		lastName,
		avatar,
		username,
		Attendances,
		Memberships,
	} = rsvp;

	//---------

	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();
	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;
		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};
		document.addEventListener("click", closeMenu);
		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const closeMenu = () => setShowMenu(false);

	//---------

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

	//----------------------------------------------------------
	if (rsvp) {
		let curr = rsvp.id === user.id;

		//----------------------------------------------------------

		// console.log(` read rsvp >---`, rsvp);

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
					<div className={`about-section ${curr ? "red" : ""}`}>
						{`${curr ? "Your " : ""}Status: ${
							Attendances[0].status[0].toUpperCase() +
							Attendances[0].status.substring(1)
						}`}
					</div>

					{status === "co-host" && (
						<div className="hiddens">
							<EditModalButtonRSVP
								id="update-group-button"
								buttonText="Edit Status"
								onButtonClick={closeMenu}
								modalComponent={<UpdateRsvp rsvp={rsvp} />}
							/>
						</div>
					)}
				</div>
			</div>
		);
	} else return null;
};
//exports
export default ReadRsvp;
