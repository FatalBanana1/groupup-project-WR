//read group detail

//imports
//hooks

//comps
import "./ReadGroupDetail.css";

//main
const ReadGroupDetail = (group) => {
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
			<div id="detail-left">{previewImage ? previewImage : "N/A"}</div>
			<div id="detail-right">
				<div>{name}</div>
				<div>{`${city}, ${state}`}</div>
				<div>{about}</div>
				<div>{`${numMembers}, ${type}`}</div>
			</div>
		</div>
	);
};

//exports
export default ReadGroupDetail;

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
