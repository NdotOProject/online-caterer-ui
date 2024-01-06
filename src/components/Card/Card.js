import {memo} from "react";
import clsx from "clsx";

import classes from "./CardStyle.module.scss";

const Card = memo(({className, style, children, ...props}) => (
	<div
		className={clsx({
			[classes.card]: true,
			[className]: className
		})}
		style={style}
		{...props}
	>
		{children}
	</div>
));

export default Card;
