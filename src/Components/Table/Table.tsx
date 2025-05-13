import {useMemo} from "react";
import type {SetState, StringIndexedObject} from "../../utils.ts";
import type Header from "./Header.ts";
import HeaderCell from "./HeaderCell";
import Cell from "./Cell";
import Footer from "./Footer";
import React from "react";
import {DefaultLoading} from "./DefaultLoading";
import {Sort, SortOrder} from "./Sort";

export interface TableProps<T extends StringIndexedObject> {
	header: Header[],
	data: T[],
	page?: number,
	maxPage?: number,
	goToPage?: SetState<number>,
	pageSize?: number,
	pageSizeOptions?: number[],
	setPageSize?: SetState<number>,
	sort?: Sort[]
	setSort?: SetState<Sort[]>,
	loading?: boolean,
	loadingElement?: React.ReactNode,
	error?: string
}

export default function Table<T extends StringIndexedObject>(props: TableProps<T>) {
	const size = useMemo(() => {
		const size = props.header.map(v => v.size);
		return size.map(v => typeof v === "number" ? v + "px" : v ?? "1fr");
	}, [props.header]);
	return (
		<div className={"wb:border wb:border-table-border wb:rounded-md wb:overflow-hidden"}>
			<div className={"wb:grid wb:overflow-x-auto"} style={{gridTemplateColumns: size.join(" ")}}>
				<div className={"wb:contents"}>
					{props.header.map((header, index) => {
						const sortOrder = header.sortable !== false ? props.sort?.find(v => v.id === header.id)?.order ?? SortOrder.None : SortOrder.None;
						const setSort = props.setSort && ((sort: SortOrder) => {
							if(props.setSort === undefined) return;
							props.setSort(prev => {
								const index = prev.findIndex(v => v.id === header.id);
								if(index !== -1) {
									prev[index].order = sort;
								} else {
									prev.push({id: header.id, order: sort});
								}
								return [...prev];
							})
						});
						return <HeaderCell key={index} sortable={header.sortable ?? true} sort={sortOrder} setSort={setSort}>{header.name ?? header.id}</HeaderCell>
					})}
				</div>
				{props.error !== undefined && <div className={"wb:col-span-full wb:h-24 wb:flex wb:items-center wb:justify-center"}>{props.error}</div> || props.loading && (props.loadingElement ?? <DefaultLoading/>) || props.data.map((row, index) => {
					return (
						<div className={"wb:contents wb:group"} key={index}>
							{props.header.map((header, index) => <Cell key={index} className={header.columnClassName}>{row[header.id]}</Cell>)}
						</div>
					)
				})}
			</div>
			<Footer {...props}/>
		</div>
	)
}