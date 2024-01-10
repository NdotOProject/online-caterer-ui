import {clsx} from "clsx";

const CssClasses = {
	label: "form_label",
	inner: "inner",
	outer: "outer",
	placeholder: "placeholder",
	active: "active",
};

export default class InputLabel {
	static #TYPE_INNER = "inner";
	static #TYPE_OUTER = "outer";

	#type;
	#content;
	#position;
	#className;

	constructor(type, content, position, className) {
		this.#type = type;
		this.#content = content;
		this.#position = position;
		this.#className = className;
	}

	getComponent({id, isActive}) {
		const isInner = this.#type === InputLabel.#TYPE_INNER;
		const isOuter = this.#type === InputLabel.#TYPE_OUTER;
		const isPlaceholder = isInner && this.#position === undefined;
		return (
			<label
				htmlFor={id}
				className={clsx({
					[CssClasses.label]: true,
					[CssClasses.inner]: isInner,
					[CssClasses.outer]: isOuter,
					[this.#position?.className]: (
						(isOuter || isInner) && !isPlaceholder
					),
					[CssClasses.placeholder]: isPlaceholder,
					[CssClasses.active]: isActive,
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
