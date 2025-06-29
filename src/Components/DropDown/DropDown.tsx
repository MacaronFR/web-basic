import React, {useEffect, useRef, useState} from "react";
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
		<div className={"relative z-10"} ref={container}>
			<div onClick={() => setDisplay(prev => !prev)} className={"flex items-center gap-2 cursor-pointer border rounded-md border-dropdown-border bg-dropdown-bg p-1"}>
				<p>{props.title}</p>
				<FiChevronDown className={clsx(display && "rotate-180")}/>
			</div>
			<div className={clsx("absolute bg-dropdown-bg border border-dropdown-border rounded-md top-full mt-1 min-w-full p-1", display || "hidden", props.align === "right" && "right-0", props.align === "left" && "left-0")}>
				{props.children}
			</div>
		</div>
	)
}

export function DropDownSeparator() {
	return (
		<div className={"border-b border-dropdown-border my-1 px-2"}/>
	)
}