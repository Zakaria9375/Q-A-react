import { Answer, baseUrl } from "../../types/types";
import AppAnswer from "./AppAnswer";
import DataLoader from "../base/DataLoader";
import useFetchData from "../../hooks/useFetchData";
import AddAnswer from "./AddAnswer";
import Pagination from "../base/Pagination";
import useUrlCustomizer from "../../hooks/useUrlCustomizer";
interface AnswersListProps {
	questionId: number;
}
function AnswersList({ questionId }: AnswersListProps) {
	const url = `${baseUrl}/answers/search/findAllByQuestionId`;

	const {
		currentPage,
		setCurrentPage,
		customizeUrl: answersUrl,
	} = useUrlCustomizer({
		baseUrl: url,
		questionId: questionId,
	});
	const { data, isLoading, error, fetchData, moreInfo } = useFetchData<{
		_embedded: { answers: Answer[] };
	}>(answersUrl);
	function getNumberOfAnswers(): string {
		if (moreInfo) {
			const word = moreInfo?.totalElements > 1 ? "Answers" : "Answer";
			return `${moreInfo?.totalElements} ${word}`;
		}
		return "No answers yet";
	}

	return (
		<>
			<AddAnswer questionId={questionId} emitRefetch={fetchData} />
			<DataLoader isLoading={isLoading} error={error}>
				{data?._embedded.answers.length ? (
					<div className="my-4">
						<p className="px-6 text-xl text-right">{getNumberOfAnswers()}</p>
						<ul className="space-y-5">
							{data?._embedded.answers.map((answer) => (
								<AppAnswer
									key={answer.id}
									answer={answer}
									emitRefetch={fetchData}
								/>
							))}
						</ul>
					</div>
				) : (
					<p>No Answers yet</p>
				)}
			</DataLoader>
			{moreInfo && moreInfo.totalPages > 1 && (
				<Pagination
					totalPages={moreInfo?.totalPages}
					currentPage={currentPage}
					onPageChange={(page) => setCurrentPage(page)}
				/>
			)}
		</>
	);
}

export default AnswersList;
