import { NavLink } from "react-router-dom";
import { Question } from "../../types/types";

interface AppQuestionProps {
	item: Question;
}

function AppQuestion(props: AppQuestionProps) {
	return (
		<>
			<li className="my-4">
				<NavLink to={`/question/${props.item.id}`}>{props.item.title}</NavLink>
			</li>
		</>
	);
}

export default AppQuestion;
