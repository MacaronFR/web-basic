import {clsx} from "clsx";
import React from "react";

interface CellProps {
	children: React.ReactNode,
	className?: string,
}

export default function Cell(props: CellProps) {
	return (
		<div className={clsx("wb:group-odd:bg-table-odd wb:group-even:bg-table-even wb:px-2 wb:py-1 wb:group-last:first:rounded-bl-md wb:group-last:last:rounded-br-md wb:transition-colors wb:duration-200 wb:group-hover:bg-table-hover", props.className)}>
			{ props.children }
		</div>
	)
}