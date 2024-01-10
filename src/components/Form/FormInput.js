import clsx from "clsx";
import {useMemo, useRef} from "react";
import ComponentKeyProvider from "../ComponentKeyProvider";

const CssClasses = {
	container: "input_container",
	input: "form_input",
	active: "active",
};

const INPUT_TEXT_TYPES = {
	email: "email",
	number: "number",
	password: "password",
	search: "search",
	tel: "tel",
	text: "text",
	url: "url"
};

const INPUT_SELECT_TYPES = {
	dropdown: "select",
};

export default class FormInput {
	static #IDENTITY = "FormInput";

	#inputType;
	#input;
	#label;
	#error;
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
		this.#id = config.id;
		this.#className = config.className;

		this.#input = config.elements.input;
		this.#inputType = config.elements.input.type;
		this.#label = config.elements.label;
		this.#error = config.elements.error;

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

	validate(newValue, {
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
		},
	}) {
		if (this.#validators.length > 0) {
			let errorMessages = [];
			const isValid = this.#validators.every((validator) => {
				const result = validator?.validate(
					newValue, inputValueState.inputValue
				);
				if (result?.isValid) {
					return true;
				} else {
					errorMessages = [
						...errorMessages,
						result?.message
					];
					return false;
				}
			});

			inputValueState.setInputValue(newValue);
			if (isValid) {
				errorMessageState.setErrorMessage("");
			} else {
				errorMessageState.setErrorMessage(errorMessages);
			}
		} else {
			inputValueState.setInputValue(newValue);
		}
	}

	input({activeState, inputValueState, errorMessageState, validateValue,}) {

		const inputProps = this.#input.props;

		if (this.#inputType === INPUT_SELECT_TYPES.dropdown) {
			return (
				<DropdownMenu
					id={inputProps.htmlId}
					initValue={inputProps.initValue}
					activeState={activeState}
					inputValueState={inputValueState}
					setErrorMessage={errorMessageState.setErrorMessage}
					validateValue={validateValue}
				>
					{inputProps.items}
				</DropdownMenu>
			);
		} else if (this.#inputType === INPUT_TEXT_TYPES.text) {
			return (
				<TextInput
					id={inputProps.htmlId}
					placeholder={inputProps.placeholder}
					setErrorMessage={errorMessageState.setErrorMessage}
					validateValue={validateValue}
					showErrorWhileTyping={
						this.#error?.showWhileTyping()
					}
					activeState={activeState}
					inputValueState={inputValueState}
				/>
			);
		}

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
			},
		}
	) {
		const validateValue = (newValue) => {
			this.validate(newValue, {
				activeState, inputValueState, errorMessageState
			});
		}

		const inputProps = this.#input.props;

		return (
			<div
				className={clsx({
					[CssClasses.container]: true,
					[this.#className]: this.#className,
				})}
			>
				{this.#label?.getComponent({
					id: inputProps.htmlId,
					isActive: activeState.active,
				})}

				{this.input({
					activeState,
					inputValueState,
					errorMessageState,
					validateValue,
				})}

				{this.#error?.getComponent(
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
					type: INPUT_TEXT_TYPES.text,
					props: {
						htmlId,
						placeholder,
						disabled,
						readOnly
					}
				},
				label,
				error,
			},
			id,
			className,
			validators,
		});
	}

	static dropdown(
		{
			id, validators = [],
			label, error,
			htmlId,
			className,
			items,
			initValue,
		}
	) {
		return new FormInput({
			elements: {
				input: {
					type: INPUT_SELECT_TYPES.dropdown,
					props: {
						htmlId,
						initValue,
						items,
					}
				},
				label,
				error,
			},
			id: id,
			className: className,
			validators: validators,
		});
	}
}

function TextInput(
	{
		id,
		placeholder,
		validateValue,
		showErrorWhileTyping,
		activeState,
		setErrorMessage,
		inputValueState,
	}
) {
	return (
		<input
			type={"text"}
			id={id}
			className={clsx({
				[CssClasses.input]: true,
				[CssClasses.active]: activeState.active,
			})}
			placeholder={placeholder}
			value={inputValueState.inputValue}
			onBlur={(event) => {
				validateValue(event.target.value);
				if (inputValueState.inputValue.length <= 0) {
					activeState.setActive(false);
				}
			}}
			onFocus={() => {
				activeState.setActive(true);
			}}
			onChange={(event) => {
				if (showErrorWhileTyping) {
					validateValue(event.target.value);
				} else {
					inputValueState.setInputValue(event.target.value);
					setErrorMessage("");
				}
			}}
		/>
	);
}

function DropdownMenu(
	{
		id,
		validateValue,
		children,
		initValue,
		activeState,
		setErrorMessage,
		inputValueState,
	}
) {
	if (!Array.isArray(children)) {
		children = children ? [children] : [];
	}

	const firstRender = useRef(true);

	const menuKey = useMemo(() => {
		return ComponentKeyProvider.getKey("DropdownMenu");
	}, []);

	if (firstRender && initValue === undefined && children.length > 0) {
		initValue = children[0].props?.value;
		firstRender.current = false;
	}

	return (
		<select
			key={menuKey}
			id={id}
			className={clsx({
				[CssClasses.input]: true,
			})}
			onChange={(event) => {
				inputValueState.setInputValue(event.target.value);
			}}
			// defaultValue={initValue}
			value={inputValueState.inputValue ?? initValue}
		>
			{children.map((item, index) => {
				// const value = item.props.value;
				return (
					<DropdownItem
						key={item.key ?? `${menuKey}_Item--${index}`}
						// selected={item.props.selected ?? value === initValue}
						{...item.props}
					>
						{item.props?.children}
					</DropdownItem>
				);
			})}
		</select>
	);
}

export function DropdownItem(
	{
		value,
		children,
		className,
		label,
		disabled = false,
		// selected = false,
		...props
	}
) {
	return (
		<option
			value={value}
			label={label}
			className={clsx({
				[className]: className,
			})}
			disabled={disabled}
			// selected={selected}
			{...props}
		>
			{children}
		</option>
	);
}

// const validateValue = (newValue) => {
// 	if (this.#validators.length > 0) {
// 		let errorMessages = [];
// 		const isValid = this.#validators.every((validator) => {
// 			const result = validator?.validate(
// 				newValue, inputValueState.inputValue
// 			);
// 			if (result?.isValid) {
// 				return true;
// 			} else {
// 				errorMessages = [
// 					...errorMessages,
// 					result?.message
// 				];
// 				return false;
// 			}
// 		});
//
// 		inputValueState.setInputValue(newValue);
// 		if (isValid) {
// 			errorMessageState.setErrorMessage("");
// 		} else {
// 			errorMessageState.setErrorMessage(errorMessages);
// 		}
// 		// this.#validators.forEach((validator) => {
// 		// 	const result = validator?.validate(
// 		// 		newValue, inputValueState.inputValue
// 		// 	);
// 		// 	if (result?.isValid) {
// 		// 		inputValueState.setInputValue(newValue);
// 		// 		errorMessageState.setErrorMessage("");
// 		// 	} else {
// 		// 		errorMessageState.setErrorMessage(result?.message);
// 		// 	}
// 		// });
// 	} else {
// 		inputValueState.setInputValue(newValue);
// 	}
// };
