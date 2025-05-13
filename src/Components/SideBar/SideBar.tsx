import React from "react";
import {clsx} from "clsx";
import {SetState} from "../../utils";

interface SideBarProps {
	children: React.ReactNode,
	isVisible: boolean,
	setVisible: SetState<boolean>
}

export default function SideBar(props: SideBarProps) {
	return (
		<div className={clsx("wb:fixed wb:md:static wb:h-screen wb:md:h-auto wb:z-10 wb:bg-sidebar-fade wb:md:bg-transparent wb:md:w-auto wb:flex wb:-translate-x-full wb:md:translate-x-0 wb:transition", props.isVisible && "wb:w-full wb:translate-x-0")} onClick={() => props.setVisible(false)}>
			<div className={"wb:bg-sidebar wb:min-w-24 wb:h-full wb:p-2"} onClick={e => e.stopPropagation()}>
				{props.children}
			</div>
		</div>
	)
}