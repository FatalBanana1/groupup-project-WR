import { NavLink } from "react-router-dom";
import "./NotFoundPage.css";
import banana from "./banana.png";

export default function NotFoundPage() {
	return (
		<div className="notfound-container">
			<img className="homebanana" src={banana} alt="sad banana"></img>
			404 Error: These are'nt the droids you're looking for!
			<NavLink className="underline" to={`/`}>
				Go Back to Home
			</NavLink>
		</div>
	);
}
