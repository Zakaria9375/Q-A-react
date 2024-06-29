import { Link } from "react-router-dom";
import QuestionList from "../components/question/QuestionList";
import { baseUrl } from "../types/types";
import Modal from "../components/base/Modal";

function HomePage() {
	const questionsUrl = `${baseUrl}/questions`;
	return (
		<>
			<h1 className="heading-top">
				Join the Community: Ask Questions, Share Knowledge, and Find Solutions
			</h1>
			<div className="end-flex my-6">
				<Link to="/add-question" className="btn">
					Add New Question
				</Link>
			</div>
			<QuestionList url={questionsUrl} />
			<Modal show={true} onClose={() => console.log("close")}>
				<h2>Hello</h2>
				<h3>hi</h3>
			</Modal>
		</>
	);
}

export default HomePage;
