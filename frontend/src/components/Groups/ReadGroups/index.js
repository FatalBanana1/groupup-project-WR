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
	console.log(group);

	//return
	return (
		// <NavLink
		// 	id="group-detail"
		// 	key={group.group.id}
		// 	to={`/groups/${group.group.id}`}
		// >
			<div id="detail-container">
				<div id="detail-left">
					{previewImage ? previewImage : "N/A"}
				</div>
				<div id="detail-right">
					<h3>{name}</h3>
					<div>{`${city}, ${state}`}</div>
					<div>{about}</div>
					<div>{`${numMembers}, ${type}`}</div>
				</div>
			</div>
			// {/* <GroupDetail group={group} /> */}
		// </NavLink>
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
