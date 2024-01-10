import {memo, useState} from "react";
import clsx from "clsx";

import Button, {ButtonLink, ButtonType} from "../../components/Button";
import {Column, Item, Row} from "../../components/ListView";
import {CartShopping} from "../../components/Icons/Icons";
import Form, {FormInput, InputLabel} from "../../components/Form";

import WindowType from "../WindowType";
import Header from "../headers/Header";
import SideBar from "../sidebars";

import classes from "./CustomerLayoutStyle.module.scss";
import InputError from "../../components/Form/InputError";
import {InputValidator} from "../../components/TextInput";
import Footer from "../footers/Footer";
import ScrollContainer from "../../components/ScrollContainer";

const CustomerLayout = memo(
	({children, publicValue, setPublicValue}) => {

		const [toggleLoginForm, setToggleLoginForm] = useState(false);

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
						<Row
							className={clsx({
								[classes.middle_content]: true,
							})}
						>
							<Item
								className={clsx({
									[classes.nav_item]: true,
								})}
							>
								<Button
									link={ButtonLink.internal("/")}
									content={"Home"}
								/>
							</Item>

							<Item
								className={clsx({
									[classes.nav_item]: true,
								})}
							>
								<Button
									link={ButtonLink.internal("/")}
									content={"Supplier"}
								/>
							</Item>
							<Item
								className={clsx({
									[classes.nav_item]: true,
								})}
							>
								<Button
									link={ButtonLink.internal("/")}
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
								<Button>
									<CartShopping
										className={clsx({
											[classes.cart]: true,
										})}
									/>
								</Button>
							</Item>
							<Item
								className={clsx({
									[classes.nav_item]: true,
								})}
							>
								<Button
									className={clsx({
										[classes.sign_in_btn]: true,
									})}
									type={ButtonType.OUTLINE}
									content={"Sign In"}
									rounded={true}
									onClick={() => {
										setToggleLoginForm(true);
									}}
								/>
							</Item>
							<Item
								className={clsx({
									[classes.nav_item]: true,
								})}
							>
								<Button
									className={clsx({
										[classes.sign_in_btn]: true,
									})}
									type={ButtonType.PRIMARY}
									content={"Sign Up"}
									rounded={true}
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
						<SideBar
							publicValue={publicValue}
							setPublicValue={setPublicValue}
						/>
					</Item>
					<Item
						flex={4}
						className={clsx({
							[classes.body_content]: true,
						})}
					>
						<ScrollContainer
							width={"calc(100vw - 18vw - 10px)"}
							height={"calc(100vh - 60px)"}
						>
							{children}
							<Footer/>
						</ScrollContainer>
					</Item>
				</Row>
				<Item
					visible={toggleLoginForm}
					className={clsx({
						[classes.login_screen]: true,
					})}
				>
					<Button
						content={"x"}
						className={clsx({
							[classes.close_btn]: true,
						})}
						onClick={() => {
							setToggleLoginForm(false);
						}}
					/>
					<div
						className={clsx({
							[classes.form_container]: true,
						})}
					>
						<Form
							onSubmit={(event, object) => {
								event.preventDefault();
							}}
							className={clsx({
								[classes.login_form]: true,
							})}
							formTitle={(
								<span
									className={clsx({
										[classes.login_form_title]: true,
									})}
								>
								Sign In
							</span>
							)}
							submitButtonContent={"Sign In"}
						>
							{FormInput.text({
								id: "email",
								label: InputLabel.asPlaceholder("Email"),
								error: new InputError({showWhileTyping: true}),
								className: clsx({
									[classes.login_input]: true,
								}),
								validators: [
									InputValidator.notEmpty("Email is required!"),
									InputValidator.emailFormat("Email format invalid."),
								],
							})}
							{FormInput.text({
								id: "password",
								label: InputLabel.asPlaceholder("Password"),
								error: new InputError({}),
								className: clsx({
									[classes.login_input]: true,
								}),
								validators: [
									InputValidator.notEmpty("Password is required!"),
								],
							})}
						</Form>
						<Column
							className={clsx({
								[classes.form_link]: true,
							})}
						>
							<Button
								link={ButtonLink.external("/")}
								content={"Forgot Password?"}
								className={clsx({
									[classes.link]: true,
								})}
							/>
							<Button
								link={ButtonLink.external("/")}
								content={"Create New"}
								className={clsx({
									[classes.link]: true,
								})}
							/>
						</Column>
					</div>
				</Item>
			</div>
		);
	}
);

export default CustomerLayout;