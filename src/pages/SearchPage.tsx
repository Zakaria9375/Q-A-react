import { useState } from "react";
import QuestionList from "../components/question/QuestionList";

function SearchPage() {
	const [searchTerm, setSearchTerm] = useState<string>("");
	const baseUrl = "http://localhost:8050/api";
	const searchUrl = searchTerm
		? `${baseUrl}/questions/search/findByTitleContaining?title=${searchTerm}`
		: "";
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};
	return (
		<>
			<input
				type="text"
				placeholder="Search for question"
				value={searchTerm}
				onChange={handleSearchChange}
			/>
			{searchTerm ? (
				<QuestionList url={searchUrl} />
			) : (
				<p className="opacity-70 text-2xl p-4">Search for something . . .</p>
			)}
		</>
	);
}
export default SearchPage;
