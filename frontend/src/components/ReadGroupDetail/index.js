//read group detail

//imports

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
	return <div>{name}</div>;
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
