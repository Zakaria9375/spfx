import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IPageProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
	webPartContext: WebPartContext
}
