import axios from "axios";
import { baseUrl } from "../../types/types";
import AnswerEditor from "./AnswerEditor";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/reducers";

type Fields = { answer: string };
interface AddAnswerProps {
	questionId: number;
	emitRefetch: () => void;
}

function AddAnswer({ questionId, emitRefetch }: AddAnswerProps) {
	const { isAuthenticated, user } = useSelector(
		(state: RootState) => state.auth
	);
	const onDataReceive = async (data: Fields) => {
		try {
			const theSendingData = {
				content: data.answer,
				user: isAuthenticated ? `${baseUrl}/users/${user?.id}` : null,
				question: `${baseUrl}/questions/${questionId}`,
			};
			await axios.post(`${baseUrl}/answers`, theSendingData);
			emitRefetch();
		} catch (error) {
			console.error("❌Error adding answer ➕: ", error);
		}
	};

	return (
		<>
			<AnswerEditor btnName="Add Answer" emitAnswer={onDataReceive} />
		</>
	);
}

export default AddAnswer;
