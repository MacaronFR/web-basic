export enum SortOrder {
	None,
	Asc,
	Desc
}

export interface Sort {
	id: string,
	order: SortOrder
}

export const orderOperator = {
	asc: "asc",
	desc: "desc",
	none: ""
}

export function orderToString(order: SortOrder) {
	switch (order) {
		case SortOrder.None: return orderOperator.none;
		case SortOrder.Asc: return orderOperator.asc;
		case SortOrder.Desc: return orderOperator.desc;
		default: return "";
	}
}

export function toCamelCase(s: string) {
	return s.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function sortToQueryString(sort?: Sort[], format?: (id: string, order: string) => string) {
	const orderFormat = format ?? ((id: string, oder: string) => `sort[]=${toCamelCase(id)}.${oder}`)
	if(sort === undefined) {
		return "";
	}
	const sorts = sort.map(s => {
		if(s.order !== SortOrder.None) {
			return orderFormat(s.id, orderToString(s.order));
		} else {
			return "";
		}
	}).filter(s => s !== "");
	if(sorts.length === 0) {
		return "";
	}
	return "&" + sorts.join("&");
}