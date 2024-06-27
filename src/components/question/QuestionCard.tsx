import { NavLink } from "react-router-dom";
import { Question } from "../../types/types";
import BaseDate from "../base/BaseDate";
import UserDetail from "../user/UserDetail";

interface QuestionCardProps {
	question: Question;
}

function QuestionCard({ question }: QuestionCardProps) {
	return (
		<>
			<li className="my-8">
				<NavLink to={`/question/${question.id}`}>
					<article className="question-card">
						<div className="border border-cyan-600 bg-slate-200 hover:bg-slate-300 rounded-xl p-3">
							<h1 className="heading-1">{question.title}</h1>
							<h2 className="mt-2">{question.description}</h2>
							<div className="flex flex-col md:flex-row justify-between pt-4 md:pt-0  md:items-center">
								<div className="flex  items-center">
									<div>By</div>
									<UserDetail userId={question.userId} />
								</div>
								<BaseDate theDate={question.createdAt} />
							</div>
						</div>
					</article>
				</NavLink>
			</li>
		</>
	);
}
export default QuestionCard;
