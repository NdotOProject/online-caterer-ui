import clsx from "clsx";

import "./ScrollContainerStyle.scss";

const CssClasses = {
	container: "scroll_container",
	button: "scroll_btn",
};

export default function ScrollContainer({width, height, className, children}) {
	return (
		<div
			className={clsx({
				[CssClasses.container]: true,
				[className]: className,
			})}
			style={{width, height}}
		>
			{children}
		</div>
	);
}
