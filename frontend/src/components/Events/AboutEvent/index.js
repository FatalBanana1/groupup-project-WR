const AboutEvent = ({ group }) => {
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
	} = group;

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
								groupImages.length > 1
									? groupImages.length - 1
									: 0
							})`}
						</h2>
						<div className="about-details-font">
							{groupImages.length > 1 ? (
								groupImages.map((image) =>
									image.preview ? null : (
										<img
											className="read-group-images"
											key={image.id}
											src={image.url}
											alt={`Group Image for: "${image.url}"`}
										/>
									)
								)
							) : (
								<div>No Group Images...</div>
							)}
						</div>
					</div>
				</div>

				<div id="about-section-container-right">
					<div id="organizer-details-container">
						<h2 id="organizer-details" className="about-title-font">
							Organizer
						</h2>
					</div>
					<div className="about-details-font">{`${organizer.firstName} ${organizer.lastName}`}</div>
					<div className="about-details-font">{`Type: ${type}`}</div>
					<div className="about-details-font">{`Est: ${month} ${day}, ${year}`}</div>
				</div>
			</div>
		</>
	);
};

export default AboutEvent;
