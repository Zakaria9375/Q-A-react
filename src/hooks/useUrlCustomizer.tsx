import { useState, useMemo } from "react";

interface PaginationParams {
	baseUrl: string;
	searchTerm?: string;
	questionId?: number;
	initialPage?: number;
	initialSize?: number;
}

function useUrlCustomizer({
	baseUrl,
	searchTerm = "",
	questionId,
	initialPage = 1,
	initialSize = 5,
}: PaginationParams) {
	const [currentPage, setCurrentPage] = useState(initialPage);
	const [currentSize, setCurrentSize] = useState(initialSize);

	const customizeUrl = useMemo(() => {
		let url = `${baseUrl}?size=${currentSize}&page=${
			currentPage - 1
		}&sort=createdAt,desc`;
		if (searchTerm) {
			url += `&title=${searchTerm}`;
		}
		if (questionId !== undefined) {
			url = `${baseUrl}?questionId=${questionId}&size=${currentSize}&page=${
				currentPage - 1
			}&sort=createdAt,desc`;
		}
		return url;
	}, [baseUrl, currentPage, currentSize, searchTerm, questionId]);

	return {
		currentPage,
		currentSize,
		setCurrentPage,
		setCurrentSize,
		customizeUrl,
	};
}

export default useUrlCustomizer;
