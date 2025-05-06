import React from "react";
import Button, {ButtonProps} from "./Button";
import {clsx} from "clsx";

export default function ButtonPrimary(props: ButtonProps) {
	return (
		<Button {...props} className={clsx("border-primary text-primary active:bg-primary active:text-on-primary disabled:border-primary-disabled disabled:text-primary-disabled disabled:active:bg-transparent", props.className)}/>
	)
}