import axios from "axios";
import { baseUrl } from "../../types/types";

interface DeleteAnswerProps {
	emitData: () => void;
	id: number;
}

function DeleteAnswer(props: DeleteAnswerProps) {
	async function deleteAnswer() {
		try {
			const answerUrl = `${baseUrl}/answers/${props.id}`;
			await axios.delete(answerUrl);
			props.emitData();
		} catch (error) {
			console.error("❌Error deleting answer ✖️: ", error);
		}
	}
	return (
		<>
			<h2>Do you want to delete this answer</h2>
			<div className="end-flex gap-4 mb-2">
				<button onClick={props.emitData} className="mdl-btn gh-btn">
					cancel
				</button>
				<button
					onClick={deleteAnswer}
					className="mdl-btn bg-red-600 hover:bg-red-500 text-white"
				>
					confirm
				</button>
			</div>
		</>
	);
}

export default DeleteAnswer;
