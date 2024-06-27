import { Question } from "../../types/types";
import DataLoader from "../base/DataLoader";
import useFetchData from "../../hooks/useFetchData";
import QuestionCard from "./QuestionCard";
import Pagination from "../base/Pagination";
import useUrlCustomizer from "../../hooks/useUrlCustomizer";

interface ListProps {
	url: string;
	searchTerm?: string;
}

function QuestionList({ url, searchTerm }: ListProps) {
	const {
		currentPage,
		setCurrentPage,
		customizeUrl: questionsUrl,
	} = useUrlCustomizer({
		baseUrl: url,
		searchTerm: searchTerm,
	});
	const { data, isLoading, error, moreInfo } = useFetchData<{
		_embedded: { questions: Question[] };
	}>(questionsUrl);
	return (
		<>
			{data?._embedded.questions.length && (
				<h2 className="text-right">{`${data?._embedded.questions.length} questions`}</h2>
			)}
			<DataLoader isLoading={isLoading} error={error}>
				{data?._embedded.questions.length && url ? (
					<ul className="mt-6">
						{data._embedded.questions.map((question) => (
							<QuestionCard key={question.id} question={question} />
						))}
					</ul>
				) : (
					<p>No results found</p>
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

export default QuestionList;
