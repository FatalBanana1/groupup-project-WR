//groups page

//imports
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkReadGroups } from "../../store/groups";

//main
const Groups = () => {
	let dispatch = useDispatch();

	useEffect(() => {
		dispatch(thunkReadGroups());
	}, [dispatch]);

	// {books: {{1},{2}...} }
	const selector = useSelector((state) => state.groups);
	const groups = Object.values(selector);
	console.log(`-----groups--------`, groups);
	//return
	return (
		<div>
			<div>Groups Page</div>
			<ul>
				{groups.map(
					({
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
					}) => (
						<li key={id}>{`organizer = ${organizerId}`}</li>
					)
				)}
				{/* {groups} */}
			</ul>
		</div>
	);
};

// ,name,about,type,private,city,state,numMembers,previewImage

// {
// 	id
// 	organizerId,
// 	name,
// 	about,
// 	type,
// 	private,
// 	city,
// 	state
// 	numMembers
// 	previewImage
// }

//exports
export default Groups;
