import Header from "./Header";
import type {Sort} from "./Sort";
import {useState} from "react";
import {TableProps} from "./Table";
import {StringIndexedObject} from "../../utils";

interface useTableOptions {
	pageSize?: number,
	pageSizeOptions?: number[],
	maxPage?: number,
	pageable?: boolean,
	sortable?: boolean,
	loading?: boolean,
	loadingElement?: React.ReactNode,
	error?: string,
}

export default function useTable<T extends StringIndexedObject>(headers: Header[], data: T[], options: useTableOptions): TableProps<T> {
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(options.pageSize ?? 0);
	const [sort, setSort] = useState<Sort[]>([]);
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