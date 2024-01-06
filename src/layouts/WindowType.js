export default class WindowType {

	static #CREATION_KEY = "WindowTypeCreationKey";

	constructor(key, type) {
		if (key !== WindowType.#CREATION_KEY) {
			throw new Error("Can't create new instance for WindowType.");
		}
		this.type = type;
	}

	isMobile = () => this.type === "mobile";

	isTablet = () => this.type === "tablet";

	isComputer = () => this.type === "computer";

	static newInstance = () => {
		const width = window.innerWidth;
		if (width <= 426) {
			return new WindowType(WindowType.#CREATION_KEY, "mobile");
		} else if (width > 426 && width <= 769) {
			return new WindowType(WindowType.#CREATION_KEY, "tablet");
		} else {
			return new WindowType(WindowType.#CREATION_KEY, "computer");
		}
	};
}
