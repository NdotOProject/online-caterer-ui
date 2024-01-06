import {memo} from "react";
import clsx from "clsx";

import Header from "../headers/Header";
import Button, {ButtonLink, ButtonType} from "../../components/Button";
import TextInput, {TextInputValidator} from "../../components/TextInput";

import classes from "./CustomerLayoutStyle.module.scss";
import {Item, Row} from "../../components/ListView";
import WindowType from "../WindowType";

const CustomerLayout = memo(
	({children}) => {

		const middle = (
			<Row
				className={clsx({
					[classes.header_nav_content]: true
				})}
			>
				<Item>
					<Button
						link={ButtonLink.external("/")}
						content={"Home"}
						className={clsx({
							[classes.nav_item]: true,
						})}
					/>
				</Item>

				<Button
					link={ButtonLink.external("/")}
					content={"Supplier"}
					className={clsx({
						[classes.nav_item]: true,
					})}
				/>
				{/*<Button*/}
				{/*	link={ButtonLink.external("/")}*/}
				{/*	content={"About Us"}*/}
				{/*	className={clsx({*/}
				{/*		[classes.nav_item]: true,*/}
				{/*	})}*/}
				{/*/>*/}
			</Row>
		);

		const right = [
			<Row>
				<TextInput
					label={"Search"}
					validators={[TextInputValidator.notEmpty()]}
					showError={false}
				/>
				<Button
					type={ButtonType.OUTLINE}
					content={"Sign In"}
				/>
			</Row>
		];

		return (
			<div className={clsx({[classes.customer_layout]: true,})}>
				{/*<Header*/}
				{/*	windowType={WindowType.newInstance()}*/}
				{/*	middle={middle}*/}
				{/*	// right={right}*/}
				{/*/>*/}
				{children}
				{/*<Footer/>*/}
			</div>
		);
	}
);

export default CustomerLayout;