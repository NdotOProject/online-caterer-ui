import {memo} from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import Button, {ButtonLink} from "../../components/Button";
import Card from "../../components/Card";
import {Item, Row} from "../../components/ListView";
import WindowType from "../WindowType";

import classes from "./HeaderStyle.module.scss";

const Header = memo(
	({windowType, middle, right, className}) => {

		return (
			<Card
				className={clsx({
					[classes.header]: true,
					[className]: className,
				})}
			>
				<Row>
					<Item
						flex={1}
						className={clsx({
							[classes.logo_container]: true,
							[classes.mobile]: windowType.isMobile
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
						flex={2}
						visible={windowType.isComputer}
					>
						{middle}
					</Item>

					<Item
						flex={1}
						visible={
							windowType.isComputer
							|| windowType.isTablet
						}
					>
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
