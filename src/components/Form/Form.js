import {useEffect, useState} from "react";
import clsx from "clsx";

import "./FormStyle.scss";
import Button, {ButtonType} from "../Button";
import classes from "../../layouts/customer/CustomerLayoutStyle.module.scss";

const CssClasses = {
	wrapper: "form_container",
};

const INIT_VALUE = "initInputValue";

function InputWrapper({input, bindingValue, submit, setSubmit, setError}) {

	const [active, setActive] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [inputValue, setInputValue] = useState(
		bindingValue(INIT_VALUE) ?? ""
	);

	useEffect(() => {
		if (submit) {
			input.validate(inputValue, {
				activeState: {active, setActive},
				errorMessageState: {errorMessage, setErrorMessage},
				inputValueState: {inputValue, setInputValue},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [submit]);

	useEffect(() => {
		setError(input.id, errorMessage);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [errorMessage]);

	return input.getComponent({
		activeState: {active, setActive},
		errorMessageState: {
			errorMessage,
			setErrorMessage: (value) => {
				setSubmit(!!value);
				setError(input.id, value);
				setErrorMessage(value);
			}
		},
		inputValueState: {
			inputValue: inputValue,
			setInputValue: (value) => {
				setInputValue(value);
				bindingValue(value);
			}
		},
	});
}

function Form(
	{
		acceptCharset,
		action,
		autoComplete,
		encType,
		method,
		name,
		noValidate,
		target,
		onSubmit = (event, object) => {
		},
		className,
		children: inputs,
		formTitle,
		submitButtonType,
		submitButtonClassName,
		submitButtonContent,
		initial,
	}) {

	if (!Array.isArray(inputs)) {
		inputs = [inputs];
	}
	//
	// const isValidInputs = useMemo(() => {
	// 	return inputs.every((child) => {
	// 		return FormInput.isFormInput(child)
	// 	});
	// }, [inputs]);
	//
	// if (!isValidInputs) {
	// 	throw new Error("Form only accept FormInput");
	// }

	const [objectValue, setObjectValue] = useState(initial ?? {});
	const [submit, setSubmit] = useState(false);
	const [error, setError] = useState({});

	return (
		<form
			acceptCharset={acceptCharset}
			action={action}
			autoComplete={autoComplete ? "on" : "off"}
			encType={encType}
			method={method ?? "get"}
			name={name}
			noValidate={noValidate}
			target={target}
			onSubmit={(event) => {
				event.preventDefault();
				if (Object.keys(objectValue).length > 0
					&& Object.keys(error).length === 0
					&& submit) {
					onSubmit(event, objectValue);
				}
			}}
			className={clsx({
				[CssClasses.wrapper]: true,
				[className]: className,
			})}
		>
			{inputs.map((input, index) => {
				const inputId = input.id;
				return (
					<InputWrapper
						key={index}
						input={input}
						bindingValue={(value) => {
							if (value !== INIT_VALUE) {
								setObjectValue({
									...objectValue,
									[inputId]: value
								});
							}
							return objectValue[inputId];
						}}
						submit={submit}
						setSubmit={setSubmit}
						setError={(named, value) => {
							if (value) {
								setError({
									...error,
									[named]: value
								});
							} else {
								delete error[named];
							}
						}}
					/>
				);
			})}
			{formTitle}
			<Button
				type={submitButtonType ?? ButtonType.PRIMARY}
				className={clsx({
					[classes.submit_button]: true,
					[submitButtonClassName]: submitButtonClassName,
				})}
				onClick={() => {
					setSubmit(true);
				}}
			>
				{submitButtonContent}
			</Button>
		</form>
	);
}

export default Form;
