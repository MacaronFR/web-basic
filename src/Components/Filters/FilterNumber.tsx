import {ChangeEvent, useCallback, useEffect, useMemo, useState} from "react";
import {FilterProps} from "./Filter";
import {SetState} from "../../utils";
import {Input} from "../Input";
import React from "react";
import RangeValue, {OptionalRangeValue} from "./RangeValue";

export default function FilterNumber(props: FilterProps) {
	const [value, setValue] = useState((props.value as number).toString());
	useEffect(() => {
		const newValue = parseFloat(value);
		if(!isNaN(newValue)) {
			(props.setValue as SetState<number>)(newValue);
		}
	}, [value]);
	return (
		<Input type={"number"} value={value} onChange={setValue} label={props.label}/>
	)
}

export function FilterSlider(props: FilterProps) {
	const value = props.value as number;
	const setValue = props.setValue as SetState<number>;
	const pos = useMemo(() => {
		const min = props.min ?? 0;
		const max = props.max ?? 100;
		return (value - min) / (max - min) * 100;
	}, [props.min, props.max, value]);
	return (
		<div className={"relative mx-2 h-7 mt-1"}>
			<div className={"absolute w-full h-2"}>
				<input type={"range"} className={"absolute w-full m-0 p-0 border-0 range-input z-20 opacity-0"} min={props.min ?? 0} max={props.max ?? 100} value={value} onChange={(e) => {
					setValue(parseFloat(e.target.value));
				}}/>
			</div>
			<div className={"w-[calc(100%_-_12px)] absolute h-2 ml-1"}>
				<div className={"w-4 h-4 rounded-full absolute bg-primary z-10 -top-1/2 -translate-x-1/2"} style={{left: `${pos}%`}}>
					<span className={"text-xs absolute top-full w-full text-center"}>{value}</span>
				</div>
				<div className={"absolute w-full h-1.5 rounded-sm bg-gray-500"}>
					<div className={"absolute h-full bg-primary/50 rounded-sm"} style={{left: "0", right: `${100 - pos}%`}}/>
				</div>
			</div>
		</div>
	)
}

export function FilterMinMax(props: FilterProps) {
	const value = props.value as OptionalRangeValue;
	const setValue = props.setValue as SetState<OptionalRangeValue>;
	const [minText, setMinText] = useState(value.min?.toString() ?? "");
	const [maxText, setMaxText] = useState(value.max?.toString() ?? "");
	useEffect(() => {
		const newMin = parseFloat(minText);
		if(!isNaN(newMin)) {
			setValue(v => ({...v, min: newMin}));
		} else {
			setValue(v => ({...v, min: undefined}));
		}
	}, [minText, setValue]);
	useEffect(() => {
		const newMax = parseFloat(maxText);
		if(!isNaN(newMax)) {
			setValue(v => ({...v, max: newMax}));
		} else {
			setValue(v => ({...v, max: undefined}));
		}
	}, [maxText, setValue]);
	return (
		<div className={"flex gap-2"}>
			<Input widthClass={"w-22"} value={minText} onChange={setMinText} label={"Min"}/>
			<Input widthClass={"w-22"} value={maxText} onChange={setMaxText} label={"Max"}/>
		</div>
	);
}

export function FilterRange(props: FilterProps) {
	const value = props.value as RangeValue;
	const setValue = props.setValue as SetState<RangeValue>;
	const [min, setMin] = useState<number>(value.min ?? 0);
	const [max, setMax] = useState<number>(value.max ?? 100);
	const step = useMemo(() => props.step ?? 1, [props.step]);
	const onMinChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const value = parseFloat(e.target.value);
		const newMin = Math.min(value, max - step);
		setMin(newMin);
	}, [max, step]);

	const onMaxChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		const value = parseFloat(e.target.value);
		const newMax = Math.max(value, min + step);
		setMax(newMax);
	}, [min, step]);
	const minPos = ((min - (props.min ?? 0)) / ((props.max ?? 100) - (props.min ?? 0))) * 100;
	const maxPos = ((max - (props.min ?? 0)) / ((props.max ?? 100) - (props.min ?? 0))) * 100;
	useEffect(() => {
		setValue({min, max});
	}, [min, max, setValue]);
	return (
		<div className={"relative mx-2 h-7 mt-1"}>
			<div className={"absolute w-full h-2"}>
				<input className={"absolute w-full pointer-events-none appearance-none h-full opacity-0 z-20 p-0 range-input"} type={"range"} value={min} onChange={onMinChange} min={props.min ?? 0} max={props.max ?? 100} step={step}/>
				<input className={"absolute w-full pointer-events-none appearance-none h-full opacity-0 z-20 p-0 range-input"} type={"range"} value={max} onChange={onMaxChange} min={props.min ?? 0} max={props.max ?? 100} step={step}/>
			</div>
			<div className={"w-full absolute h-2"}>
				<div className={"w-4 h-4 rounded-full absolute bg-primary z-10 -top-1/2 -translate-x-1/2"} style={{left: `${minPos}%`}}>
					<span className={"text-xs absolute top-full w-full text-center"}>{min}</span>
				</div>
				<div className={"absolute w-full h-1.5 rounded-sm bg-gray-500"}>
					<div className={"absolute h-full bg-primary/50"} style={{left: `${minPos}%`, right: `${100 - maxPos}%`}}/>
				</div>
				<div className={"w-4 h-4 rounded-full absolute bg-primary z-10 -top-1/2 -translate-x-1/2"} style={{left: `${maxPos}%`}}>
					<span className={"text-xs absolute top-full w-full text-center"}>{max}</span>
				</div>
			</div>
		</div>
	)
}