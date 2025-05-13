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
		<div className={"wb:bg-header wb:h-12 wb:flex wb:items-center wb:gap-2 wb:px-2"}>
			{ props.displayMenu && <button onClick={() => props.displayMenu && props.displayMenu(prev => !prev)} className={"wb:block wb:md:hidden wb:text-2xl wb:cursor-pointer"}><FiMenu/></button> }
			<h1 className={"wb:text-2xl wb:flex wb:gap-2 wb:items-center"}>{props.title}</h1>
			<div className={"wb:grow"}/>
			<div className={"wb:flex wb:gap-4"}>
				{props.children}
			</div>
		</div>
	)
}