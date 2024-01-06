import {useState} from "react";
import clsx from "clsx";

import classes from "./TextInputStyle.module.scss";

export class TextInputValidator {
	constructor(message, callback) {
		this.message = message;
		this.callback = callback;
	}

	validate(currentValue, prevValue) {
		let testResult;
		if (currentValue === undefined || currentValue === null) {
			testResult = false;
		} else {
			testResult = this.callback(currentValue, prevValue);
		}
		return {
			isValid: testResult,
			message: testResult ? undefined : this.message,
		};
	}

	static notEmpty = (message) => {
		return new TextInputValidator(message,
			(currentValue, prevValue) => {
				if (currentValue === "" && prevValue !== "") {
					return true;
				}
				return currentValue.trim() !== "";
			}
		);
	};

	static numberOnly = (message) => {
		new TextInputValidator(message,
			(currentValue, prevValue) => {

			}
		);
	}
}

export class TextInputType {
	constructor(value) {
		this.value = value;
	}

	static HIDDEN = new TextInputType("hidden");

	static EMAIL = new TextInputType("email");
	static NUMBER = new TextInputType("number");
	static PASSWORD = new TextInputType("password");
	static SEARCH = new TextInputType("search");
	static TEL = new TextInputType("tel");
	static TEXT = new TextInputType("text");
	static URL = new TextInputType("url");
}

export default function TextInput(
	{
		type = TextInputType.TEXT,
		validators = [],
		showError = true,
		label,
		id,
		className,
		inputClassName,
		messageClassName,
		labelClassName,
		pattern,
		placeholder,
		disabled = false,
		readOnly = false,
		...props
	}) {

	const [inputValue, setInputValue] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [labelTop, setLabelTop] = useState(false);

	const textInputClasses = clsx(classes.text_input_component, {
		[className]: className
	});

	let labelClasses = {
		[classes.input_label]: true,
		[labelClassName]: labelClassName,
		[classes.label_top]: labelTop
	};

	const inputProps = {
		id, pattern, placeholder,
		disabled, readOnly,
		...props
	};

	const inputClasses = clsx({
		[classes.form_input]: true,
		[inputClassName]: inputClassName
	});

	const errorMessageClasses = clsx({
		[classes.error_text]: true,
		[messageClassName]: messageClassName
	});

	const validateValue = (e) => {
		const currentValue = e.target.value;
		if (validators.length > 0) {
			validators.forEach((validator) => {
				const result = validator.validate(currentValue, inputValue);
				if (result.isValid) {
					setInputValue(currentValue);
					setErrorMessage("");
				} else {
					setErrorMessage(result.message);
				}
			});
		} else {
			setInputValue(currentValue);
		}
	};

	const handleOnChange = (e) => {
		validateValue(e);
	}

	const handleOnBlur = (e) => {
		validateValue(e);
		if (inputValue.length <= 0) {
			setLabelTop(false);
		}
	}

	const handleFocus = () => {
		setLabelTop(true);
	}

	return (
		<div className={textInputClasses}>
			{label &&
				<label
					htmlFor={id}
					className={clsx(labelClasses)}
				>
					{label}
				</label>
			}

			<input
				type={type.value}
				className={inputClasses}
				value={inputValue}
				onBlur={handleOnBlur}
				onFocus={handleFocus}
				onChange={handleOnChange}
				{...inputProps}
			/>

			{showError &&
				<span className={errorMessageClasses}>
                    {errorMessage}
                </span>
			}
		</div>
	);
}
