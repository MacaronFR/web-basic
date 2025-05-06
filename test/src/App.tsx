import ButtonPrimary from "../../src/Components/Button/ButtonPrimary.tsx";
import ButtonSecondary from "../../src/Components/Button/ButtonSecondary.tsx";
import ButtonCancel from "../../src/Components/Button/ButtonCancel.tsx";
import ButtonDanger from "../../src/Components/Button/ButtonDanger.tsx";
import Table from "../../src/Components/Table/Table.tsx";
import useTable from "../../src/Components/Table/useTable.ts";
import Card from "../../src/Components/Card/Card.tsx";

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
	return (
		<div className={"w-screen h-screen bg-background text-text px-2 flex flex-col gap-4"}>
			<Table {...table}/>
			<Card className={"flex gap-4"} title={"Buttons"}>
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
		</div>
	);
}
