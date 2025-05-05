import {clsx} from "clsx";
import React from "react";

interface CellProps {
	children: React.ReactNode,
	className?: string,
}

export default function Cell(props: CellProps) {
	return (
		<div className={clsx("group-odd:bg-slate-900 group-even:bg-slate-800 px-4 py-1 group-last:first:rounded-bl-lg group-last:last:rounded-br-lg transition-transform", props.className)}>
			{ props.children }
		</div>
	)
}