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
		privates,
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
					"N/A"
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
