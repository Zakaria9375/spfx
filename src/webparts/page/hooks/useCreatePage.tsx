import { WebPartContext } from "@microsoft/sp-webpart-base";
import {
	ISPHttpClientOptions,
	SPHttpClientResponse,
	SPHttpClient,
} from "@microsoft/sp-http";

function useCreatePage(
	webPartContext: WebPartContext,
	spHttpClientOptions: ISPHttpClientOptions
): void {
	const url = `${webPartContext.pageContext.web.absoluteUrl}/_api/web/webinfos/add`;

	webPartContext.spHttpClient
		.post(url, SPHttpClient.configurations.v1, spHttpClientOptions)
		.then((res: SPHttpClientResponse) => {
			if (res.status === 200) alert("New subsite has created");
			else alert("Error!!" + res.status + res.statusText);
		})
		.catch((error) => console.log(error));
}

export default useCreatePage;
