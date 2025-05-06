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
		<div className={clsx("fixed md:static h-screen md:h-auto z-10 bg-sidebar-fade md:bg-transparent md:w-auto flex -translate-x-full md:translate-x-0 transition", props.isVisible && "w-full translate-x-0")} onClick={() => props.setVisible(false)}>
			<div className={"bg-sidebar min-w-24 h-full p-2"} onClick={e => e.stopPropagation()}>
				{props.children}
			</div>
		</div>
	)
}