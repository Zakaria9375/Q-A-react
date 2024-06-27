import axios from "axios";
import { Answer, baseUrl } from "../../types/types";
import AnswerEditor from "./AnswerEditor";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/store";

type Fields = { answer: string };
interface EditAnswerProps {
	emitData: () => void;
	answer: Answer;
}

function EditAnswer(props: EditAnswerProps) {
	const { isAuthenticated, user } = useSelector(
		(state: RootState) => state.auth
	);
	const onDataReceive = async (data: Fields) => {
		try {
			const theSendingData = {
				content: data.answer,
				question: `${baseUrl}/questions/${props.answer.questionId}`,
				createdAt: props.answer.createdAt,
				user: `${baseUrl}/users/${user?.id}`,
			};
			await axios.put(`${baseUrl}/answers/${props.answer.id}`, theSendingData);
			props.emitData();
		} catch (error) {
			console.error("❌Error Editing answer ✏️: ", error);
		}
	};
	return (
		<>
			{isAuthenticated && (
				<AnswerEditor
					btnName="Edit Answer"
					emitAnswer={onDataReceive}
					content={props.answer.content}
				/>
			)}
		</>
	);
}
export default EditAnswer;
