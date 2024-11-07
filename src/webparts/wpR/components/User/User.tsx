import * as React from "react";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import useUserFetcher from "../../hooks/useUserFetcher";

interface UserProps {
	webPartContext: WebPartContext;
	id: string;
}
function User({ id, webPartContext }: UserProps): JSX.Element {
	const { data, isLoading, error } = useUserFetcher(id, webPartContext);
	if (error)
		return (
			<>
				<div>Error</div>
			</>
		);
	if (isLoading) return <div>Loading...</div>;
	return <div>{data?.email}</div>;
}

export default User;
