import { useEffect, useState } from "react";
import { Answer } from "../../types/types";
import AppAnswer from "./AppAnswer";
import axios from "axios";
import DataLoader from "../base/DataLoader";
interface AnswersListProps {
	questionId: number;
}
function AnswersList(props: AnswersListProps) {
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [fetchedAnswers, setAnswers] = useState<Answer[]>([]);
	const [httpError, setHttpError] = useState<string | null>(null);
	useEffect(() => {
		async function fetchAnswers() {
			try {
				setIsFetching(true);
				const baseUrl = "http://localhost:8050/api";
				const answersUrl = `${baseUrl}/answers/search/findAllByQuestionId?questionId=${props.questionId}`;
				const response = await axios.get(answersUrl);
				const responseData = response.data._embedded.answers;
				const loadedAnswers: Answer[] = [];

				for (const key in responseData) {
					loadedAnswers.push({
						id: responseData[key].id,
						content: responseData[key].content,
						createdAt: responseData[key].createdAt,
						updatedAt: responseData[key].updatedAt,
						questionId: props.questionId,
					});
				}
				setAnswers(loadedAnswers);
			} catch (error: any) {
				setHttpError(error.message || "Could not fetch data");
			} finally {
				setIsFetching(false);
			}
		}
		if (props.questionId) {
			fetchAnswers();
		}
	}, [props.questionId]);

	function getNumberOfAnswers(): string {
		const word = fetchedAnswers.length > 1 ? "Answers" : "Answer";
		return `${fetchedAnswers.length} ${word}`;
	}

	return (
		<>
			<DataLoader isLoading={isFetching} error={httpError}>
				{fetchedAnswers.length ? (
					<div className="my-4">
						<div className="end-flex">
							<span>{getNumberOfAnswers()}</span>
						</div>
						<ul className="space-y-4">
							{fetchedAnswers.map((answer) => (
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
