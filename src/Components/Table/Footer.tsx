import React, {useEffect, useState} from "react";

interface FooterProps {
	page?: number,
	maxPage?: number,
	goToPage?: (page: number) => void,
	pageSize?: number,
	pageSizeOptions?: number[],
	setPageSize?: (pageSize: number) => void,
}

export default function Footer(props: FooterProps) {
	const [pageText, setPageText] = useState(((props.page ?? 0) + 1).toString());

	useEffect(() => {
		const newPage = parseInt(pageText);
		if(props.goToPage && !isNaN(newPage) && (props.maxPage === undefined || newPage <= props.maxPage) && newPage > 0) {
			props.goToPage(newPage - 1);
		}
	}, [pageText, props.goToPage, props.maxPage]);

	useEffect(() => {
		if(props.page !== undefined) {
			setPageText((props.page + 1).toString());
		}
	}, [props.page]);

	if(props.page === undefined) {
		return null;
	}
	return (
		<div className={"border-t border-table-border bg-table-footer rounded-b-md col-span-full flex justify-between items-center px-4"}>
			<div/>
			<div className={"flex gap-4 items-center"}>
				{props.goToPage !== undefined &&
					<button
						disabled={props.page <= 0}
						className={"text-2xl cursor-pointer disabled:cursor-not-allowed"}
						onClick={() => {
							if(props.page !== undefined && props.goToPage !== undefined && props.page > 0)
								props.goToPage(props.page - 1);
						}}
					>
						{"<"}
					</button>
				}
				<p><input type={"text"} className={"w-4"} value={pageText} onChange={e => setPageText(e.target.value)}/>{props.maxPage !== undefined && ` / ${props.maxPage}`}</p>
				{props.goToPage !== undefined &&
                    <button
                        disabled={props.maxPage !== undefined && props.page >= props.maxPage - 1}
                        className={"text-2xl cursor-pointer disabled:cursor-not-allowed"}
                        onClick={() => {
							if(props.page !== undefined && props.goToPage !== undefined && (props.maxPage === undefined || props.page < props.maxPage - 1))
								props.goToPage(props.page + 1);
						}}
                    >
						{">"}
                    </button>
				}
			</div>
			<div>
				{props.pageSize !== undefined && props.pageSizeOptions !== undefined && props.pageSizeOptions.length !== 0 && props.setPageSize !== undefined &&
					<select value={props.pageSize} onChange={e => {
						if(props.setPageSize !== undefined) {
							props.setPageSize(parseInt(e.target.value));
						}
					}}>
						{props.pageSizeOptions.map(v => <option className={"bg-table-header"} key={v} value={v}>{v}</option>)}
					</select>
				}
			</div>
		</div>
	)
}