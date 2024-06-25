import { useParams } from "react-router-dom";
import { Question } from "../types/types";
import AddAnswer from "../components/answer/AddAnswer";
import BaseDate from "../components/base/BaseDate";
import AnswersList from "../components/answer/AnswersList";
import { useEffect, useState } from "react";
import axios from "axios";
import DataLoader from "../components/base/DataLoader";

function QuestionPage() {
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [fetchedQuestion, setQuestion] = useState<Question>();
	const [httpError, setHttpError] = useState<string | null>(null);
	const params = useParams();
	useEffect(() => {
		async function fetchQuestion() {
			if (params.id) {
				try {
					setIsFetching(true);
					const baseUrl = "http://localhost:8050/api";
					const questionUrl = `${baseUrl}/questions/${params.id}`;
					const response = await axios.get(questionUrl);
					const responseData = response.data;

					const loadedQuestion: Question = {
						id: parseInt(params.id),
						title: responseData.title,
						description: responseData.description,
						createdAt: responseData.createdAt,
						updatedAt: responseData.updatedAt,
					};

					setQuestion(loadedQuestion);
				} catch (error: any) {
					setHttpError(error.message || "Could not fetch data");
				} finally {
					setIsFetching(false);
				}
			}
		}
		fetchQuestion();
	}, [params.id]);

	return (
		<>
			<DataLoader isLoading={isFetching} error={httpError}>
				{fetchedQuestion && params.id ? (
					<div className="space-y-4">
						<section className="border border-cyan-600 bg-slate-200 rounded-xl p-3">
							<h1 className="heading-1">{fetchedQuestion.title}</h1>
							<h2 className="mt-2">{fetchedQuestion.description}</h2>
							<div className="end-flex">
								<BaseDate theDate={fetchedQuestion.createdAt} />
							</div>
						</section>
						<AddAnswer />
						<AnswersList questionId={fetchedQuestion.id} />
					</div>
				) : (
					<p>No question was found</p>
				)}
			</DataLoader>
		</>
	);
}

export default QuestionPage;
