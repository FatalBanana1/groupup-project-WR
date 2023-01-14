//groups page

//imports
//hooks
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkReadGroups } from "../../store/groups";
//comps
import ReadGroupDetail from "../ReadGroupDetail";
import "./Groups.css";

//main
const Groups = () => {
	let dispatch = useDispatch();

	useEffect(() => {
		dispatch(thunkReadGroups());
	}, [dispatch]);

	// {groups: {1:{1}, 2:{2}...} }
	const selector = useSelector((state) => state.groups);
	const groups = Object.values(selector);
	// console.log(`-----groups--------`, groups);

	//return
	return (
		<div id="groups-container">
			<h1>Groups</h1>
			<div id="group-detail-container">
				{groups.map((group) => (
					<div key={group.id}>
						<ReadGroupDetail group={group} />
					</div>
				))}
				{/* {groups} */}
			</div>
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
