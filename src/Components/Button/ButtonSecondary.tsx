import React from "react";
import Button, {ButtonProps} from "./Button";
import {clsx} from "clsx";

export default function ButtonSecondary(props: ButtonProps) {
	return (
		<Button {...props} className={clsx("border-secondary text-secondary active:bg-secondary active:text-on-secondary disabled:border-secondary-disabled disabled:text-secondary-disabled disabled:active:bg-transparent", props.className)}/>
	)
}