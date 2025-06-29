import React from "react";
import {clsx} from "clsx";

export interface BadgeProps {
	bgColor?: string,
	pulseColor?: string,
}

export default function Badge(props: BadgeProps) {
	return (
		<div className={"relative w-min"}>
			<div className={clsx(
				"absolute aspect-square h-4 rounded-full animate-[ping_1.5s_cubic-bezier(0,_0,_0.2,_1)_infinite]",
				props.pulseColor || "bg-white/50"
			)}></div>
			<div className={clsx(
				"aspect-square h-4 rounded-full",
				props.bgColor || "bg-white"
			)}/>
		</div>
	)
}