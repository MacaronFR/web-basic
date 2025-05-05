import React from "react";

interface HeaderCellProps {
	children: React.ReactNode
}

export default function HeaderCell(props: HeaderCellProps) {
	return(
		<div className={"bg-table-header hover:bg-table-header-hover first:rounded-tl-lg last:rounded-tr-lg px-4 py-1 border-b border-table-border"}>
			{ props.children }
		</div>
	);
}