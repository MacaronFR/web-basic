import React from "react";

interface FooterProps {
	page?: number,
	maxPage?: number,
	goToPage?: (page: number) => void,
	pageSize?: number,
	pageSizeOptions?: number[],
	setPageSize?: (pageSize: number) => void,
}

export default function Footer(props: FooterProps) {
	if(props.page === undefined) {
		return <div>NIKKKK</div>;
	}
	return (
		<div className={"border-t col-span-full flex justify-between items-center px-4"}>
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
				<p>{props.page + 1}{props.maxPage !== undefined && ` / ${props.maxPage}`}</p>
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
						{props.pageSizeOptions.map(v => <option key={v} value={v}>{v}</option>)}
					</select>
				}
			</div>
		</div>
	)
}