import {memo, useEffect, useState} from "react";
import clsx from "clsx";

import Card from "../../components/Card";
import Form, {FormInput, InputLabel} from "../../components/Form";
import {ButtonType} from "../../components/Button";
import {Column, Item} from "../../components/ListView";
import {DropdownItem} from "../../components/Form/FormInput";
import {instance} from "../../services/HttpClient";

import classes from "./SideBar.module.scss";

function SideBar(
	{
		className,
		includeItems = [],
		publicValue,
		setPublicValue
	}
) {
	const [categoryList, setCategoryList] = useState([]);
	const [eventList, setEventList] = useState([]);

	useEffect(() => {
		instance.get("Event")
		.then((res) => {
			setEventList(res.data.Payload);
		}).catch((e) => {
			console.log(e);
		})

		instance.get("FoodCategory")
		.then((res) => {
			setCategoryList(res.data.Payload);
		}).catch(e => {
			console.log(e);
		})
	}, []);

	return (
		<Card>
			<Column
				className={clsx(classes.side_bar, {
					[className]: className,
				})}
			>
				<Item
					key={"SearchForm"}
					className={clsx({
						[classes.side_bar_item]: true,
					})}
				>
					<Form
						className={clsx({
							[classes.form_search]: true,
						})}
						submitButtonType={ButtonType.PRIMARY}
						submitButtonClassName={clsx({
							[classes.search_btn]: true,
						})}
						submitButtonContent={"Find"}
						onSubmit={(event, object) => {
							setPublicValue({
								...publicValue,
								search: object,
							});
						}}
					>
						{FormInput.text({
							id: "search",
							htmlId: "searchInput",
							label: InputLabel.asPlaceholder("Search", ""),
							placeholder: "Search",
							className: clsx({
								[classes.search_input]: true,
							}),
						})}

						{FormInput.dropdown({
							id: "eventId",
							className: clsx({
								[classes.event_list]: true,
							}),
							items: eventList.map((event) => {
								return (
									<DropdownItem
										key={event?.Id}
										value={event?.Id}
									>
										{event?.Name}
									</DropdownItem>
								);
							}),
						})}

						{FormInput.dropdown({
							id: "categoryId",
							className: clsx({
								[classes.event_list]: true,
							}),
							items: categoryList.map((category) => {
								return (
									<DropdownItem
										key={category?.Id}
										value={category?.Id}
									>
										{category?.Name}
									</DropdownItem>
								);
							}),
						})}
					</Form>
				</Item>
				{includeItems}
			</Column>
		</Card>
	);
}

export default memo(SideBar);