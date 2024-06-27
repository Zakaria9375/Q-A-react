import React from "react";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	const handlePrevious = () => {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	};

	const renderPageNumbers = () => {
		const pageNumbers = [];
		for (let i = 1; i <= totalPages; i++) {
			pageNumbers.push(
				<button
					key={i}
					onClick={() => onPageChange(i)}
					className={currentPage === i ? "active-page" : ""}
					aria-label={`Page Number ${i}`}
					aria-current={currentPage === i ? "page" : undefined}
				>
					{i}
				</button>
			);
		}
		return pageNumbers;
	};

	return (
		<nav
			aria-label="Pagination"
			className="my-8 mx-4 flex items-center justify-center gap-5 p-4 "
		>
			<button
				onClick={handlePrevious}
				disabled={currentPage === 1}
				aria-label="Previous page"
			>
				Previous
			</button>
			{renderPageNumbers()}
			<button
				onClick={handleNext}
				disabled={currentPage === totalPages}
				aria-label="Next page"
			>
				Next
			</button>
		</nav>
	);
};

export default Pagination;
