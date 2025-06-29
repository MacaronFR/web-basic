import {clsx} from "clsx";
import React from "react";

interface CellProps {
	children: React.ReactNode,
	className?: string,
}

export default function Cell(props: CellProps) {
	return (
		<div className={clsx("group-odd:bg-table-odd group-even:bg-table-even px-2 py-1 group-last:first:rounded-bl-md group-last:last:rounded-br-md transition-colors duration-200 group-hover:bg-table-hover", props.className)}>
			{ props.children }
		</div>
	)
}