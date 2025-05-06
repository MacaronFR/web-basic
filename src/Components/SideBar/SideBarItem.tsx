import React from "react";
import {clsx} from "clsx";

interface SideBarItemProps {
	children: React.ReactNode,
	active?: boolean
}

export default function SideBarItem(props: SideBarItemProps) {
	return (
		<div className={clsx("px-4 py-2 hover:bg-sidebar-item-hover rounded-lg cursor-pointer transition", props.active === true && "bg-sidebar-item-active")}>
			{props.children}
		</div>
	)
}