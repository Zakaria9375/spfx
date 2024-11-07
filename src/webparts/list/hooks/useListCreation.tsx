import {
	SPHttpClient,
	SPHttpClientResponse,
	ISPHttpClientOptions,
} from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IListDefinition } from "../components/IListDefinition";

async function useListCreation(
	listUrl: string,
	webPartContext: WebPartContext,
	listDefinition: IListDefinition
) {
	const title = `GetByTitle('${listDefinition.Title}')`;
	try {
		const res: SPHttpClientResponse = await webPartContext.spHttpClient.get(
			listUrl + title,
			SPHttpClient.configurations.v1
		);
		if (res.status === 200) {
			alert("A List does exist");
		} else if (res.status === 404) {
			const spHttpClientOptions: ISPHttpClientOptions = {
				body: JSON.stringify(listDefinition),
			};
			try {
				const postRes = await webPartContext.spHttpClient.post(
					listUrl,
					SPHttpClient.configurations.v1,
					spHttpClientOptions
				);
				if (postRes.status === 201) alert("new list created");
				else if (postRes.status === 500) alert("");
			} catch (error) {
				alert("error occurred");
				console.log(error);
			}
		}
	} catch (error) {
		alert("An unexpected error occurred");
		console.log(error);
	}
}

export default useListCreation;
