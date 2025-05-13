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
		<div className={clsx("fixed h-screen w-screen bg-modal-screen flex justify-center items-center z-20", props.display || "hidden")} onClick={e => {
			if(e.currentTarget === e.target) {
				props.setDisplay(false)
			}
		}}>
			<Card title={
				<>
					{props.title}
					<div className={"grow"}/>
					<FiX className={"text-2xl cursor-pointer"} onClick={() => props.setDisplay(false)}/>
				</>
			} containerClassName={"w-4/5"}>
				{props.children}
			</Card>
		</div>
	)
}