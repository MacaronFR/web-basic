import {useContext} from "react";
import {Toast, ToastContext} from "./ToastProvider";

interface Toaster {
	addToast: (toast: Toast) => void
}

export default function useToast(): Toaster {
	const context = useContext(ToastContext);
	return {
		addToast: context.addToast
	}
}