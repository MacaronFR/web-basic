import React, {ReactNode, useCallback, useEffect, useState} from "react";
import {clsx} from "clsx";
import {FiX} from "react-icons/fi";

interface ToastProps {
	color?: string,
	children?: ReactNode,
	timer?: number,
	closable?: boolean,
	remove: () => void,
}

export default function ToastElement(props: ToastProps) {
	const [, setTimeOut] = useState<number>();
	const [, setInt] = useState<number>();
	const [size, setSize] = useState<number>(0);
	const [animation, setAnimation] = useState("toast-in");
	const close = useCallback(() => {
		setAnimation("toast-out");
		setTimeout(() => {
			props.remove();
		}, 150);
	}, []);
	useEffect(() => {
		setTimeOut(() => {
			if(props.timer !== undefined && props.timer > 0) {
				return setTimeout(() => {
					console.log("timeout");
					close();
				}, props.timer + 300);
			} else {
				return undefined;
			}
		});
		setTimeout(() => {
			setAnimation("");
			setSize(0);
			setInt(setInterval(() => {
				setSize(prev => {
					if(prev >= 100) {
						setInt(prev => {
							if(prev !== undefined) {
								clearInterval(prev);
							}
							return undefined;
						});
						return 100;
					}
					return props.timer !== undefined ? prev + (15 * 100 / props.timer) : 0
				});
			}, 15));
		}, 150);
		return () => {
			setTimeOut(prev => {
				if(prev !== undefined) {
					clearTimeout(prev);
				}
				return undefined;
			});
			setInt(prev => {
				if(prev !== undefined) {
					clearInterval(prev);
				}
				return undefined;
			})
		};
	}, [props.timer, close]);
	return (
		<div className={clsx("bg-toast border border-toast-border rounded-md flex w-80 overflow-hidden items-stretch", animation)}>
			<div className={clsx("w-1.5", props.color || "bg-gray-400")}/>
			<div className={"grow"}>
				<div className={"flex gap-1 m-1 justify-between items-center"}>
					<div>
						{props.children}
					</div>
					{props.closable && <button className={"text-2xl cursor-pointer"} onClick={close}><FiX/></button>}
				</div>
				{props.timer !== undefined && <div className={"h-0.5 bg-white"} style={{width: `${size}%`}}/> }
			</div>
		</div>
	);
}