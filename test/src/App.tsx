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
import {Modal, useModal} from "../../src/Components/Modal"
import logo from "./logo.svg";
import {Filters, FilterType, SelectValue, useToast} from "../../src";
import {DropDown, DropDownSeparator} from "../../src/Components/DropDown";
import Badge from "../../src/Components/Badge/Badge.tsx";
import BadgePrimary from "../../src/Components/Badge/BadgePrimary.tsx";
import BadgeSecondary from "../../src/Components/Badge/BadgeSecondary.tsx";
import {BadgeCancel, BadgeDanger} from "../../src/Components/Badge";
import FilterDemo from "./FilterDemo.tsx";

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
	const toaster = useToast();
	return (
		<div className={"w-screen h-screen overflow-hidden overflow-y-auto bg-background text-text flex flex-col"}>
			<Header
				title={<><img alt={"Logo"} src={logo}/><p className={"hidden xs:block text-amber-200"}>IMacaron - Web Basic</p></>}
				displayMenu={menu.setDisplay}
			>
				<a href={"https://www.npmjs.com/package/imacaron-basic"} target={"_blank"} className={"hover:scale-105 text-2xl"}>
					<SiNpm/>
				</a>
				<a href={"https://github.com/MacaronFR/web-basic"} target={"_blank"} className={"hover:scale-105 text-2xl"}>
					<FiGithub/>
				</a>
			</Header>
			<div className={"flex grow"}>
				<SideBar isVisible={menu.display} setVisible={menu.setDisplay}>
					<SideBarItem active>Main</SideBarItem>
					<SideBarItem onClick={() => modal.setDisplay(true)}>Modal</SideBarItem>
				</SideBar>
				<div className={"px-2 flex flex-col gap-2 grow mt-2 max-w-full"}>
					<div className={"flex gap-2 h-full"}>
						<FilterDemo/>
						<Table {...table}/>
					</div>
					<Card className={"flex flex-col xs:flex-row gap-4 flex-wrap"} title={"Buttons"}>
						<div className={"flex flex-col items-center gap-2"}>
							<ButtonPrimary>
								Primary
							</ButtonPrimary>
							<ButtonPrimary loading>
								Primary
							</ButtonPrimary>
						</div>
						<div className={"flex flex-col items-center gap-2"}>
							<ButtonSecondary>
								Secondary
							</ButtonSecondary>
							<ButtonSecondary loading>
								Secondary
							</ButtonSecondary>
						</div>
						<div className={"flex flex-col items-center gap-2"}>
							<ButtonCancel>
								Cancel
							</ButtonCancel>
							<ButtonCancel loading>
								Cancel
							</ButtonCancel>
						</div>
						<div className={"flex flex-col items-center gap-2"}>
							<ButtonDanger>
								Danger
							</ButtonDanger>
							<ButtonDanger loading>
								Danger
							</ButtonDanger>
						</div>
					</Card>
					<Card className={"flex flex-col gap-2"} title={"Inputs"}>
						<div className={"flex flex-col xs:flex-row gap-2 items-center"}>
							<Input label={"Input with label"} value={value} onChange={setValue}/>
							<Input value={value} onChange={setValue}/>
							<Input label={"Input disabled"} value={value} onChange={setValue} disabled/>
						</div>
						<div className={"flex flex-col xs:flex-row gap-2 items-center"}>
							<div className={"flex gap-2"}>Checkbox<CheckBox checked={checked} onChange={setChecked}/></div>
							<div className={"flex gap-2"}>Checkbox disabled<CheckBox checked={checked} onChange={setChecked} disabled/></div>
						</div>
						<div className={"flex flex-col xs:flex-row gap-2 items-center"}>
							<Select options={[{label: "Test", value: "Bonjour", disabled: true}, {label: "Test2", value: "Hello", disabled: false}, {label: "Test3", value: "Guten Tag"}, {label: "Test4", value: "Hola"}]} value={select} setValue={setSelect} defaultValue={"Bonjour"}/>
							<Select options={[{label: "Test", value: "Bonjour", disabled: true}, {label: "Test2", value: "Hello", disabled: false}, {label: "Test3", value: "Guten Tag"}, {label: "Test4", value: "Hola"}]} value={select} setValue={setSelect} defaultValue={"Bonjour"} disabled={true}/>
							<Select options={[{label: "Test", value: "Bonjour", disabled: true}, {label: "Test2", value: "Hello", disabled: false}, {label: "Test3", value: "Guten Tag"}, {label: "Test4", value: "Hola"}]} value={emptySelect} setValue={setEmptySelect} label={"Empty select"}/>
						</div>
					</Card>
					<Card className={"flex gap-2"} title={"DropDown"}>
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
					<Card title={"Badge"} className={"flex gap-4"}>
						<Badge/>
						<BadgePrimary/>
						<BadgeSecondary/>
						<BadgeCancel/>
						<BadgeDanger/>
					</Card>
					<Card title={"Toast"} className={"flex gap-4"}>
						<ButtonPrimary onClick={() => {
							toaster.addToast({
								message: "Toast",
								closable: true,
							})
						}}>
							Toast
						</ButtonPrimary>
					</Card>
				</div>
			</div>
			<Modal {...modal} title={"Modal"}>
				Bonjour
			</Modal>
		</div>
	);
}
