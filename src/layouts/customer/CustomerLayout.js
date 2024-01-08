import {memo} from "react";
import clsx from "clsx";

import Header from "../headers/Header";
import Button, {ButtonLink, ButtonType} from "../../components/Button";
import TextInput, {InputValidator} from "../../components/TextInput";

import classes from "./CustomerLayoutStyle.module.scss";
import {Item, Row} from "../../components/ListView";
import WindowType from "../WindowType";
import SideBar from "../sidebars";

const CustomerLayout = memo(
	({children}) => {

		const right = [];

		return (
			<div
				className={clsx({
					[classes.customer_layout]: true,
				})}
			>
				<Header
					windowType={WindowType.newInstance()}
					className={clsx({
						[classes.header_container]: true,
					})}
					middle={
						<Row>
							<Item
								className={clsx({
									[classes.nav_item]: true,
								})}
							>
								<Button
									link={ButtonLink.external("/")}
									content={"Home"}
								/>
							</Item>

							<Item
								className={clsx({
									[classes.nav_item]: true,
								})}
							>
								<Button
									link={ButtonLink.external("/")}
									content={"Supplier"}
								/>
							</Item>
							<Item
								className={clsx({
									[classes.nav_item]: true,
								})}
							>
								<Button
									link={ButtonLink.external("/")}
									content={"About Us"}
								/>
							</Item>
						</Row>
					}
					right={
						<Row>
							<Item
								className={clsx({
									[classes.nav_item]: true,
								})}
							>
								<Button
									type={ButtonType.OUTLINE}
									content={"Sign In"}
								/>
							</Item>
						</Row>
					}
				/>
				<Row
					className={clsx({
						[classes.body_container]: true,
					})}
				>
					<Item
						className={clsx({
							[classes.side_bar_container]: true,
						})}
					>
						<SideBar></SideBar>
					</Item>
					<Item
						flex={4}
						className={clsx({
							[classes.body_content]: true,
						})}
					>
						{children}
					</Item>
				</Row>
				{/*<Footer/>*/}
			</div>
		);
	}
);

export default CustomerLayout;