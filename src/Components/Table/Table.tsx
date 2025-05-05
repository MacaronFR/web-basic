import {useMemo} from "react";
import type {StringIndexedObject} from "../../utils.ts";
import type Header from "./Header.ts";
import HeaderCell from "./HeaderCell";
import Cell from "./Cell";
import Footer from "./Footer";
import React from "react";

interface TableProps<T extends StringIndexedObject> {
	header: Header[],
	data: T[],
	page?: number,
	maxPage?: number,
	goToPage?: (page: number) => void,
	pageSize?: number,
	pageSizeOptions?: number[],
	setPageSize?: (pageSize: number) => void,
}

export default function Table<T extends StringIndexedObject>(props: TableProps<T>) {
	const size = useMemo(() => {
		const size = props.header.map(v => v.size);
		return size.map(v => typeof v === "number" ? v + "px" : v ?? "1fr");
	}, [props.header]);
	return (
		<div className={"grid border border-amber-100 rounded-lg"} style={{gridTemplateColumns: size.join(" ")}}>
			<div className={"contents"}>
				{props.header.map((header, index) => <HeaderCell key={index}>{header.name ?? header.id}</HeaderCell>)}
			</div>
			{ props.data.map((row, index) => {
				return (
					<div className={"contents group"} key={index}>
						{props.header.map((header, index) => <Cell key={index} className={header.columnClassName}>{row[header.id]}</Cell>)}
					</div>
				)
			})}
			<Footer {...props}/>
		</div>
	)
}