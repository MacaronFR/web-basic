import React from "react";
import Button, {ButtonProps} from "./Button";
import {clsx} from "clsx";

export default function ButtonDanger(props: ButtonProps) {
	return (
		<Button {...props} className={clsx("border-danger text-danger active:bg-danger active:text-on-danger disabled:border-danger-disabled disabled:text-danger-disabled disabled:active:bg-transparent", props.className)}/>
	)
}