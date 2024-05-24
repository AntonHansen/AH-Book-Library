import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

function useFetch(urlEndpoint: string) {
	const [data, setData] = useState<any>(null);
	const [error, setError] = useState<any>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response: AxiosResponse = await axios.get(urlEndpoint);
				setData(response.data);
			} catch (error) {
				setError(error);
			}
		};

		fetchData();
	}, [urlEndpoint]);

	return { data, error };
}

export default useFetch;
