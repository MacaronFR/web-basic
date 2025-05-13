import {useState} from "react";

export default function useModal() {
	const [display, setDisplay] = useState(false);

	return {
		display: display,
		setDisplay: setDisplay
	}
}