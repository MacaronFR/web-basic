import React from "react";
import {clsx} from "clsx";

interface CardProps {
	children: React.ReactNode,
	className?: string,
	title?: string
}

export default function Card(props: CardProps) {
	return (
		<div className={"border border-card-border p-2 rounded-lg bg-card"}>
			{props.title && <div className={"text-xl font-bold mx-2 pl-2 border-b border-card-border/50 mb-2"}>{props.title}</div>}
			<div className={props.className}>
				{props.children}
			</div>
		</div>
	)
}