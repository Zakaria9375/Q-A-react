import { Question } from "../../types/types";
import BaseDate from "../base/BaseDate";
import UserDetail from "../user/UserDetail";

interface AppQuestionProps {
	question: Question;
}

function AppQuestion({ question }: AppQuestionProps) {
	return (
		<>
			<article className="question-item">
				<UserDetail userId={question.userId} />
				<div className="border border-cyan-600 bg-slate-200 rounded-xl p-3">
					<h2 className="heading-1">{question.title}</h2>
					<h3 className="mt-2">{question.description}</h3>
					<div className="end-flex">
						<BaseDate theDate={question.createdAt} />
					</div>
				</div>
			</article>
		</>
	);
}

export default AppQuestion;
