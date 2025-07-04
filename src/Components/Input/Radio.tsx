import React, {useMemo} from "react";
import {SelectValue} from "../../utils";
import {clsx} from "clsx";
import {v4 as UUID} from "uuid";

interface RadioProps {
	id?: string,
	value: SelectValue,
	checked: boolean,
	onChange: () => void,
}

export default function Radio(props: RadioProps) {
	const id = useMemo(() => props.id ?? UUID(), [props.id]);
	return (
		<label htmlFor={id} className={"cursor-pointer"}>
			<div className={"flex items-center justify-center border border-input-border rounded-full w-5 h-5 bg-input"}>
				<div className={clsx("bg-input-radio-checked rounded-full transition-all", props.checked && "w-2.5 h-2.5" || "w-0 h-0")}/>
			</div>
			<input className={"hidden"} type={"radio"} value={props.value} id={id} checked={props.checked} onChange={props.onChange}/>
		</label>
	)
}