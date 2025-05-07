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
		<div className={"relative mt-2 w-48"}>
			<input disabled={props.disabled} id={id} placeholder={" "} className={"border border-input-border focus:outline outline-input-focus w-full h-full px-2 py-1 rounded-md bg-input peer disabled:border-input-border-disabled text-input-text disabled:text-input-text-disabled"} value={props.value} onChange={e => props.onChange(e.target.value)}/>
			{props.label && <label htmlFor={id} className={"select-none absolute top-0.5 left-2 text-input-label h-9/10 flex items-center peer-focus:-translate-y-7/10 peer-focus:text-sm peer-focus:h-auto peer-not-placeholder-shown:-translate-y-7/10 peer-not-placeholder-shown:text-sm peer-not-placeholder-shown:h-auto rounded-sm bg-input px-1 transition-all peer-disabled:text-input-label-disabled"}>{props.label}</label>}
		</div>
	)
}
