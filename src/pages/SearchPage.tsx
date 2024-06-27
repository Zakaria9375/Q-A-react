import { useState } from "react";
import QuestionList from "../components/question/QuestionList";
import { baseUrl } from "../types/types";

function SearchPage() {
	const validSearchRegex = /^[a-zA-Z\s]*$/;
	const [searchTerm, setSearchTerm] = useState<string>("");
	const [isValid, setIsValid] = useState<boolean>(true);

	const searchUrl = `${baseUrl}/questions/search/findByTitleContaining`;

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		if (validSearchRegex.test(value) || value === "") {
			setSearchTerm(value);
			setIsValid(true);
		} else {
			setIsValid(false);
		}
	};
	return (
		<>
			<input
				type="text"
				placeholder="Search for question"
				value={searchTerm}
				onChange={handleSearchChange}
				aria-label="Search for a question"
				className={isValid ? "" : "invalid-input"}
			/>
			{!isValid && <p className="error">Please type valid characters</p>}
			{searchTerm ? (
				<>
					<h1 className="heading-top">Results</h1>
					<div aria-live="polite">
						<QuestionList url={searchUrl} searchTerm={searchTerm} />
					</div>
				</>
			) : (
				<h1 className="opacity-70 text-2xl p-4">Search for something . . .</h1>
			)}
		</>
	);
}
export default SearchPage;
