import * as React from "react";
import { IGraphProps } from "./IGraphProps";
import { MSGraphClientV3 } from "@microsoft/sp-http";
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";

class Graph extends React.Component<IGraphProps> {
	render(): React.ReactElement<IGraphProps> {
		const { webPartContext } = this.props;
		webPartContext.msGraphClientFactory
			.getClient("3")
			.then((client: MSGraphClientV3) =>
				client
					.api("/me")
					.get()
					.then((user: MicrosoftGraph.User) => {
						return (
							<>
								<div>{user.givenName}</div>
							</>
						);
					})
			)
			.catch((error) => console.log(error));
		return (
			<>
				<div>Loading...</div>
			</>
		);
	}
}
export default Graph;
