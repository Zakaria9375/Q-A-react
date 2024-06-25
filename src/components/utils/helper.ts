import { Question } from "../../types/types";

const apiBaseUrl = "http://localhost:8050/api";

export async function FetchQuestionBySearch(props) {
			try {
				const url: string = `${apiBaseUrl}/questions/search/findByTitleContaining?title=${props.url}`;

				const response = await fetch(url);

				if (!response.ok) {
					throw new ErrorEvent("Something went wrong");
				}
				const responseJson = await response.json();
				const responseData = responseJson._embedded.questions;
				const loadedQuestions: Question[] = [];

				for (const key in responseData) {
					loadedQuestions.push({
						id: responseData[key].id,
						title: responseData[key].title,
						description: responseData[key].description,
						created_at: responseData[key].created_at,
						updated_at: responseData[key].updated_at,
					});
				}
				return loadedQuestions;
			} catch (error) {
				console.log("Fetch error:", error);
				setHttpError({ message: error.message || "Could not fetch data" });
			} finally {
				setIsFetching(false);
			}
		}
		if (props.url) {
			fetchQuestions();
		}
	}, [props.url]);
	if (httpError) {
		return <AppError message={httpError.message} />;
	}
	return (
		<>
			<section className="mt-6">
				{isFetching ? (
					<AppSpinner />
				) : fetchedQuestions.length ? (
					<QuestionList questions={fetchedQuestions} />
				) : (
					<p>No results found</p>
				)}
			</section>
		</>
	);
}

export default QuestionFetcher;
