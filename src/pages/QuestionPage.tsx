import { useParams } from "react-router-dom";
import { baseUrl, Question } from "../types/types";
import BaseDate from "../components/base/BaseDate";
import AnswersList from "../components/answer/AnswersList";
import DataLoader from "../components/base/DataLoader";
import useFetchData from "../components/hooks/useFetchData";

function QuestionPage() {
	const params = useParams();
	const questionUrl = params.id ? `${baseUrl}/questions/${params.id}` : null;

	const { data, isLoading, error } = useFetchData<Question>(questionUrl);
	return (
		<>
			<DataLoader isLoading={isLoading} error={error}>
				{data && params.id ? (
					<div className="space-y-4">
						<section className="border border-cyan-600 bg-slate-200 rounded-xl p-3">
							<h1 className="heading-1">{data.title}</h1>
							<h2 className="mt-2">{data.description}</h2>
							<div className="end-flex">
								<BaseDate theDate={data.createdAt} />
							</div>
						</section>

						<AnswersList questionId={data.id} />
					</div>
				) : (
					<p>No question was found</p>
				)}
			</DataLoader>
		</>
	);
}

export default QuestionPage;
