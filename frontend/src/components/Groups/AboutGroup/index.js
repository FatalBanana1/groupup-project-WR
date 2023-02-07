//imports
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import "./AboutGroup.css";

//main
const AboutGroup = (props) => {
	const {
		id,
		organizerId,
		name,
		about,
		type,
		private: privated,
		city,
		state,
		createdAt,
		updatedAt,
		GroupImages: groupImages,
		Organizer: organizer,
		Venues: venues,
		numMembers,
		Members,
	} = props.group;

	let [isLoaded, setIsLoaded] = useState(false);
	let dispatch = useDispatch();
	let { groupId } = useParams();

	// useEffect(() => {}, [dispatch]);

	// console.log(`props . group ====`, Members);

	//dates
	let date = new Date(createdAt).toString().split(" ");
	let month = date[1];
	let day = date[2];
	let year = date[3];

	return (
		<>
			<div id="about-section-container">
				<div id="about-section-container-left">
					<h2 className="about-title-font">What we're about</h2>
					<div className="about-details-font">{about}</div>

					<div id="group-detail-images">
						<h2 className="about-title-font">
							{`Photos (${
								groupImages.length > 0 ? groupImages.length : 0
							})`}
						</h2>
						<div className="about-details-font">
							{groupImages.length >= 1 ? (
								groupImages.map((image) => (
									<img
										className="read-group-images"
										key={image.id}
										src={image.url}
										alt={`Group Image`}
									/>
								))
							) : (
								<div>No Group Images...</div>
							)}
						</div>
					</div>
				</div>

				<div id="about-section-container-right">
					<div className="groups-sticky">
						<div
							className="events-side-panel groups-sticky-container"
							id="gray-back"
						>
							<div className="small-padding-bottom sticky-text-headers">
								Organizer
							</div>

							<div className="groups-sticky-org-name">
								<NavLink
									to={`/groups/${id}/members`}
									className="event-venue-details-info"
								>
									{organizer.avatar ? (
										<img
											className="events-small-avatar-icon"
											src={organizer.avatar}
										/>
									) : (
										<img
											src="https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns="
											className="events-small-avatar-icon"
										/>
									)}
								</NavLink>
								<NavLink
									to={`/groups/${id}/members`}
									className="event-venue-details-info small-padding-left"
								>
									{`${organizer.firstName} ${organizer.lastName}`}
								</NavLink>
							</div>
						</div>

						<div className="events-side-panel" id="gray-back">
							<div className="icons-container space-around">
								<div className="sticky-text-headers">{`Members (${Members.length})`}</div>
								<NavLink
									to={`/groups/${id}/members`}
									className="clicker"
									id="see-all"
								>
									See all
								</NavLink>
							</div>

							<div className="event-details-info-container icons-container space-around">
								{Members.slice(0, 4).map((el) => (
									<NavLink
										key={el.id}
										to={`/groups/${id}/members`}
										className="group-member-icons"
									>
										{el.avatar ? (
											<img
												src={el.avatar}
												className="events-small-avatar-icon"
												alt="members pics"
											/>
										) : (
											<img
												src="https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns="
												className="events-small-avatar-icon"
												alt="members pics"
											/>
										)}
									</NavLink>
								))}
							</div>

							{Members.length > 4 ? (
								<div className="icons-container">
									{Members.slice(4, 8).map((el) => (
										<NavLink
											key={el.id}
											to={`/groups/${id}/members`}
											className="group-member-icons"
										>
											{el.avatar ? (
												<img
													src={el.avatar}
													className="events-small-avatar-icon"
													alt="members pics"
												/>
											) : (
												<img
													src="https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns="
													className="events-small-avatar-icon"
													alt="members pics"
												/>
											)}
										</NavLink>
									))}
								</div>
							) : null}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AboutGroup;
