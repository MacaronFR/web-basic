import React from "react";
import Button, {ButtonProps} from "./Button";
import {clsx} from "clsx";

export default function ButtonCancel(props: ButtonProps) {
	return (
		<Button {...props} className={clsx("border-cancel text-cancel active:bg-cancel active:text-on-cancel disabled:border-cancel-disabled disabled:text-cancel-disabled disabled:active:bg-transparent", props.className)}/>
	)
}