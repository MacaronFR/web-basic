import Header from "./Header";
import type {Sort} from "./Sort";
import {useState} from "react";
import {TableProps} from "./Table";
import {StringIndexedObject} from "../../utils";

interface useTableOptions {
	pageSize?: number, //The default page size
	pageSizeOptions?: number[], //The options of page size
	maxPage?: number, //The max of page (can be React state)
	pageable?: boolean, //If the pagination system is active
	sortable?: boolean, //If the table is sortable
	defaultSort?: Sort[], //Default sort for the table
	loading?: boolean, //Loading state (can be React state)
	loadingElement?: React.ReactNode, //An element to customize loading
	error?: string, //Error to display (can be React state)
}

export default function useTable<T extends StringIndexedObject>(headers: Header<T>[], data: T[], options: useTableOptions): TableProps<T> {
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(options.pageSize ?? 0);
	const [sort, setSort] = useState<Sort[]>(options.defaultSort ?? []);
	return {
		header: headers,
		data: data,
		page: options.pageable === true ? page : undefined,
		maxPage: options.maxPage,
		goToPage: setPage,
		pageSize: options.pageSize !== undefined ? pageSize : undefined,
		pageSizeOptions: options.pageSizeOptions,
		setPageSize: options.pageSize !== undefined ? setPageSize : undefined,
		sort: options.sortable !== false ? sort : undefined,
		setSort: options.sortable !== false ? setSort : undefined,
		loading: options.loading,
		loadingElement: options.loadingElement,
		error: options.error
	}
}