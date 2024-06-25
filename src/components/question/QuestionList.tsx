import { Question } from "../../types/types";
import AppQuestion from "./AppQuestion";
import DataLoader from "../base/DataLoader";
import useFetchData from "../hooks/useFetchData";

interface ListProps {
	url: string;
}

function QuestionList(props: ListProps) {
	const { data, isLoading, error } = useFetchData<{
		_embedded: { questions: Question[] };
	}>(props.url);
	return (
		<>
			<DataLoader isLoading={isLoading} error={error}>
				{data?._embedded.questions.length && props.url ? (
					<ul className="mt-6">
						{data._embedded.questions.map((question) => (
							<AppQuestion key={question.id} item={question} />
						))}
					</ul>
				) : (
					<p>No results found</p>
				)}
			</DataLoader>
		</>
	);
}

export default QuestionList;
