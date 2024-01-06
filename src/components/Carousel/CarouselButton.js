import clsx from "clsx";
import classes from "./CarouselStyle.module.scss";
import {AngleLeft, AngleRight} from "../Icons";

export default class CarouselButton {
	static #CREATION_KEY = "CarouselButtonKey";
	value;

	constructor(key, btn) {
		if (key !== CarouselButton.#CREATION_KEY) {
			throw new Error("Can't create new instance of CarouselButton.");
		}
		this.value = btn;
	}

	static none() {
		return new CarouselButton(
			this.#CREATION_KEY,
			undefined
		);
	}

	static next({alwaysShowIcon, color = "var(--black)", btn}) {
		return new CarouselButton(
			this.#CREATION_KEY,
			btn ?? (
				<span
					className={clsx({
						[classes.icon]: true,
						[classes.always_show]: alwaysShowIcon,
					})}
					style={{
						"--Carousel_Button-bg": color,
					}}
				>
					<AngleRight
						height={"50%"}
						width={"80%"}
						color={"var(--white)"}
					/>
				</span>
			)
		);
	}

	static previous({alwaysShowIcon, color = "var(--black)", btn}) {
		return new CarouselButton(
			this.#CREATION_KEY,
			btn ?? (
				<span
					className={clsx({
						[classes.icon]: true,
						[classes.always_show]: alwaysShowIcon,
					})}
					style={{
						"--Carousel_Button-bg": color,
					}}
				>
					<AngleLeft
						height={"50%"}
						width={"80%"}
						color={"var(--white)"}
					/>
				</span>
			)
		);
	}
}