import React from "react";
import Button, {ButtonProps} from "./Button";
import {clsx} from "clsx";

export default function ButtonSecondary(props: ButtonProps) {
	return (
		<Button {...props} className={clsx("wb:border-secondary wb:text-secondary wb:active:bg-secondary wb:active:text-on-secondary wb:disabled:border-secondary-disabled wb:disabled:text-secondary-disabled wb:disabled:active:bg-transparent", props.className)}/>
	)
}