export default class NavigatorStyle {
	static #CREATION_KEY = "NavigatorStyleKey";
	static #DOT = "dot";
	static #DASH = "dash";
	static #CONTENT = "content";
	static #OVERRIDE_CONTENT = "override_content";

	#value;
	#content;
	#inner;

	constructor(key, value, content, inner) {
		if (key !== NavigatorStyle.#CREATION_KEY) {
			throw new Error("Can't create new instance for NavigatorStyle");
		}
		this.#value = value;
		this.#content = content;
		this.#inner = inner;
	}

	get value() {
		return this.#value;
	}

	get content() {
		return this.#content;
	}

	get isInner() {
		return this.#inner;
	}

	get isDot() {
		return this.#value === NavigatorStyle.#DOT;
	}

	get isDash() {
		return this.#value === NavigatorStyle.#DASH;
	}

	get isContent() {
		return this.#value === NavigatorStyle.#CONTENT;
	}

	get isOverrideContent() {
		return this.#value === NavigatorStyle.#OVERRIDE_CONTENT;
	}

	static DOT = (inner) => {
		return new NavigatorStyle(
			NavigatorStyle.#CREATION_KEY,
			NavigatorStyle.#DOT,
			undefined, inner
		);
	};

	static DASH = (inner) => {
		return new NavigatorStyle(
			NavigatorStyle.#CREATION_KEY,
			NavigatorStyle.#DASH,
			undefined, inner
		);
	};

	static CONTENT = () => {
		return new NavigatorStyle(
			NavigatorStyle.#CREATION_KEY,
			NavigatorStyle.#CONTENT,
			undefined, false
		);
	};

	static OVERRIDE_CONTENT = (content) => {
		if (!Array.isArray(content)) {
			content = [content];
		}
		return new NavigatorStyle(
			NavigatorStyle.#CREATION_KEY,
			NavigatorStyle.#OVERRIDE_CONTENT,
			content, false
		);
	};
}
