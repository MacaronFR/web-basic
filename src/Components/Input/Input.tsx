import React from "react";
import {SetState} from "../../utils";

interface InputProps {
	value: string,
	onChange: SetState<string>,
	label?: string,
	id?: string,
	disabled?: boolean,
}

export default function Input(props: InputProps) {
	const id = props.id ?? Math.random().toString(16);
	return (
		<div className={"wb:relative wb:mt-2 wb:w-48"}>
			<input disabled={props.disabled} id={id} placeholder={" "} className={"wb:border wb:border-input-border wb:focus:outline wb:outline-input-focus wb:w-full wb:h-full wb:px-2 wb:py-1 wb:rounded-md wb:bg-input wb:peer wb:disabled:border-input-border-disabled wb:text-input-text wb:disabled:text-input-text-disabled"} value={props.value} onChange={e => props.onChange(e.target.value)}/>
			{props.label && <label htmlFor={id} className={"wb:select-none wb:absolute wb:top-0.5 wb:left-2 wb:text-input-label wb:h-9/10 wb:flex wb:items-center wb:peer-focus:-translate-y-7/10 wb:peer-focus:text-sm wb:peer-focus:h-auto wb:peer-not-placeholder-shown:-translate-y-7/10 wb:peer-not-placeholder-shown:text-sm wb:peer-not-placeholder-shown:h-auto wb:rounded-sm wb:bg-input wb:px-1 wb:transition-all wb:peer-disabled:text-input-label-disabled"}>{props.label}</label>}
		</div>
	)
}
