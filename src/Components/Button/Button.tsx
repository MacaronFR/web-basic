import React from "react"
import {clsx} from "clsx";

export interface ButtonProps {
	className?: string,
	children: React.ReactNode,
	onClick?: () => void,
	loading?: boolean,
	disabled?: boolean
}

export default function Button(props: ButtonProps) {
	return (
		<button
			className={clsx("wb:min-w-16 wb:py-1 wb:px-2 wb:border wb:rounded-md wb:cursor-pointer wb:hover:scale-105 wb:transition wb:disabled:cursor-default wb:disabled:scale-100 wb:flex wb:items-center wb:bg-transparent wb:select-none", props.className)}
			onClick={props.onClick}
			disabled={props.disabled || props.loading}
		>
			{props.children}
			{props.loading && <div className={"wb:animate-spin wb:h-4 wb:w-4 wb:ml-2 wb:border-2 wb:border-t-transparent wb:border-current wb:rounded-full"}/>}
		</button>
	)
}