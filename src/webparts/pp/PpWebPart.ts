import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
	type IPropertyPaneConfiguration,
	PropertyPaneChoiceGroup,
	PropertyPaneDropdown,
	PropertyPaneSlider,
	PropertyPaneTextField,
	PropertyPaneToggle,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import * as strings from "PpWebPartStrings";
import Pp from "./components/Pp";
import { IPpProps } from "./components/IPpProps";

export interface IPpWebPartProps {
	description: string;
	certified: boolean;
}

export default class PpWebPart extends BaseClientSideWebPart<IPpWebPartProps> {
	private _isDarkTheme: boolean = false;
	private _environmentMessage: string = "";

	public render(): void {
		const element: React.ReactElement<IPpProps> = React.createElement(Pp, {
			description: this.properties.description,
			isDarkTheme: this._isDarkTheme,
			environmentMessage: this._environmentMessage,
			hasTeamsContext: !!this.context.sdks.microsoftTeams,
			userDisplayName: this.context.pageContext.user.displayName,
		});

		ReactDom.render(element, this.domElement);
	}

	protected onInit(): Promise<void> {
		this.properties.certified = true;
		return this._getEnvironmentMessage().then((message) => {
			this._environmentMessage = message;
		});
	}

	private _getEnvironmentMessage(): Promise<string> {
		if (!!this.context.sdks.microsoftTeams) {
			// running in Teams, office.com or Outlook
			return this.context.sdks.microsoftTeams.teamsJs.app
				.getContext()
				.then((context) => {
					let environmentMessage: string = "";
					switch (context.app.host.name) {
						case "Office": // running in Office
							environmentMessage = this.context.isServedFromLocalhost
								? strings.AppLocalEnvironmentOffice
								: strings.AppOfficeEnvironment;
							break;
						case "Outlook": // running in Outlook
							environmentMessage = this.context.isServedFromLocalhost
								? strings.AppLocalEnvironmentOutlook
								: strings.AppOutlookEnvironment;
							break;
						case "Teams": // running in Teams
						case "TeamsModern":
							environmentMessage = this.context.isServedFromLocalhost
								? strings.AppLocalEnvironmentTeams
								: strings.AppTeamsTabEnvironment;
							break;
						default:
							environmentMessage = strings.UnknownEnvironment;
					}

					return environmentMessage;
				});
		}

		return Promise.resolve(
			this.context.isServedFromLocalhost
				? strings.AppLocalEnvironmentSharePoint
				: strings.AppSharePointEnvironment
		);
	}

	protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
		if (!currentTheme) {
			return;
		}

		this._isDarkTheme = !!currentTheme.isInverted;
		const { semanticColors } = currentTheme;

		if (semanticColors) {
			this.domElement.style.setProperty(
				"--bodyText",
				semanticColors.bodyText || null
			);
			this.domElement.style.setProperty("--link", semanticColors.link || null);
			this.domElement.style.setProperty(
				"--linkHovered",
				semanticColors.linkHovered || null
			);
		}
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse("1.0");
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: [
				{
					header: {
						description: strings.PropertyPaneDescription,
					},
					groups: [
						{
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneTextField("description", {
									label: strings.DescriptionFieldLabel,
									multiline: true,
									maxLength: 150,
								}),
								PropertyPaneToggle("certified", {
									label: "certified",
								}),
								PropertyPaneSlider("volume", {
									max: 10,
									min: 0,
									label: "Volume",
									step: 1,
									value: 5,
									showValue: true,
								}),
								PropertyPaneChoiceGroup("gender", {
									label: "Gender",
									options: [
										{ key: "male", text: "male" },
										{ key: "female", text: "female" },
									],
								}),
								PropertyPaneDropdown("sort by", {
									label: "sort by",
									options: [
										{
											key: "1",
											text: "frontend",
										},
										{
											key: "2",
											text: "backend",
										},
									],
								}),
							],
						},
					],
				},
				{
					header: {
						description: "second page",
					},
					groups: [
						{
							groupName: strings.BasicGroupName,
							groupFields: [
								PropertyPaneTextField("description", {
									label: strings.DescriptionFieldLabel,
									multiline: true,
									maxLength: 150,
								}),
								PropertyPaneToggle("certified", {
									label: "certified",
								}),
								PropertyPaneSlider("volume", {
									max: 10,
									min: 0,
									label: "Volume",
									step: 1,
									value: 5,
									showValue: true,
								}),
								PropertyPaneChoiceGroup("gender", {
									label: "Gender",
									options: [
										{ key: "male", text: "male" },
										{ key: "female", text: "female" },
									],
								}),
								PropertyPaneDropdown("sort by", {
									label: "sort by",
									options: [
										{
											key: "1",
											text: "frontend",
										},
										{
											key: "2",
											text: "backend",
										},
									],
								}),
							],
						},
					],
				},
			],
		};
	}
}
