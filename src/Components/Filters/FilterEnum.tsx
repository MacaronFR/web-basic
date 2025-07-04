import {FilterProps} from "./Filter";
import {SelectValue, SetState} from "../../utils";
import {CheckBox, Radio, Select} from "../Input";
import React, {useCallback} from "react";

export default function FilterSelect(props: FilterProps) {
	const value = props.value as SelectValue;
	const setValue = props.setValue as SetState<SelectValue>;
	return (
		<div>
			<Select options={props.options ?? []} value={value} setValue={setValue} label={props.label}/>
		</div>
	)
}

export function FilterRadio(props: FilterProps) {
	const value = props.value as SelectValue;
	const setValue = props.setValue as SetState<SelectValue>;
	return (
		<div>
			{props.options?.map((option, index) => (
				<div className={"flex gap-1 items-center"} key={index}>
					<Radio id={props.id + index} value={option.value} checked={value === option.value} onChange={() => setValue(option.value)}/>
					<label htmlFor={props.id + index}>{option.label}</label>
				</div>
			))}
		</div>
	)
}

export function FilterCheckbox(props: FilterProps) {
	const value = props.value as SelectValue[];
	const setValue = props.setValue as SetState<SelectValue[]>;
	const onChange = useCallback((v: SelectValue) => {
		return (checked: boolean | ((prev: boolean) => boolean)) => {
			if(typeof checked === "function") {
				checked = checked(value.includes(v));
			}
			if(checked) {
				setValue(prev => [...prev, v]);
			} else {
				setValue(prev => prev.filter(v1 => v1 !== v));
			}
		}
	}, [setValue]);
	return (
		<div className={"flex flex-col gap-1"}>
			{props.options?.map((option, index) => (
				<div className={"flex gap-1"} key={index}>
					<CheckBox checked={value.includes(option.value)} onChange={onChange(option.value)} id={props.id + index}/>
					<label htmlFor={props.id + index}>{option.label}</label>
				</div>
			))}
		</div>
	)
}

export function FilterMultiSelect(props: FilterProps) {
	props.value
	return (
		<div>
			Coming soon
		</div>
	)
}