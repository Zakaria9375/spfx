import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IListProps {
	description: string;
	isDarkTheme: boolean;
	environmentMessage: string;
	hasTeamsContext: boolean;
	userDisplayName: string;

	webPartContext: WebPartContext;
}
