import React from "react";
import Button, {ButtonProps} from "./Button";
import {clsx} from "clsx";

export default function ButtonDanger(props: ButtonProps) {
	return (
		<Button {...props} className={clsx("wb:border-danger wb:text-danger wb:active:bg-danger wb:active:text-on-danger wb:disabled:border-danger-disabled wb:disabled:text-danger-disabled wb:disabled:active:bg-transparent", props.className)}/>
	)
}