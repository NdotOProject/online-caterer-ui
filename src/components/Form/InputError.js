import {clsx} from "clsx";

const CssClasses = {
	errorMessage: "error_message",
};

export default class InputError {

	#className;
	#showWhileTyping;

	constructor({className, showWhileTyping}) {
		this.#className = className;
		this.#showWhileTyping = showWhileTyping;
	}

	showWhileTyping() {
		return this.#showWhileTyping;
	}

	getComponent(content) {
		return (
			<span
				className={clsx({
					[CssClasses.errorMessage]: true,
					[this.#className]: this.#className,
				})}
			>
	            {content}
	        </span>
		);
	}
}
