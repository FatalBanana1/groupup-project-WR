//read group detail

//imports
//hooks

//comps
import { NavLink } from "react-router-dom";
import GroupDetail from "../../GroupDetail";
import "./ReadGroups.css";

//main
const ReadGroups = (group) => {
	let {
		id,
		organizerId,
		name,
		about,
		type,
		private: privated,
		city,
		state,
		numMembers,
		previewImage,
	} = group.group;

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
				<h3 id="detail-right-name">{name}</h3>
				<div>{`${city}, ${state}`}</div>
				<div className="about-section">{about}</div>
				<div className="li-tag-members-line">
					{`${numMembers} members`}
					<li className="li-tags" />
					{`${type}`}
				</div>
			</div>
		</div>
	);
};

//exports
export default ReadGroups;

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
