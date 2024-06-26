import { Answer } from "../../types/types";
import BaseDate from "../base/BaseDate";

interface AnswerProps {
	answer: Answer;
}

function AppAnswer(props: AnswerProps) {
	async function editAnswer() {}
	async function deleteAnswer() {}
	return (
		<>
			<li className=" rounded-lg bg-white p-4 shadow-ninja">
				<div className="flex justify-between">
					<BaseDate theDate={props.answer.createdAt} />
					<div className="flex gap-2">
						<button
							className="sm-btn"
							aria-label="Edit Answer"
							onClick={editAnswer}
						>
							<i className="fa-solid fa-pen size-4"></i>
						</button>
						<button
							className="sm-btn"
							aria-label="Delete Answer"
							onClick={deleteAnswer}
						>
							<i className="fa-solid fa-trash-can size-4"></i>
						</button>
					</div>
				</div>

				<p>{props.answer.content}</p>
			</li>
		</>
	);
}

export default AppAnswer;
