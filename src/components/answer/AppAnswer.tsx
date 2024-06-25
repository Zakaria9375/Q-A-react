import { Answer } from "../../types/types";
import BaseDate from "../base/BaseDate";

interface AnswerProps {
	answer: Answer;
}

function AppAnswer(props: AnswerProps) {
	return (
		<>
			<li className=" rounded-lg bg-white p-4 shadow-ninja">
				<p>{props.answer.content}</p>
				<div className="end-flex gap-4">
					<span>created</span>
					<BaseDate theDate={props.answer.created_at} />
				</div>
			</li>
		</>
	);
}

export default AppAnswer;
