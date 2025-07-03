import React, {useCallback} from "react";
import {SortOrder} from "./Sort";
import {clsx} from "clsx";

interface HeaderCellProps {
	children: React.ReactNode,
	sortable: boolean,
	sort: SortOrder,
	setSort?: (sort: SortOrder) => void,
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
		<div className={"sticky top-0"}>
			<div onClick={() => toggleSort()} className={clsx("select-none bg-table-header hover:bg-table-header-hover first:rounded-tl-md last:rounded-tr-md px-2 border-b border-table-border flex justify-between items-center", props.sortable && props.setSort && "cursor-pointer")}>
				<div className={"text-xl text-nowrap py-1"}>{ props.children }</div>
				<div>
					{props.sortable && props.sort === SortOrder.Desc && <span className={"text-2xl"}>&#8595;</span>}
					{props.sortable && props.sort === SortOrder.Asc && <span className={"text-2xl"}>&#8593;</span>}
				</div>
			</div>
		</div>
	);
}