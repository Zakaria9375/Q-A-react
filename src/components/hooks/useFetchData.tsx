import { useState, useEffect } from "react";
import axios from "axios";

interface FetchState<T> {
	data: T | null;
	isLoading: boolean;
	error: string | null;
	fetchData: () => void;
}

function useFetchData<T>(url: string | null): FetchState<T> {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const fetchData = async () => {
		if (!url) return;

		try {
			setIsLoading(true);
			const response = await axios.get(url);
			setData(response.data);
		} catch (error: any) {
			setError(error.message || "Could not fetch data");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [url]);

	return { data, isLoading, error, fetchData };
}

export default useFetchData;
