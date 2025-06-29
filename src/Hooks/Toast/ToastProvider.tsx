import React, {ReactNode, useCallback, useMemo, useState} from "react";
import {createContext} from "react";
import {ToastElement} from "../../Components/Toast";
import {v4 as UUID} from "uuid";

interface ToastContextProps {
	addToast: (toast: Toast) => void,
}

export interface Toast {
	color?: string,
	message: ReactNode,
	duration?: number,
	closable?: boolean,
	id?: string,
}

export const ToastContext = createContext({
	addToast: () => {}
} as ToastContextProps)

interface ToastProviderProps {
	children: ReactNode,
}

export default function ToastProvider(props: ToastProviderProps) {
	const [toasts, setToasts] = useState<Toast[]>([]);
	const addToast = useCallback((toast: Toast) => {
		const tmp = {...toast}
		if(tmp.id === undefined) {
			tmp.id = UUID();
		}
		setToasts(prev => [...prev, tmp]);
	}, []);
	return (
		<ToastContext.Provider value={{addToast: addToast}}>
			<div id={"toast-container"} className={"text-text fixed top-0 right-0 m-4 flex flex-col gap-2 z-30"}>
				{ toasts.map((toast) => (
					<ToastElement color={toast.color} key={toast.id} timer={toast.duration} closable={toast.closable} remove={() => {setToasts(prev => prev.filter((t) => t.id !== toast.id))}}>
						{toast.message}
					</ToastElement>
				))}
			</div>
			{props.children}
		</ToastContext.Provider>
	)
}