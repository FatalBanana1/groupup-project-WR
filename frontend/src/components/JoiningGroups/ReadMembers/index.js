//read member detail

//imports
//hooks

//comps
import { NavLink } from "react-router-dom";
import GroupDetail from "../../GroupDetail";
import "./ReadMembers.css";

//main
const ReadMembers = ({ member }) => {
	let { id, firstName, lastName, username, email, status } = member;
	let previewImage = false;

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
						id="no-groups-img-mbrs"
					/>
				)}
			</div>

			<div id="detail-right">
				<h3 id="detail-right-name">
					{firstName} {lastName}
				</h3>
				<div className="about-section">{`Username: ${username}`}</div>
				<div className="about-section">{`Email: ${email}`}</div>
				<div className="about-section">{`Status: ${
					status[0].toUpperCase() + status.substring(1)
				}`}</div>
			</div>
		</div>
	);
};

//exports
export default ReadMembers;

//structure
// {id,firstName,lastName,username,email,status}
/*
{
	"Members": [
			{
					"id": 1,
					"firstName": "Walter",
					"lastName": "White",
					"username": "heisenberg",
					"email": "h20@gmail.com",
					"status": "organizer"
			},
		]
	}
*/
