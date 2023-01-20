// members

//imports
//hooks
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	thunkCreateMembership,
	thunkReadMembers,
	thunkDeleteMembership,
	actionResetState,
} from "../../../store/members";
import { NavLink, useHistory, useParams } from "react-router-dom";
import OpenModalButton from "../../OpenModalButton";
import * as sessionActions from "../../../store/session";

//comps
import ReadMembers from "../ReadMembers";
import CreateMembership from "../CreateMembership";
import CreateModalButton from "../CreateMembership/CreateModalButton";
import "./Members.css";

//main
const Members = () => {
	let history = useHistory("/groups");
	let dispatch = useDispatch();
	let { groupId } = useParams();
	let [joined, setJoined] = useState(false);
	let [deleted, setDeleted] = useState(false);
	let [errors, setErrors] = useState([]);
	let [show, setShow] = useState(1);

	//-----------------

	const [showMenu, setShowMenu] = useState(false);
	const ulRef = useRef();
	console.log(`useref ----- `, ulRef);

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
	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
		closeMenu();
	};

	//----------------

	useEffect(() => {
		let payload = {
			groupId,
		};

		// .then((data) => {
		// 	console.log(`data in READ MBRs >>>>`, data);
		// 	return history.push(`/groups/${data.id}/members`);
		// })
		dispatch(thunkReadMembers(payload)).catch(async (res) => {
			const data = await res.json();
			if (data && data.message === "Authentication required")
				setErrors((data[errors] = [data.message]));
			if (data && data.errors) setErrors(Object.values(data.errors));
		});
	}, [dispatch]);

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
	// 					setErrors((data[errors] = [data.message]));
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

	const joinGroupHandler = () => {
		setErrors([]);
		let payload = {
			groupId,
			status: "pending",
		};
		// .then((data) => {
		// 	console.log(`data in thunk create`, data);
		// 	return history.push(`/groups/${data.groupId}/members`);
		// });
		dispatch(thunkCreateMembership(payload)).catch(async (res) => {
			console.log(`res`, res);
			const data = await res.json();
			if (data && data.message === "Authentication required")
				setErrors((data[errors] = [data.message]));
			if (data && data.errors) setErrors(Object.values(data.errors));
		});
		dispatch(actionResetState());
		dispatch(thunkReadMembers(payload)).catch(async (res) => {
			const data = await res.json();
			if (data && data.message === "Authentication required")
				setErrors((data[errors] = [data.message]));
			if (data && data.errors) setErrors(Object.values(data.errors));
		});
		history.push(`/groups/${groupId}/members`);
	};

	const deletedMemberHandler = () => {
		setErrors([]);
		let payload = {
			groupId,
		};

		dispatch(thunkDeleteMembership(payload)).catch(async (res) => {
			const data = await res.json();
			if (data && data.message === "Authentication required")
				setErrors((data[errors] = [data.message]));
			if (data && data.errors) setErrors(Object.values(data.errors));
		});
		// if (!errors.length) setShow(3);

		dispatch(actionResetState());
		dispatch(thunkReadMembers(payload)).catch(async (res) => {
			const data = await res.json();
			if (data && data.message === "Authentication required")
				setErrors((data[errors] = [data.message]));
			if (data && data.errors) setErrors(Object.values(data.errors));
		});
		history.push(`/groups/${groupId}/members`);
	};

	const selector = useSelector((state) => state.members);
	if (!selector)
		return <div className="groups-null">No Members to display...</div>;
	const members = Object.values(selector);

	console.log(`members comp members list ====`, members);

	// return
	return (
		<div id="groups-container">
			<div id="member-headers">
				<div className="group-detail-header-members">
					<NavLink
						className="members-page-link"
						to={`/groups/${groupId}`}
					>
						<h2 id="header-groups-pg">Group</h2>
					</NavLink>
				</div>
				<div className="group-detail-header-members">
					<NavLink
						className="members-page-link"
						to={`/groups/${groupId}/members`}
					>
						<h2>Members</h2>
					</NavLink>
				</div>
				{show == 2 ? null : (
					<div className="join-group">
						<button
							type="submit"
							className="selected"
							// className="create-group-button"
							onClick={joinGroupHandler}
						>
							Join Group
						</button>
					</div>
				)}
				{show == 3 ? null : (
					<div className="join-group">
						<button
							type="submit"
							className="selected"
							onClick={deletedMemberHandler}
						>
							Leave Group
						</button>
					</div>
				)}
			</div>

			{Object.values(errors).length > 0 ? (
				<div id="errors-create-group">
					<ul>
						<div className="errors-h">Errors</div>
						{Object.values(errors).map((error) => (
							<li className="errors-li" key={error}>
								{error}
							</li>
						))}
					</ul>
				</div>
			) : null}

			<div id="group-detail-container">
				{members.length > 0 ? (
					members.map((member) => {
						if (!member.firstName) {
							return null;
						} else {
							if (member.id) {
							}
							return (
								<NavLink
									id="group-detail"
									key={member.id}
									to={`/groups/${groupId}/members`}
								>
									<ReadMembers member={member} />
								</NavLink>
							);
						}
					})
				) : (
					<div>No Groups to display.</div>
				)}
			</div>
			{/* <div id="groups-link-container">
				<CreateModalButton
					className="create-group-button"
					buttonText="Join Group"
					onButtonClick={closeMenu}
					modalComponent={<CreateMembership />}
				/>
			</div> */}
		</div>
	);

	// return <div>Members Page</div>;
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
