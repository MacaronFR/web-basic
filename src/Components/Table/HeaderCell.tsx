import React from "react";

interface HeaderCellProps {
	children: React.ReactNode
}

export default function HeaderCell(props: HeaderCellProps) {
	return(
		<div className={"bg-slate-950 hover:bg-slate-900 first:rounded-tl-lg last:rounded-tr-lg px-4 py-1 border-b border-amber-100"}>
			{ props.children }
		</div>
	);
}