import {useState} from "react";
import clsx from "clsx";

import classes from "./TextInputStyle.module.scss";

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
	const [isInputActive, setIsInputActive] = useState(false);

	const inputProps = {
		id, pattern, placeholder,
		disabled, readOnly,
		...props
	};

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
			setIsInputActive(false);
		}
	}

	const handleFocus = () => {
		setIsInputActive(true);
		setLabelTop(true);
	}

	return (
		<div
			className={clsx({
				[classes.text_input]: true,
				[className]: className
			})}
		>
			<div
				className={clsx({
					[classes.input_container]: true,
				})}
			>
				{label &&
					<label
						htmlFor={id}
						className={clsx({
							[classes.input_label]: true,
							[labelClassName]: labelClassName,
							[classes.label_top]: labelTop
						})}
					>
						{label}
					</label>
				}

				<input
					type={type.value}
					className={clsx({
						[classes.form_input]: true,
						[classes.active]: isInputActive,
						[inputClassName]: inputClassName
					})}
					placeholder={"Search"}
					value={inputValue}
					onBlur={handleOnBlur}
					onFocus={handleFocus}
					onChange={handleOnChange}
					{...inputProps}
				/>
			</div>

			{showError &&
				<span
					className={clsx({
						[classes.error_text]: true,
						[messageClassName]: messageClassName
					})}
				>
                    {errorMessage}
                </span>
			}
		</div>
	);
}
