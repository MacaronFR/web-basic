import {clsx} from "clsx";
import React from "react";

interface DefaultLoadingProps {
	className?: string,
}

export function DefaultLoading(props: DefaultLoadingProps) {
	return (
		<div className={clsx("flex justify-center items-center w-full h-24 col-span-full", props.className)}>
			<div className={"rounded-full border-4 border-loading border-t-transparent animate-spin h-12 w-12"}/>
		</div>
	)
}