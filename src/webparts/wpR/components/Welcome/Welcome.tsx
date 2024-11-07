import * as React from "react";
import { IWelcomeProps } from "./IWelcomeProps";
import { IWelcomeState } from "./IWelcomeState";

export class Welcome extends React.Component<IWelcomeProps, IWelcomeState> {
	constructor(props: IWelcomeProps) {
		super(props);
		this.state = {
			count: 1,
		};
	}
	componentWillUnmount(): void {
		console.log("Component will unmount");
	}
	componentDidMount(): void {
		console.log("Component did mount");
	}
	componentDidUpdate(
		prevProps: Readonly<IWelcomeProps>,
		prevState: Readonly<IWelcomeState>,
		snapshot?: any
	): void {
		console.log("Component did update");
	}
	componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
		console.log("Component did catch an error " + error.message);
	}

	increase = (): void => {
		this.setState((prevState: IWelcomeState) => ({
			count: prevState.count + 1,
		}));
	};

	render(): React.ReactElement<IWelcomeProps> {
		const { msg } = this.props;
		return (
			<>
				<div>{msg}</div>
				<div>{this.state.count}</div>
				<button onClick={this.increase}>increase</button>
			</>
		);
	}
}

export default Welcome;
