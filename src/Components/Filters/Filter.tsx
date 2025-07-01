import { FilterForm } from "./FilterForm";
import {FilterType} from "./FilterType";
import {Option} from "../Input";
import RangeValue, {OptionalRangeValue} from "./RangeValue";
import {SelectValue, SetState} from "../../utils";
import FilterNumber, {FilterMinMax, FilterRange, FilterSlider} from "./FilterNumber";
import FilterBoolean from "./FilterBoolean";
import FilterEnum from "./FilterEnum";
import React from "react";

export interface FilterProps {
	label: string,
	id: string
	type: FilterType,
	form?: FilterForm,
	min?: number,
	max?: number,
	step?: number,
	options?: Option[],
	value: string | number | boolean | RangeValue | OptionalRangeValue | SelectValue,
	setValue: SetState<string> | SetState<number> | SetState<boolean> | SetState<RangeValue> | SetState<OptionalRangeValue> | SetState<SelectValue>
}

export default function Filter(props: FilterProps) {
	let comp;
	if(props.type === FilterType.NUMBER) {
		if(props.form === FilterForm.RANGE && typeof props.value === "object") {
			comp = <FilterRange {...props}/>;
		} else if(props.form === FilterForm.MIN_MAX && typeof props.value === "object") {
			comp = <FilterMinMax {...props}/>;
		} else if(props.form === FilterForm.SLIDER) {
			comp = <FilterSlider {...props}/>;
		} else {
			comp = <FilterNumber {...props}/>;
		}
	} else if(props.type === FilterType.STRING) {

	} else if(props.type === FilterType.BOOLEAN) {
		comp = <FilterBoolean {...props}/>;
	} else if(props.type === FilterType.ENUM) {
		comp = <FilterEnum {...props}/>;
	}
	return <div>
		<h3>{props.label}</h3>
		{comp}
	</div>
}