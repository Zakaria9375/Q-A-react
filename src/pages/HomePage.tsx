import { Link } from "react-router-dom";
import QuestionList from "../components/question/QuestionList";

function HomePage() {
	const baseUrl = "http://localhost:8050/api";
	const homeUrl = `${baseUrl}/questions`;
	return (
		<>
			<h1 className="text-center">Welcome</h1>
			<div className="end-flex my-6">
				<Link to="/add-question" className="btn">
					Add New Question
				</Link>
			</div>
			<QuestionList url={homeUrl} />
		</>
	);
}

export default HomePage;
