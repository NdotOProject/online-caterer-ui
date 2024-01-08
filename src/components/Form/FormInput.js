import clsx from "clsx";

export default class FormInput {
	static #IDENTITY = "FormInput";

	static #INPUT_TEXT_TYPES = {
		email: "email",
		number: "number",
		password: "password",
		search: "search",
		tel: "tel",
		text: "text",
		url: "url"
	};

	#elements;
	#id;
	#className;
	#validators;

	constructor(
		config = {
			elements: {
				input: {
					type: undefined,
					props: undefined
				},
				label: undefined,
				error: undefined
			},
			id: undefined,
			className: undefined,
			validators: undefined
		}
	) {
		this.#elements = config.elements;
		this.#id = config.id;
		this.#className = config.className;

		if (Array.isArray(config.validators)) {
			this.#validators = config.validators;
		} else {
			this.#validators = config.validators ?? [];
		}
	}

	get id() {
		return this.#id;
	}

	get identity() {
		return FormInput.#IDENTITY;
	}

	static isFormInput(other) {
		return (other?.identity === this.#IDENTITY);
	}

	getComponent(
		{
			activeState = {
				active: false,
				setActive: (value) => {
				}
			},
			errorMessageState = {
				errorMessage: "",
				setErrorMessage: (value) => {
				}
			},
			inputValueState = {
				inputValue: "",
				setInputValue: (value) => {
				}
			}
		}
	) {
		const validateValue = (event) => {
			const newValue = event.target.value;
			if (this.#validators.length > 0) {
				this.#validators.forEach((validator) => {
					const result = validator?.validate(
						newValue, inputValueState.inputValue
					);
					if (result?.isValid) {
						inputValueState.setInputValue(newValue);
						errorMessageState.setErrorMessage("");
					} else {
						errorMessageState.setErrorMessage(result?.message);
					}
				});
			} else {
				inputValueState.setInputValue(newValue);
			}
		};

		const inputProps = this.#elements.input.props;
		const inputId = inputProps.htmlId;

		return (
			<div
				className={clsx({
					[this.#className]: this.#className
				})}
			>
				{this.#elements.label?.getComponent({
					id: inputId,
					isActive: activeState.active,
				})}

				<input
					type={this.#elements.input.type}
					className={clsx({})}
					id={inputId}
					placeholder={inputProps.placeholder}
					value={inputValueState.inputValue}
					onBlur={(event) => {
						validateValue(event);
						if (inputValueState.inputValue.length <= 0) {
							activeState.setActive(false);
						}
					}}
					onFocus={(event) => {
						activeState.setActive(true);
					}}
					onChange={(event) => {
						validateValue(event);
					}}
				/>

				{this.#elements.error?.getComponent(
					errorMessageState.errorMessage
				)}
			</div>
		);
	}

	static text(
		{
			id, validators = [],
			label, error,
			htmlId,
			className,
			placeholder,
			disabled = false,
			readOnly = false,
		}
	) {
		return new FormInput({
			elements: {
				input: {
					type: this.#INPUT_TEXT_TYPES.text,
					props: {
						htmlId,
						placeholder,
						disabled,
						readOnly
					}
				},
				label,
				error
			},
			id,
			className,
			validators
		});
	}

}