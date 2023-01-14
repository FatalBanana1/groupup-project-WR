//home js

//imports
import Groups from "../Groups";
import { Redirect, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";

//main
const Splash = () => {
	//states

	//handler

	//return
	return (
		<div>
			Splash Page Rendered
			<div className="splash-body">
				WHEN IS A PLAINTIFF ENTITLED TO RECOVER? A. A plaintiff who was
				injured as as result of some negligent conduct on the part of a
				defendant is entitled to recover compensation for such injury
				from that defendant.A plaintiff is entitled to a verdict if jury
				finds1. That a defendant was negligent, and2. That such
				negligence was a cause of injury to the plaintiff. Q. WHAT IS
				NEGLIGENCE? Negligence is the doing of something which a
				reasonably prudent person would not do, or the failure to do
				something
			</div>
			<NavLink to="/groups">Groups</NavLink>
		</div>
	);
};

//exports
export default Splash;
