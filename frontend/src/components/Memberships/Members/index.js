// members

//imports
//hooks
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	thunkCreateMembership,
	thunkReadMembers,
	thunkDeleteMembership,
} from "../../../store/members";
import { NavLink, useParams } from "react-router-dom";
// import OpenModalButton from "../../OpenModalButton";
// import * as sessionActions from "../../../store/session";

//comps
import ReadMembers from "../ReadMembers";
import "./Members.css";
import { thunkReadGroupDetails } from "../../../store/groups";
import Loading from "../../Loading";

//main
const Members = () => {
	let dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	let [errors, setErrors] = useState([]);
	const user = useSelector((state) => state.session.user);
	const memberId = useSelector((state) => state.session.user.id);
	let params = useParams();

	let curr = useSelector((state) => state.groups);
	let attd = useSelector((state) => state.rsvps);

	let groupId = curr.groupId;
	if (!groupId && attd && attd.Attendees) {
		console.log(`from attend to members----to groups`, attd.Attendees);

		groupId = attd.Attendees[0].Attendances[0].Event.groupId;
	}
	if (!groupId) {
		groupId = params.groupId;
	}

	// console.log(`from attend to members----to groups`, groupId);

	useEffect(() => {
		let payload = {
			groupId,
		};
		dispatch(thunkReadMembers(payload))
			.then(() => setIsLoaded(true))
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(Object.values(data.errors));
			});
	}, [dispatch, isLoaded]);

	const joinGroupHandler = () => {
		setErrors([]);
		let payload = {
			groupId,
			status: "pending",
		};
		dispatch(thunkCreateMembership(payload))
			.then(() => {
				dispatch(thunkReadMembers(payload));
				dispatch(thunkReadGroupDetails(payload.groupId));
			})
			.then(() => setIsLoaded(true))
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(Object.values(data.errors));
			});
	};

	const deletedMemberHandler = () => {
		setErrors([]);

		let payload = {
			user: { ...user },
			memberId,
			groupId,
		};

		dispatch(thunkDeleteMembership(payload))
			.then(() => dispatch(thunkReadMembers(payload)))
			.then(() => setIsLoaded(true))
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(Object.values(data.errors));
			});
	};

	const selector = useSelector((state) => state.members);
	const members = Object.values(selector);

	const loggedin = members.filter((el) => el.id === user.id);
	let logId;
	if (loggedin.length) logId = loggedin[0].id;

	let organizer = useSelector((state) => state.groups[groupId]);

	if (organizer) {
		organizer = organizer.organizerId;
	}

	// return
	if (isLoaded) {
		return (
			<div id="member-container">
				{Object.values(errors).length > 0 ? (
					<div id="errors-group">
						<ul>
							<div className="errors-h">Errors</div>
							{Object.values(errors).map((error) => (
								<div className="errors-li" key={error}>
									{`- ${error}`}
								</div>
							))}
						</ul>
					</div>
				) : null}

				<div id="member-headers">
					<div className="group-detail-header-members">
						<NavLink
							className="members-page-link"
							to={`/groups/${groupId}/members`}
						>
							<h2 className="curr-link">Members</h2>
						</NavLink>
					</div>
					<div className="group-detail-header-members">
						<NavLink
							className="members-page-link"
							to={`/groups/${groupId}`}
						>
							<h2 id="header-groups-pg">Group</h2>
						</NavLink>
					</div>

					{loggedin.length && organizer !== loggedin[0].id ? (
						<div className="join-group">
							<button
								type="submit"
								className="users-button"
								id="create-group-button"
								onClick={deletedMemberHandler}
							>
								Leave Group
							</button>
						</div>
					) : organizer === logId ? (
						<button
							className="join-group not-button"
							id="create-group-button"
							onClick={() =>
								alert(
									`Current organizer must either: transfer "Organizer" role to another member first, in order to leave group OR may delete the group.`
								)
							}
						>
							Leave Group
						</button>
					) : (
						<div className="join-group">
							<button
								type="submit"
								className="users-button"
								id="create-group-button"
								onClick={joinGroupHandler}
							>
								Join Group
							</button>
						</div>
					)}
				</div>

				<div id="group-detail-container">
					{members.length > 0 ? (
						members.map((member) => {
							if (!member.firstName) {
								return null;
							} else {
								member["organizerId"] = organizer;
								member["logId"] = logId;
								member["groupId"] = groupId;
								return (
									<NavLink
										id="group-detail"
										className="group-detail-first"
										key={member.id}
										to={`/groups/${groupId}/members`}
									>
										<ReadMembers member={member} />
									</NavLink>
								);
							}
						})
					) : (
						<div>No Members to display.</div>
					)}
				</div>
			</div>
		);
	} else return <Loading />;
};

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

//exports
export default Members;

// useEffect(() => {
// 	setErrors([]);
// 	let payload = {
// 		groupId,
// 	};
// 	if (joined) {
// 		console.log(`create membership >>>> `, joined);

// 		dispatch(thunkCreateMembership(payload))
// 			.then((data) => history.push(`/groups/${data.id}/members`))
// 			.catch(async (res) => {
// 				const data = await res.json();

// 				console.log(
// 					`data in return from create membership 000000 `,
// 					data
// 				);

// 				if (data && data.message === "Authentication required")
//
// 				if (data && data.errors)
// 					setErrors(Object.values(data.errors));
// 			});
// 		// if (!errors.length) setShow(2);
// 	} else if (deleted) {
// 		console.log(`delete membership >>>> `, joined);
// 		dispatch(thunkDeleteMembership(payload))
// 			.then((data) => history.push(`/groups/${data.id}`))
// 			.catch(async (res) => {
// 				const data = await res.json();
// 				if (data && data.message === "Authentication required")
// 					setErrors((data[errors] = [data.message]));
// 				if (data && data.errors)
// 					setErrors(Object.values(data.errors));
// 			});
// 		// if (!errors.length) setShow(3);
// 	}
// 	return () => {
// 		setJoined(false);
// 		setDeleted(false);
// 		return;
// 	};
// }, [joined, deleted]);
