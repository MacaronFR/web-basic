import {FilterProps} from "./Filter";
import {Input} from "../Input";
import {SetState} from "../../utils";
import React from "react";

export default function FilterString(props: FilterProps) {
	return (
		<Input value={props.value as string} onChange={props.setValue as SetState<string>} label={props.label}/>
	)
}