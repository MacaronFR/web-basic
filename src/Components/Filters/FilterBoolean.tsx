import {CheckBox} from "../Input";
import {SetState} from "../../utils";
import {FilterProps} from "./Filter";
import React from "react";

export default function FilterBoolean(props: FilterProps) {
	const value = props.value as boolean;
	const setValue = props.setValue as SetState<boolean>;
	return (
		<div className={"mt-1"}>
			<CheckBox checked={value} onChange={setValue}/>
		</div>
	)
}