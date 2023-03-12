import { useHistory } from "react-router-dom";
import "./Loading.css";

const Loading = () => {
	let history = useHistory("/");

	setTimeout(() => {
		history.push("/notfound");
	}, 6000);

	//return
	return (
		<div className="loading-container">
			<div className="circle"></div>
		</div>
	);
};

export default Loading;
