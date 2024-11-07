import * as React from "react";
import styles from "./App.module.scss";
import type { IAppProps } from "./IAppProps";

import Welcome from "./Welcome/Welcome";
import User from "./User/User";
import Graph from "./graph/Graph";

export default class App extends React.Component<IAppProps> {
	render(): React.ReactElement<IAppProps> {
		const { id, webPartContext } = this.props;
		const websiteUrl = webPartContext.pageContext.web.absoluteUrl;
		return (
			<section className={`${styles.wpR}`}>
				<Welcome msg={websiteUrl} />
				<User webPartContext={webPartContext} id={id} />
				<Graph webPartContext={webPartContext} />
			</section>
		);
	}
}
