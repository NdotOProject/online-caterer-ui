export default class NavigatorPosition {
	static #CREATION_KEY = "SectionPositionKey";

	constructor(key, value) {
		if (key !== NavigatorPosition.#CREATION_KEY) {
			throw new Error(
				"Can't create new instance of NavigatorPosition."
			);
		}
		this.position = value;
	}

	static TOP = new NavigatorPosition(
		NavigatorPosition.#CREATION_KEY, "top"
	);
	static BOTTOM = new NavigatorPosition(
		NavigatorPosition.#CREATION_KEY, "bottom"
	);
	static LEFT = new NavigatorPosition(
		NavigatorPosition.#CREATION_KEY, "left"
	);
	static RIGHT = new NavigatorPosition(
		NavigatorPosition.#CREATION_KEY, "right"
	);
}
