import {memo} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";

import ButtonLink from "./ButtonLink";
import ButtonType from "./ButtonType";

import classes from "./ButtonStyle.module.scss";

const Button = memo(
	({
		 type = ButtonType.TEXT,
		 link,
		 rounded = false,
		 disabled = false,
		 content, children,
		 className, style,
		 onClick,
		 ...props
	 }) => {

		const buttonProps = {content, onClick, style, ...props};

		if (disabled) {
			Object.keys(buttonProps).forEach((key) => {
				if (typeof buttonProps[key] === "function"
					&& key.startsWith("on")) {
					delete buttonProps[key];
				}
			});
		}

		let Wrapper;
		if (link && link.isInternalLink()) {
			Wrapper = Link;
			buttonProps.to = link.value;
		} else if (link && link.isExternalLink()) {
			Wrapper = "a";
			buttonProps.href = link.value;
		} else {
			Wrapper = "button";
		}

		return (
			<Wrapper
				className={clsx({
					[classes.button]: true,
					[classes[`button_${type.value}`]]: true,
					[classes["button--disabled"]]: disabled,
					[classes["button--rounded"]]: rounded,
					[className]: className
				})}
				{...buttonProps}
			>
				{children ?? content}
			</Wrapper>
		);
	}
);

Button.propTypes = {
	type: PropTypes.instanceOf(ButtonType),
	link: PropTypes.instanceOf(ButtonLink),
	content: PropTypes.string,
};

export default Button;
