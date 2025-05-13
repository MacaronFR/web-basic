import React from "react";
import Button, {ButtonProps} from "./Button";
import {clsx} from "clsx";

export default function ButtonPrimary(props: ButtonProps) {
	return (
		<Button {...props} className={clsx("wb:border-primary wb:text-primary wb:active:bg-primary wb:active:text-on-primary wb:disabled:border-primary-disabled wb:disabled:text-primary-disabled wb:disabled:active:bg-transparent", props.className)}/>
	)
}