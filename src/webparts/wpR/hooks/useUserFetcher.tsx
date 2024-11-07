import { useState, useEffect, useCallback } from "react";
import { HttpClient, HttpClientResponse } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IUser } from "../components/User/IUser";

interface FetchState {
	data: IUser | null;
	isLoading: boolean;
	error: string | null;
	fetchData: () => Promise<void>;
}

function useUserFetcher(
	id: string,
	webPartContext: WebPartContext
): FetchState {
	const [data, setData] = useState<IUser | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const fetchData = useCallback(async () => {
		if (!id) return;
		const url = `https://jsonplaceholder.typicode.com/users/${id}`;
		try {
			setIsLoading(true);
			const res: HttpClientResponse = await webPartContext.httpClient.get(
				url,
				HttpClient.configurations.v1
			);
			const user = (await res.json()) as IUser;
			setData(user);
		} catch (error) {
			console.error(error);
			setError(error.message || "Could not fetch data");
		} finally {
			setIsLoading(false);
		}
	}, [id, webPartContext]);

	useEffect(() => {
		void fetchData();
	}, [id, fetchData]);

	return { data, isLoading, error, fetchData };
}

export default useUserFetcher;
