import {clsx} from "clsx";

export default class InputLabel {
	static #TYPE_INNER = "inner";
	static #TYPE_OUTER = "outer";

	static #CSS_CLASSES = {
		inputLabel: "",
		inner: "",
		outer: "",
		placeholder: "",
		active: "",
	};

	#type;
	#content;
	#position;
	#className;

	constructor(type, content, position, className) {
		this.type = type;
		this.content = content;
		this.position = position;
		this.className = className;
	}

	getComponent({id, isActive}) {
		const isInner = this.#type === InputLabel.#TYPE_INNER;
		const isOuter = this.#type === InputLabel.#TYPE_OUTER;
		const isPlaceholder = isInner && this.#position === undefined;
		return (
			<label
				htmlFor={id}
				className={clsx({
					[InputLabel.#CSS_CLASSES.inputLabel]: true,
					[InputLabel.#CSS_CLASSES.inner]: isInner,
					[InputLabel.#CSS_CLASSES.outer]: isOuter,
					[this.#position?.className]: (isOuter || isInner) && !isPlaceholder,
					[InputLabel.#CSS_CLASSES.placeholder]: isPlaceholder,
					[InputLabel.#CSS_CLASSES.active]: isActive,
					[this.#className]: this.#className,
				})}
			>
				{this.#content}
			</label>
		);
	}

	static asPlaceholder(content, className) {
		return new InputLabel(
			this.#TYPE_INNER, content, undefined, className);
	}

	static inner(content, position, className) {
		return new InputLabel(
			this.#TYPE_INNER, content, position, className);
	}

	static outer(content, position, className) {
		return new InputLabel(
			this.#TYPE_OUTER, content, position, className);
	}
}