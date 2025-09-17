import {FilterForm, FilterType, OptionalRangeValue, RangeValue} from "../index";
import {SelectValue} from "../../utils";
import {FilterProps} from "./Filter";
import {useCallback, useMemo} from "react";

export type FilterValue = string | number | boolean | RangeValue | OptionalRangeValue | SelectValue | SelectValue[]

export const filterOperator = {
	like: "like",
	in: "in",
	equal: "eq",
	greaterOrEqual: "gte",
	greater: "gt",
	lowerOrEqual: "lwe",
	lower: "lw",
	notEqual: "neq"
}

export function useFilter(filters: FilterProps[], transform?: {[k: string]: ((v: FilterValue) => FilterValue)}, format?: (id: string, value: FilterValue, op: string) => string) {
	const filterFormat = useCallback((id: string, value: FilterValue, op: string) => {
		return format?.(id, value, op) ?? `filter[]=${id}:${op}:${value}`;
	}, [format]);
	const queryString = useMemo(() => {
		const res: string[] = [];
		filters.map((f) => {
			let value: FilterValue = f.value;
			if(transform !== undefined && transform[f.id] !== undefined) {
				value = transform[f.id](f.value);
			}
			if(f.type === FilterType.STRING) {
				if(value !== "") {
					res.push(filterFormat(f.id, value, filterOperator.like));
				}
			} else if(f.type === FilterType.ENUM) {
				if(f.form === FilterForm.CHECKBOX || f.form === FilterForm.MULTI_SELECT) {
					if(value instanceof Array && value.length !== 0) {
						res.push(filterFormat(f.id, value.join(","), filterOperator.in));
					}
				} else if(f.form === FilterForm.RADIO || f.form === FilterForm.SELECT) {
					if(value !== undefined) {
						res.push(filterFormat(f.id, value, filterOperator.equal));
					}
				}
			} else if(f.type === FilterType.NUMBER) {
				if(f.form === FilterForm.MIN_MAX || f.form === FilterForm.RANGE) {
					if(typeof value === "object") {
						const k = Object.keys(value);
						if(k.includes("min") && k.includes("max")) {
							const v = value as OptionalRangeValue;
							if(v.min !== undefined) {
								res.push(filterFormat(f.id, v.min, filterOperator.greaterOrEqual));
							}
							if(v.max !== undefined) {
								res.push(filterFormat(f.id, v.max, filterOperator.lowerOrEqual));
							}
						}
					}
				} else if(f.form === FilterForm.SLIDER || f.form === undefined) {
					res.push(filterFormat(f.id, value, filterOperator.equal));
				}
			}
		})
		if(res.length != 0) {
			return "&" + res.join("&");
		} else {
			return ""
		}
	}, [filterFormat, filters, transform]);
	return {filters: filters, queryString: queryString};
}
