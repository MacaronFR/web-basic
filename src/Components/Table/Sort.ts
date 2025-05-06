export enum SortOrder {
	None,
	Asc,
	Desc
}

export interface Sort {
	id: string,
	order: SortOrder
}