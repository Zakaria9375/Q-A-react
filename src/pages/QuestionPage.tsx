import { useParams } from "react-router-dom";
import { baseUrl, Question } from "../types/types";
import AnswersList from "../components/answer/AnswersList";
import DataLoader from "../components/base/DataLoader";
import useFetchData from "../hooks/useFetchData";
import AppQuestion from "../components/question/AppQuestion";

function QuestionPage() {
	const params = useParams();
	const questionUrl = params.id ? `${baseUrl}/questions/${params.id}` : null;

	const { data, isLoading, error } = useFetchData<Question>(questionUrl);
	return (
		<>
			<DataLoader isLoading={isLoading} error={error}>
				{data && params.id ? (
					<div className="space-y-4">
						<AppQuestion question={data} />
						<AnswersList
							questionId={data.id}
							answers={data._embedded.answers}
						/>
					</div>
				) : (
					<p>No question was found</p>
				)}
			</DataLoader>
		</>
	);
}

export default QuestionPage;
