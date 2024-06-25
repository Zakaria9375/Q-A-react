import { useEffect, useState } from "react";
import { Question } from "../../types/types";
import AppQuestion from "./AppQuestion";
import axios from "axios";
import DataLoader from "../base/DataLoader";

interface ListProps {
	url: string;
}

function QuestionList(props: ListProps) {
	const [isFetching, setIsFetching] = useState<boolean>(false);
	const [fetchedQuestions, setQuestions] = useState<Question[]>([]);
	const [httpError, setHttpError] = useState<string | null>(null);
	useEffect(() => {
		async function fetchQuestions() {
			try {
				setIsFetching(true);

				const response = await axios.get(props.url);
				const responseData = response.data._embedded.questions;
				const loadedQuestions: Question[] = [];

				for (const key in responseData) {
					loadedQuestions.push({
						id: responseData[key].id,
						title: responseData[key].title,
						description: responseData[key].description,
						createdAt: responseData[key].createdAt,
						updatedAt: responseData[key].updatedAt,
					});
				}
				setQuestions(loadedQuestions);
			} catch (error: any) {
				setHttpError(error.message || "Could not fetch data");
			} finally {
				setIsFetching(false);
			}
		}
		if (props.url) {
			fetchQuestions();
		}
	}, [props.url]);

	return (
		<>
			<DataLoader isLoading={isFetching} error={httpError}>
				{fetchedQuestions.length && props.url ? (
					<ul className="mt-6">
						{fetchedQuestions.map((question) => (
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
