import { useState, useEffect } from "react";
import axios from "axios";

interface MoreInfo {
	size: number;
	totalElements: number;
	totalPages: number;
}

interface FetchState<T> {
	data: T | null;
	isLoading: boolean;
	error: string | null;
	fetchData: () => void;
	moreInfo: MoreInfo | null;
}

function useFetchData<T>(url: string | null): FetchState<T> {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [moreInfo, setMoreInfo] = useState<MoreInfo | null>(null);
	const fetchData = async () => {
		if (!url) return;

		try {
			setIsLoading(true);
			const response = await axios.get(url);
			setData(response.data);
			if (response.data.page) {
				setMoreInfo({
					size: response.data.page.size,
					totalElements: response.data.page.totalElements,
					totalPages: response.data.page.totalPages,
				});
			}
		} catch (error: any) {
			setError(error.message || "Could not fetch data");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [url]);

	return { data, isLoading, error, fetchData, moreInfo };
}

export default useFetchData;
