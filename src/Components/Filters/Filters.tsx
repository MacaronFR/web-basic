import {FilterProps} from "./Filter";
import {Card} from "../Card";
import Filter from "./Filter";
import React from "react";

interface FiltersProps {
	filters: FilterProps[]
}

export default function Filters(props: FiltersProps) {
	return (
		<Card>
			{props.filters.map((f, i) => {
				return (
					<Filter {...f} key={i}/>
				)
			})}
		</Card>
	);
}