import {FilterForm, Filters, FilterType, OptionalRangeValue, RangeValue, SelectValue} from "../../src";
import {useState} from "react";

export default function FilterDemo() {
	const [number, setNumber] = useState(0);
	const [slider, setSlider] = useState(0);
	const [minMax, setMinMax] = useState<OptionalRangeValue>({});
	const [range, setRange] = useState<RangeValue>({min: 0, max: 100});
	const [string, setString] = useState("");
	const [select, setSelect] = useState<SelectValue>();
	const [radio, setRadio] = useState<SelectValue>();
	const [checkbox, setCheckbox] = useState<SelectValue[]>([]);
	return (
		<Filters filters={[
			{
				label: "Number",
				id: "number",
				type: FilterType.NUMBER,
				value: number,
				setValue: setNumber
			}, {
				label: "Number Slider",
				id: "number",
				type: FilterType.NUMBER,
				form: FilterForm.SLIDER,
				value: slider,
				setValue: setSlider
			}, {
				label: "Number Min Max",
				id: "minmax",
				type: FilterType.NUMBER,
				form: FilterForm.MIN_MAX,
				value: minMax,
				setValue: setMinMax
			}, {
				label: "Number Range",
				id: "range",
				type: FilterType.NUMBER,
				form: FilterForm.RANGE,
				value: range,
				setValue: setRange
			}, {
				label: "String",
				id: "string",
				type: FilterType.STRING,
				value: string,
				setValue: setString
			}, {
				label: "Enum Select",
				id: "select",
				type: FilterType.ENUM,
				form: FilterForm.SELECT,
				value: select,
				setValue: setSelect,
				options: [{label: "Option 1", value: "1"}, {label: "Option 2", value: "2"}, {label: "Option 3", value: "3"}]
			}, {
				label: "Enum Radio",
				id: "radio",
				type: FilterType.ENUM,
				form: FilterForm.RADIO,
				value: radio,
				setValue: setRadio,
				options: [{label: "Option 1", value: "1"}, {label: "Option 2", value: "2"}, {label: "Option 3", value: "3"}]
			}, {
				label: "Enum Checkbox",
				id: "checkbox",
				type: FilterType.ENUM,
				form: FilterForm.CHECKBOX,
				value: checkbox,
				setValue: setCheckbox,
				options: [{label: "Option 1", value: "1"}, {label: "Option 2", value: "2"}, {label: "Option 3", value: "3"}]
			}, {
				label: "Enum Multiselect",
				id: "multiselect",
				type: FilterType.ENUM,
				form: FilterForm.MULTI_SELECT,
				value: [],
				setValue: () => {},
				options: [{label: "Option 1", value: "1"}, {label: "Option 2", value: "2"}, {label: "Option 3", value: "3"}]
			}
		]}/>
	)
}