import * as React from "react";
import type { IPageProps } from "./IPageProps";
import { useForm } from "react-hook-form";
import { ISPHttpClientOptions } from "@microsoft/sp-http";
import useCreatePage from "../hooks/useCreatePage";
interface FormData {
	siteTitle: string;
	siteUrl: string;
	siteDescription: string;
}

const Page: React.FC<IPageProps> = ({ webPartContext }: IPageProps) => {
	const { register, handleSubmit } = useForm<FormData>();

	const onSubmit = (data: FormData): void => {
		const spHttpClientOptions: ISPHttpClientOptions = {
			body: JSON.stringify({
				parameters: {
					"@odata.type": "SP.WebInfoCreationInformation",
					Title: data.siteTitle,
					Url: data.siteUrl,
					Description: data.siteDescription,
					Language: 1033,
					WebTemplate: "STS#0",
					UseUniquePermissions: true,
				},
			}),
		};
		useCreatePage(webPartContext, spHttpClientOptions);
	};
	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					type="text"
					placeholder="Title"
					{...register("siteTitle", { required: true })}
				/>
				<input
					type="text"
					placeholder="Url"
					{...register("siteUrl", { required: true })}
				/>
				<textarea {...register("siteDescription")} rows={5}></textarea>
				<button type="submit">Create</button>
			</form>
		</>
	);
};

export default Page;
