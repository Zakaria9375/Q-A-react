import { Answer, baseUrl } from "../../types/types";
import AppAnswer from "./AppAnswer";
import DataLoader from "../base/DataLoader";
import useFetchData from "../hooks/useFetchData";
import AddAnswer from "./AddAnswer";
interface AnswersListProps {
	questionId: number;
}
function AnswersList(props: AnswersListProps) {
	const answersUrl = `${baseUrl}/answers/search/findAllByQuestionId?questionId=${props.questionId}&sort=createdAt,desc`;

	const { data, isLoading, error, fetchData } = useFetchData<{
		_embedded: { answers: Answer[] };
	}>(answersUrl);
	function getNumberOfAnswers(): string {
		const answers = data?._embedded.answers;
		const word = answers && answers.length > 1 ? "Answers" : "Answer";
		return `${answers?.length} ${word}`;
	}

	return (
		<>
			<AddAnswer questionId={props.questionId} emitData={fetchData} />
			<DataLoader isLoading={isLoading} error={error}>
				{data?._embedded.answers.length ? (
					<div className="my-4 space-y-4">
						<p className="px-6 text-xl">{getNumberOfAnswers()}</p>
						<ul className="space-y-4">
							{data._embedded.answers.map((answer) => (
								<AppAnswer key={answer.id} answer={answer} />
							))}
						</ul>
					</div>
				) : (
					<p>No Answers yet</p>
				)}
			</DataLoader>
		</>
	);
}

export default AnswersList;
