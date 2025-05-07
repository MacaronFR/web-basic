import clsx from "clsx";
import React, {useEffect, useMemo, useRef, useState} from "react";
import {FiChevronDown} from "react-icons/fi";
import {SelectValue, SetState} from "../../utils";

const lineSize = 30;

interface Option {
	value: SelectValue
	label: string,
	disabled?: boolean
}

interface SelectProps {
	options: Option[],
	defaultValue?: SelectValue,
	label?: string,
	value: SelectValue,
	setValue: SetState<SelectValue>,
	maxLines?: number,
	disabled?: boolean,
}

export default function Select(props: SelectProps) {
	const maxLines = useMemo(() => {
		return props.maxLines ?? 3;
	}, [props.maxLines])
	const [open, setOpen] = useState(false);
	const [focus, setFocus] = useState(false);
	const [click, setClick] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(-1);
	const container = useRef<HTMLDivElement>(null);
	const optionsContainer = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if(props.defaultValue && props.value === undefined) {
			const o = props.options.find(v => v.value === props.defaultValue);
			if(o) props.setValue(o.value);
		}
	}, [props.defaultValue, props.setValue, props.value, props.options]);
	useEffect(() => {
		const clickOut = (e: MouseEvent) => {
			if(e.target instanceof Node && !container.current?.contains(e.target)) {
				setOpen(false);
			}
		}
		document.addEventListener("click", clickOut);
		return () => document.removeEventListener("click", clickOut);
	}, [container]);
	useEffect(() => {
		if(focus) {
			setOpen(true);
		} else {
			if(click) {
				setClick(false);
			} else {
				setOpen(false);
			}
		}
	}, [focus, click]);
	useEffect(() => {
		if(open) {
			let i = 0;
			while(props.options[i]?.disabled === true) i++;
			if(i >= props.options.length - 1) i = -1;
			setCurrentIndex(i);
		} else {
			setCurrentIndex(-1);
		}
	}, [open]);
	useEffect(() => {
		if(optionsContainer.current) {
			optionsContainer.current.scrollTop = (currentIndex - maxLines / 2) * lineSize;
		}
	}, [currentIndex, optionsContainer]);
	return (
		<div
			ref={container}
			className={"relative group focus:outline-none"}
			onClick={() => props.disabled !== true && setClick(true)}
			onFocus={() => props.disabled !== true && setFocus(true)}
			onBlur={() => props.disabled !== true && setFocus(false)}
			onKeyDown={e => {
				if(e.code === "ArrowDown") {
					setCurrentIndex(prev => {
						let i = prev === props.options.length - 1 ? -prev : 1;
						while(props.options[prev + i]?.disabled === true) {
							i++;
							if(prev + i >= props.options.length) i = -prev;
						}
						return prev + i;
					});
				} else if(e.code === "ArrowUp") {
					setCurrentIndex(prev => {
						let i = prev === 0 ? -(props.options.length -1) : 1;
						while(props.options[prev - i]?.disabled === true) {
							i++;
							if(prev - i <= 0) i = -(props.options.length - 1 - prev);
						}
						return prev - i
					});
				} else if(e.code === "Enter" || e.code === "Space") {
					if(props.options[currentIndex]?.disabled !== true) {
						props.setValue(props.options[currentIndex].value);
						setOpen(false);
						setFocus(false);
						container.current?.blur();
					}
				}
			}}
			tabIndex={props.disabled === true ? -1 : 0}
		>
			<select disabled={props.disabled} className={"hidden peer"} value={props.value} onChange={e => props.setValue(e.target.value)}>
				{props.options.map((option, i) =>
					<option key={i} value={option.value} disabled={option.disabled}>{option.label}</option>
				)}
			</select>
			<div
				className={clsx("border border-input-border bg-input px-2 py-0.5 rounded-md flex justify-between items-center min-w-48 cursor-pointer group-focus:outline group-focus:outline-input-focus peer-disabled:border-input-border-disabled peer-disabled:text-input-text-disabled peer-disabled:outline-none peer-disabled:cursor-default", open && "rounded-b-none")}
			>
				<span>{props.options.find(v => v.value === props.value)?.label}</span>
				<FiChevronDown className={clsx("transition", open && "rotate-x-180")}/>
			</div>
			{ open && <div ref={optionsContainer} className={"absolute top-full left-0 w-full bg-input border border-t-transparent rounded-b-md border-input-border overflow-y-auto"} style={{maxHeight: maxLines * lineSize}} tabIndex={-1}>
				{ props.options.map((option, i) =>
					<div
						key={i}
						className={clsx("px-2 py-1 hover:bg-input-select-options-hover cursor-pointer last:rounded-b-md", props.value === option.value && "bg-input-selected", currentIndex === i && "!bg-input-select-options-hover", option.disabled === true && "cursor-not-allowed text-input-text-disabled")}
						onClick={(e) => {
							if(option.disabled !== true){
								props.setValue(option.value)
								setOpen(false);
								setFocus(false);
							}
						}}
					>
						{option.label}
					</div>
				) }
			</div> }
		</div>
	)
}