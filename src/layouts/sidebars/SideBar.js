import {memo} from "react";
import clsx from "clsx";

import Button from "../../components/Button";
import Card from "../../components/Card";
import {Column, Item} from "../../components/ListView";

import classes from "./SideBar.module.scss";
import TextInput, {InputValidator} from "../../components/TextInput";

function SideBarItem(
	{
		className,
		title,
		internalLink,
		externalLink,
		...props
	}) {


	const componentProps = {
		...props
	};

	return (
		<Card>
			<Button className={clsx({
				[classes.side_bar]: true,
				[className]: className,
			})} {...componentProps}>
				{title}
			</Button>
		</Card>
	);
}

function SideBar(
	{
		className,
		itemModels = [
			{
				title: "Item 1",
				externalLink: ""
			},
			{
				title: "Item 2",
				externalLink: ""
			}
		],
	}) {

	const componentClass = clsx(classes.side_bar, {
		[className]: className,
	});

	return (
		<Card>
			<Column
				className={componentClass}
				spacing={"5px"}
			>
				<Item
					className={clsx({
						[classes.side_bar_item]: true,
					})}
				>
					<TextInput
						label={"Search"}
						placeholder={"Search"}
						className={clsx({
							[classes.search_input]: true,
						})}
						validators={[
							InputValidator.notEmpty()
						]}
						showError={false}
					/>
				</Item>
			</Column>
		</Card>
	);
}

export default memo(SideBar);