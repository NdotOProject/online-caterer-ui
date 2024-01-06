export default class FlexDirectionType {
	static #CREATION_KEY = "FlexDirectionTypeKey";

	constructor(key, value) {
		if (key !== FlexDirectionType.#CREATION_KEY) {
			throw new Error("Can't create new instance of FlexDirectionType!");
		}
		this.value = value;
	}

	static COL = new FlexDirectionType(
		FlexDirectionType.#CREATION_KEY, "column"
	);

	static ROW = new FlexDirectionType(
		FlexDirectionType.#CREATION_KEY, "row"
	);
}
