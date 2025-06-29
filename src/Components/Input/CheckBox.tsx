import {FiCheck} from "react-icons/fi";
import {SetState} from "../../index";
import React from "react";

interface CheckBoxProps {
	id?: string,
	disabled?: boolean,
	checked: boolean,
	onChange: SetState<boolean>
}

export default function CheckBox(props: CheckBoxProps) {
	const id = props.id ?? Math.random().toString(16);
	const [focus, setFocus] = React.useState(false);
	return (
		<label
			htmlFor={id}
			className={"block bg-input aspect-square w-5 rounded-md border border-input-border has-disabled:border-input-border-disabled overflow-hidden cursor-pointer select-none has-disabled:cursor-default focus:outline focus:outline-input-focus"}
			tabIndex={props.disabled === true ? -1 : 0}
			onFocus={() => setFocus(true)}
			onBlur={() => setFocus(false)}
			onKeyUp={e => {
				if(e.code === "Space" && focus) {
					props.onChange(prev => !prev);
				}
			}}
		>
			<input type={"checkbox"} className={"hidden peer"} id={id} disabled={props.disabled} checked={props.checked} onChange={e => props.onChange(e.target.checked)}/>
			<div className={"w-full h-full rounded-md opacity-0 bg-input-selected text-input-text peer-disabled:text-input-text-disabled flex items-center justify-center transition-transform duration-500 rotate-0 peer-checked:opacity-100 peer-checked:rotate-[360deg]"}><FiCheck/></div>
		</label>
	)
}