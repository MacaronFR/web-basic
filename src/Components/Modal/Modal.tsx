import React from "react";
import { SetState } from "../../utils";
import {clsx} from "clsx";
import Card from "../Card/Card";
import {FiX} from "react-icons/fi";

interface ModalProps {
	display: boolean,
	setDisplay: SetState<boolean>,
	children: React.ReactNode,
	title?: string,
}

export default function Modal(props: ModalProps) {
	return (
		<div className={clsx("wb:fixed wb:top-0 wb:left-0 wb:h-screen wb:w-screen wb:bg-modal-screen wb:flex wb:justify-center wb:items-center wb:z-20", props.display || "wb:hidden")} onClick={e => {
			if(e.currentTarget === e.target) {
				props.setDisplay(false)
			}
		}}>
			<Card title={
				<>
					{props.title}
					<div className={"wb:grow"}/>
					<FiX className={"wb:text-2xl wb:cursor-pointer"} onClick={() => props.setDisplay(false)}/>
				</>
			} containerClassName={"wb:w-4/5"}>
				{props.children}
			</Card>
		</div>
	)
}