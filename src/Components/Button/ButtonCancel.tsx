import React from "react";
import Button, {ButtonProps} from "./Button";
import {clsx} from "clsx";

export default function ButtonCancel(props: ButtonProps) {
	return (
		<Button {...props} className={clsx("wb:border-cancel wb:text-cancel wb:active:bg-cancel wb:active:text-on-cancel wb:disabled:border-cancel-disabled wb:disabled:text-cancel-disabled wb:disabled:active:bg-transparent", props.className)}/>
	)
}