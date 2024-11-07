import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IAppProps {
	id: string;
	isDarkTheme: boolean;
	environmentMessage: string;
	webPartContext: WebPartContext;
}
