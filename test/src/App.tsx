import ButtonPrimary from "../../src/Components/Button/ButtonPrimary.tsx";
import ButtonSecondary from "../../src/Components/Button/ButtonSecondary.tsx";
import ButtonCancel from "../../src/Components/Button/ButtonCancel.tsx";
import ButtonDanger from "../../src/Components/Button/ButtonDanger.tsx";
import Table from "../../src/Components/Table/Table.tsx";
import useTable from "../../src/Components/Table/useTable.ts";
import Card from "../../src/Components/Card/Card.tsx";
import Header from "../../src/Components/Header/Header.tsx";
import {FiGithub} from "react-icons/fi";
import {SiNpm} from "react-icons/si";
import SideBar from "../../src/Components/SideBar/SideBar.tsx";
import useSideBar from "../../src/Components/SideBar/useSideBar.ts";
import SideBarItem from "../../src/Components/SideBar/SideBarItem.tsx";
import Input from "../../src/Components/Input/Input.tsx";
import {useState} from "react";
import CheckBox from "../../src/Components/Input/CheckBox.tsx";
import Select from "../../src/Components/Input/Select.tsx";
import { Modal, useModal } from "../../src/Components/Modal"
import logo from  "./logo.svg";
import {SelectValue} from "../../src";
import {DropDown} from "../../src/Components/DropDown";
import {DropDownSeparator} from "../../src/Components/DropDown/DropDown.tsx";
import Badge from "../../src/Components/Badge/Badge.tsx";
import BadgePrimary from "../../src/Components/Badge/BadgePrimary.tsx";
import BadgeSecondary from "../../src/Components/Badge/BadgeSecondary.tsx";
import {BadgeCancel, BadgeDanger} from "../../src/Components/Badge";

export default function App() {
	const table = useTable(
		[
			{id: "d1", name: "Header 1", size: "2fr"},
			{id: "d2", name: "H 2", size: 80},
			{id: "d3", name: "Header 3", size: "150px"},
			{id: "d4", name: "Header 4"},
			{id: "d5", name: "Header 5"}
		], [
			{d1: "Data 1", d2: "Data 2", d3: "Data 3", d4: "Data 4", d5: "Data 5"},
			{d1: "Data 1", d2: "Data 2", d3: "Data 3", d4: "Data 4", d5: "Data 5"},
			{d1: "Data 1", d2: "Data 2", d3: "Data 3", d4: "Data 4", d5: "Data 5"},
			{d1: "Data 1", d2: "Data 2", d3: "Data 3", d4: "Data 4", d5: "Data 5"},
			{d1: "Data 1", d2: "Data 2", d3: "Data 3", d4: "Data 4", d5: "Data 5"},
			{d1: "Data 1", d2: "Data 2", d3: "Data 3", d4: "Data 4", d5: "Data 5"}
		],
		{
			pageable: true,
			maxPage: 10,
			pageSize: 10,
			pageSizeOptions: [10, 20, 30],
			sortable: true
		}
	);
	const menu = useSideBar();
	const [value, setValue] = useState("");
	const [checked, setChecked] = useState(false);
	const [select, setSelect] = useState<SelectValue>();
	const [emptySelect, setEmptySelect] = useState<SelectValue>();
	const modal = useModal();
	return (
		<div className={"wb:w-screen wb:h-screen wb:overflow-hidden wb:overflow-y-auto wb:bg-background wb:text-text wb:flex wb:flex-col"}>
			<Header
				title={<><img alt={"Logo"} src={logo}/><p className={"wb:hidden wb:xs:block wb:text-amber-200"}>IMacaron - Web Basic</p></>}
				displayMenu={menu.setDisplay}
			>
				<a href={"https://www.npmjs.com/package/imacaron-basic"} target={"_blank"} className={"wb:hover:scale-105 wb:text-2xl"}>
					<SiNpm/>
				</a>
				<a href={"https://github.com/MacaronFR/web-basic"} target={"_blank"} className={"wb:hover:scale-105 wb:text-2xl"}>
					<FiGithub/>
				</a>
			</Header>
			<div className={"wb:flex wb:grow"}>
				<SideBar isVisible={menu.display} setVisible={menu.setDisplay}>
					<SideBarItem active>Main</SideBarItem>
					<SideBarItem onClick={() => modal.setDisplay(true)}>Modal</SideBarItem>
				</SideBar>
				<div className={"wb:px-2 wb:flex wb:flex-col wb:gap-2 wb:grow wb:mt-2 wb:max-w-full"}>
					<Table {...table}/>
					<Card className={"wb:flex wb:flex-col wb:xs:flex-row wb:gap-4 wb:flex-wrap"} title={"Buttons"}>
						<div className={"wb:flex wb:flex-col wb:items-center wb:gap-2"}>
							<ButtonPrimary>
								Primary
							</ButtonPrimary>
							<ButtonPrimary loading>
								Primary
							</ButtonPrimary>
						</div>
						<div className={"wb:flex wb:flex-col wb:items-center wb:gap-2"}>
							<ButtonSecondary>
								Secondary
							</ButtonSecondary>
							<ButtonSecondary loading>
								Secondary
							</ButtonSecondary>
						</div>
						<div className={"wb:flex wb:flex-col wb:items-center wb:gap-2"}>
							<ButtonCancel>
								Cancel
							</ButtonCancel>
							<ButtonCancel loading>
								Cancel
							</ButtonCancel>
						</div>
						<div className={"wb:flex wb:flex-col wb:items-center wb:gap-2"}>
							<ButtonDanger>
								Danger
							</ButtonDanger>
							<ButtonDanger loading>
								Danger
							</ButtonDanger>
						</div>
					</Card>
					<Card className={"wb:flex wb:flex-col wb:gap-2"} title={"Inputs"}>
						<div className={"wb:flex wb:flex-col wb:xs:flex-row wb:gap-2 wb:items-center"}>
							<Input label={"Input with label"} value={value} onChange={setValue}/>
							<Input value={value} onChange={setValue}/>
							<Input label={"Input disabled"} value={value} onChange={setValue} disabled/>
						</div>
						<div className={"wb:flex wb:flex-col wb:xs:flex-row wb:gap-2 wb:items-center"}>
							<div className={"wb:flex wb:gap-2"}>Checkbox<CheckBox checked={checked} onChange={setChecked}/></div>
							<div className={"wb:flex wb:gap-2"}>Checkbox disabled<CheckBox checked={checked} onChange={setChecked} disabled/></div>
						</div>
						<div className={"wb:flex wb:flex-col wb:xs:flex-row wb:gap-2 wb:items-center"}>
							<Select options={[{label: "Test", value: "Bonjour", disabled: true}, {label: "Test2", value: "Hello", disabled: false}, {label: "Test3", value: "Guten Tag"}, {label: "Test4", value: "Hola"}]} value={select} setValue={setSelect} defaultValue={"Bonjour"}/>
							<Select options={[{label: "Test", value: "Bonjour", disabled: true}, {label: "Test2", value: "Hello", disabled: false}, {label: "Test3", value: "Guten Tag"}, {label: "Test4", value: "Hola"}]} value={select} setValue={setSelect} defaultValue={"Bonjour"} disabled={true}/>
							<Select options={[{label: "Test", value: "Bonjour", disabled: true}, {label: "Test2", value: "Hello", disabled: false}, {label: "Test3", value: "Guten Tag"}, {label: "Test4", value: "Hola"}]} value={emptySelect} setValue={setEmptySelect} label={"Empty select"}/>
						</div>
					</Card>
					<Card className={"wb:flex wb:gap-2"} title={"DropDown"}>
						<DropDown title={"DropDown"} align={"left"}>
							Element 1
							<DropDownSeparator/>
							Element 2
							<DropDownSeparator/>
							Very long element 3
						</DropDown>
						<DropDown title={"DropDown"} align={"right"}>
							Element 1
							<DropDownSeparator/>
							Element 2
							<DropDownSeparator/>
							Very long element 3
						</DropDown>
					</Card>
					<Card title={"Badge"} className={"wb:flex wb:gap-4"}>
						<Badge/>
						<BadgePrimary/>
						<BadgeSecondary/>
						<BadgeCancel/>
						<BadgeDanger/>
					</Card>
				</div>
			</div>
			<Modal {...modal} title={"Modal"}>
				Bonjour
			</Modal>
		</div>
	);
}
