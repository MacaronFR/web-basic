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
		<div className={clsx("border border-card-border p-2 rounded-md bg-card", props.containerClassName)}>
			{props.title && <div className={"text-xl font-bold mx-1 pl-1 border-b border-card-border/50 mb-2 flex items-center"}>{props.title}</div>}
			<div className={props.className}>
				{props.children}
			</div>
		</div>
	)
}