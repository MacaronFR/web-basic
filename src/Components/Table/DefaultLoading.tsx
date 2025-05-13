import {clsx} from "clsx";
import React from "react";

interface DefaultLoadingProps {
	className?: string,
}

export function DefaultLoading(props: DefaultLoadingProps) {
	return (
		<div className={clsx("wb:flex wb:justify-center wb:items-center wb:w-full wb:h-24 wb:col-span-full", props.className)}>
			<div className={"wb:rounded-full wb:border-4 wb:border-loading wb:border-t-transparent wb:animate-spin wb:h-12 wb:w-12"}/>
		</div>
	)
}