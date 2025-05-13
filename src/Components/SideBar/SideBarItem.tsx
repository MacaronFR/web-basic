import React from "react";
import {clsx} from "clsx";

interface SideBarItemProps {
	children: React.ReactNode,
	onClick?: React.MouseEventHandler<HTMLDivElement> | undefined,
	active?: boolean
}

export default function SideBarItem(props: SideBarItemProps) {
	return (
		<div onClick={props.onClick} className={clsx("wb:px-3 wb:py-1 wb:hover:bg-sidebar-item-hover wb:text-lg wb:rounded-md wb:cursor-pointer wb:transition", props.active === true && "wb:bg-sidebar-item-active")}>
			{props.children}
		</div>
	)
}