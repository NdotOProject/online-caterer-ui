import clsx from "clsx";

import Card from "../../components/Card";
import {Column, Item, Row} from "../../components/ListView";
import ScrollContainer from "../../components/ScrollContainer";
import FoodCard from "../Home/FoodCard";

import classes from "./SupplierCardStyle.module.scss";

export default function SupplierCard(
	{
		id,
		name,
		address,
		introduction,
		ratingPoint,
		status,
		foods
	}
) {
	if (!Array.isArray(foods)) {
		foods = foods ? [foods] : [];
	}

	return (
		<Card
			className={clsx({
				[classes.supplier_card]: true
			})}
		>
			<Row
				className={clsx({
					[classes.supplier_info]: true,
				})}
			>
				<Item
					className={clsx({
						[classes.info_section]: true
					})}
				>
					<span
						className={clsx({
							[classes.name]: true
						})}
					>
						{name}
					</span>
					<span>
						{address}
					</span>
					<span>
						Point: {ratingPoint ?? "0"}
					</span>
				</Item>
				<Item
					flex={2}
					className={clsx({
						[classes.intro_section]: true,
					})}
				>
					{introduction}
				</Item>
			</Row>
			<ScrollContainer
				width={"100%"}
				height={"300px"}
				className={clsx({
					[classes.food_list]: true,
				})}
			>
				{foods.map((food) => {
					return (
						<FoodCard
							key={food.Id}
							id={food.Id}
							name={food.Name}
							description={food.Description}
							price={food.UnitPrice}
							imageSrc={food.Images}
						/>
					);
				})}
			</ScrollContainer>
		</Card>
	);
}