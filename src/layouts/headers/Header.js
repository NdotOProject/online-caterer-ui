import {memo} from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import Button, {ButtonLink} from "../../components/Button";
import Card from "../../components/Card";
import {Item, Row} from "../../components/ListView";
import WindowType from "../WindowType";

import classes from "./HeaderStyle.module.scss";

const Header = memo(
	({windowType, middle, right}) => {

		return (
			<Card>
				<Row
					className={clsx({
						[classes.header]: true,
					})}
				>
					<Item
						key={"header_app_logo"}
						flex={1}
						className={clsx({
							[classes.header__logo_container]: true,
							[classes.mobile]: windowType.isMobile()
						})}
					>
						<Button
							link={ButtonLink.external("/")}
							className={clsx({
								[classes.logo_text]: true
							})}
							content={"Online Catering"}
						/>
					</Item>

					<Item
						visible={windowType?.isComputer()}
						flex={2}
					>
						{middle}
					</Item>

					<Item
						visible={(
							windowType?.isComputer()
							|| windowType?.isTablet()
						)}
						flex={1}>
						{right}
					</Item>
				</Row>
			</Card>
		);
	}
);

Header.propTypes = {
	windowType: PropTypes.instanceOf(WindowType).isRequired,
};

export default Header;
