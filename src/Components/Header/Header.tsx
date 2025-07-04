import React from "react";
import {FiMenu} from "react-icons/fi";
import {SetState} from "../../utils";

interface HeaderProps {
	title: React.ReactNode,
	children?: React.ReactNode,
	displayMenu?: SetState<boolean>
}

export default function Header(props: HeaderProps) {
	return (
		<div className={"bg-header h-12 flex items-center gap-2 px-2 py-1"}>
			{ props.displayMenu && <button onClick={() => props.displayMenu && props.displayMenu(prev => !prev)} className={"block md:!hidden text-2xl cursor-pointer"}><FiMenu/></button> }
			<h1 className={"text-2xl flex gap-2 items-center"}>{props.title}</h1>
			<div className={"grow"}/>
			<div className={"flex gap-4"}>
				{props.children}
			</div>
		</div>
	)
}