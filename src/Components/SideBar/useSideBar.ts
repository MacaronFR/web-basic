import {useState} from "react";

export default function useSideBar() {
	const [display, setDisplay] = useState(false);
	return {
		display: display,
		setDisplay: setDisplay
	}
}