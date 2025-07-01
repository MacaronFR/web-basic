import {FilterProps} from "./Filter";
import {SelectValue, SetState} from "../../utils";
import {Select} from "../Input";
import React from "react";

export default function FilterEnum(props: FilterProps) {
	const value = props.value as SelectValue;
	const setValue = props.setValue as SetState<SelectValue>;
	return (
		<div className={"mt-1"}>
			<Select options={props.options ?? []} value={value} setValue={setValue}/>
		</div>
	)
}