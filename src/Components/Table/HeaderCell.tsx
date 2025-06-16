import React, {useCallback} from "react";
import {SortOrder} from "./Sort";
import {clsx} from "clsx";

interface HeaderCellProps {
	children: React.ReactNode,
	sortable: boolean,
	sort: SortOrder,
	setSort?: (sort: SortOrder) => void
}

export default function HeaderCell(props: HeaderCellProps) {
	const toggleSort = useCallback(() => {
		if(props.sortable && props.setSort !== undefined) {
			if(props.sort === SortOrder.Asc) {
				props.setSort(SortOrder.None);
			} else if(props.sort === SortOrder.Desc) {
				props.setSort(SortOrder.Asc);
			} else {
				props.setSort(SortOrder.Desc);
			}
		}
	}, [props.sortable, props.sort, props.setSort]);
	return(
		<div onClick={() => toggleSort()} className={clsx("wb:select-none wb:bg-table-header wb:hover:bg-table-header-hover wb:first:rounded-tl-md wb:last:rounded-tr-md wb:px-2 wb:border-b wb:border-table-border wb:flex wb:justify-between wb:items-center", props.sortable && props.setSort && "cursor-pointer")}>
			<div className={"text-xl text-nowrap py-1"}>{ props.children }</div>
			<div>
				{props.sortable && props.sort === SortOrder.Desc && <span className={"text-2xl"}>&#8595;</span>}
				{props.sortable && props.sort === SortOrder.Asc && <span className={"text-2xl"}>&#8593;</span>}
			</div>
		</div>
	);
}