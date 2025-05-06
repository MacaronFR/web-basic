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
			className={clsx("min-w-16 py-1 px-2 border rounded-md cursor-pointer hover:scale-105 transition disabled:cursor-default disabled:scale-100 flex items-center bg-transparent select-none", props.className)}
			onClick={props.onClick}
			disabled={props.disabled || props.loading}
		>
			{props.children}
			{props.loading && <div className={"animate-spin h-4 w-4 ml-2 border-2 border-t-transparent border-current rounded-full"}/>}
		</button>
	)
}