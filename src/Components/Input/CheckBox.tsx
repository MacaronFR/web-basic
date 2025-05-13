import {FiCheck} from "react-icons/fi";
import {SetState} from "../../index";
import React, {useEffect} from "react";

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
			className={"wb:block wb:bg-input wb:aspect-square wb:w-5 wb:rounded-md wb:border wb:border-input-border wb:has-disabled:border-input-border-disabled wb:overflow-hidden wb:cursor-pointer wb:select-none wb:has-disabled:cursor-default wb:focus:outline wb:focus:outline-input-focus"}
			tabIndex={props.disabled === true ? -1 : 0}
			onFocus={() => setFocus(true)}
			onBlur={() => setFocus(false)}
			onKeyUp={e => {
				if(e.code === "Space" && focus) {
					props.onChange(prev => !prev);
				}
			}}
		>
			<input type={"checkbox"} className={"wb:hidden wb:peer"} id={id} disabled={props.disabled} checked={props.checked} onChange={e => props.onChange(e.target.checked)}/>
			<div className={"wb:w-full wb:h-full wb:rounded-md wb:opacity-0 wb:bg-input-selected wb:text-input-text wb:peer-disabled:text-input-text-disabled wb:flex wb:items-center wb:justify-center wb:transition-transform wb:duration-500 wb:rotate-0 wb:peer-checked:opacity-100 wb:peer-checked:rotate-[360deg]"}><FiCheck/></div>
		</label>
	)
}