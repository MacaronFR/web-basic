import React, {useEffect, useRef, useState} from "react";
import {ButtonPrimary} from "../Button";
import {clsx} from "clsx";
import {FiChevronDown} from "react-icons/fi";

interface DropDownProps {
	title: React.ReactNode,
	children: React.ReactNode,
	align?: "left" | "right"
}

export default function DropDown(props: DropDownProps) {
	const [display, setDisplay] = useState(false);
	const container = useRef<HTMLDivElement>(null);
	const onOutsideClick = (e: MouseEvent) => {
		if(container.current && !container.current.contains(e.target as Node)) {
			setDisplay(false);
		}
	}
	useEffect(() => {
		document.addEventListener("click", onOutsideClick);
		return () => document.removeEventListener("click", onOutsideClick);
	}, [])
	return (
		<div className={"wb:relative"} ref={container}>
			<div onClick={() => setDisplay(prev => !prev)} className={"wb:flex wb:items-center wb:gap-2 wb:cursor-pointer wb:border wb:rounded-md wb:border-dropdown-border wb:bg-dropdown-bg wb:p-1"}>
				<p>{props.title}</p>
				<FiChevronDown className={clsx(display && "wb:rotate-180")}/>
			</div>
			<div className={clsx("wb:absolute wb:bg-dropdown-bg wb:border wb:border-dropdown-border wb:rounded-md wb:top-full wb:mt-1 wb:min-w-full wb:p-1", display || "wb:hidden", props.align === "right" && "wb:right-0", props.align === "left" && "wb:left-0")}>
				{props.children}
			</div>
		</div>
	)
}

export function DropDownSeparator() {
	return (
		<div className={"wb:border-b wb:border-dropdown-border wb:my-1 wb:px-2"}/>
	)
}