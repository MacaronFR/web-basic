import React, {ReactNode} from "react";
import {clsx} from "clsx";

interface CardProps {
	children: ReactNode,
	className?: string,
	title?: ReactNode,
	containerClassName?: string,
}

export default function Card(props: CardProps) {
	return (
		<div className={clsx("wb:border wb:border-card-border wb:p-2 wb:rounded-md wb:bg-card", props.containerClassName)}>
			{props.title && <div className={"wb:text-xl wb:font-bold wb:mx-1 wb:pl-1 wb:border-b wb:border-card-border/50 wb:mb-2 wb:flex wb:items-center"}>{props.title}</div>}
			<div className={props.className}>
				{props.children}
			</div>
		</div>
	)
}