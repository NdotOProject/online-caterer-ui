import clsx from "clsx";

import {Column, Item, Row} from "../ListView";
import ComponentKeyProvider from "../ComponentKeyProvider";
import NavigatorStyle from "./NavigatorStyle";
import NavigatorPosition from "./NavigatorPosition";

import classes from "./CarouselStyle.module.scss";

export default class CarouselNavigator {
	#key;
	#innerKey;
	#isNone = false;
	#position;
	#length;
	#visible;
	#style;

	constructor(
		{
			length = 5,
			position = NavigatorPosition.BOTTOM,
			visible = true,
			style = NavigatorStyle.CONTENT(),
		}) {
		this.#key = ComponentKeyProvider.getKey(
			`CarouselNavigator_${position.position}_${length}`
		);
		this.#innerKey = `${this.#key}_inner`;
		this.#length = length;
		this.#position = position;
		this.#visible = visible;
		this.#style = style;
	}

	static none() {
		const result = new CarouselNavigator({});
		result.#isNone = true;
		return result;
	}

	get position() {
		return this.#position;
	}

	getNavigatorContent({active = 0, handleClick, children}) {
		if (this.#isNone) {
			return undefined;
		}

		if (this.#style.isOverrideContent
			&& this.#style.content) {
			children = this.#style.content;
		}

		if (!Array.isArray(children)) {
			children = [children];
		}

		let Wrapper;
		switch (this.position) {
			case NavigatorPosition.LEFT:
			case NavigatorPosition.RIGHT:
				Wrapper = Column;
				break;
			case NavigatorPosition.TOP:
			case NavigatorPosition.BOTTOM:
			default:
				Wrapper = Row;
				break;
		}

		return (
			<Item
				key={this.#key}
				visible={this.#visible}
				className={clsx({
					[classes.carousel__navigator]: true,
					[classes["carousel__navigator--inner"]]: this.#style.isInner,
				})}
			>
				<Wrapper
					key={this.#innerKey}
					className={clsx({
						[classes.navigator_inner]: true,
					})}
				>
					{children.map((child, index) => {
						const itemClasses = clsx({
							[classes.navigator_inner_content]: true,
							[classes[`navigator_${this.#style.value}--active`]]: active === index,
							[classes.navigator_inner_dot]: this.#style.isDot,
						});
						return (
							<Item
								key={`${this.#innerKey}__${index}`}
								visible={index < this.#length}
								className={itemClasses}
								onClick={() => {
									handleClick(index);
								}}
							>
								{child}
							</Item>
						);
					})}
				</Wrapper>
			</Item>
		);
	}
}
