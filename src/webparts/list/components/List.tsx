import * as React from "react";
import { useForm } from "react-hook-form";
import useListCreation from "../hooks/useListCreation";
import { IListProps } from "./IListProps";
import { IListDefinition } from "./IListDefinition";

interface FormData {
	listName: string;
	listDescription: string;
}

const List: React.FC<IListProps> = ({ webPartContext }: IListProps) => {
	const { register, handleSubmit } = useForm<FormData>();

	const onSubmit = async (data: FormData) => {
		console.log(data);
		const listUrl = `${webPartContext.pageContext.web.absoluteUrl}/_api/web/lists/`;

		const listDefinition: IListDefinition = {
			Title: data.listName,
			Description: data.listDescription,
			AllowContentTypes: true,
			BaseTemplate: 100,
			ContentTypesEnabled: true,
		};

		await useListCreation(listUrl, webPartContext, listDefinition);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<input
					type="text"
					placeholder="List Name"
					{...register("listName", { required: true })}
				/>
				<input
					type="text"
					placeholder="List Description"
					{...register("listDescription", { required: true })}
				/>
				<button type="submit">Create</button>
			</form>
		</>
	);
};

export default List;
