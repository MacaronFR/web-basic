import React from "react";
import {clsx} from "clsx";

export interface BadgeProps {
	bgColor?: string,
	pulseColor?: string,
}

export default function Badge(props: BadgeProps) {
	return (
		<div className={"wb:relative wb:w-min"}>
			<div className={clsx(
				"wb:absolute wb:aspect-square wb:h-4 wb:rounded-full wb:animate-[ping_1.5s_cubic-bezier(0,_0,_0.2,_1)_infinite]",
				props.pulseColor || "wb:bg-white/50"
			)}></div>
			<div className={clsx(
				"wb:aspect-square wb:h-4 wb:rounded-full",
				props.bgColor || "wb:bg-white"
			)}/>
		</div>
	)
}