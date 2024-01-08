import FormInput from "./FormInput";
import {useMemo, useState} from "react";

const INIT_VALUE = "initInputValue";

function InputWrapper({input, bindingValue}) {

	const [active, setActive] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [inputValue, setInputValue] = useState(
		bindingValue(INIT_VALUE) ?? ""
	);

	return input.getComponent({
		activeState: {active, setActive},
		errorMessageState: {errorMessage, setErrorMessage},
		inputValueState: {
			inputValue: inputValue,
			setInputValue: (value) => {
				setInputValue(value);
				bindingValue(value);
			}
		}
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
		onSubmit,
		initial,
		children: inputs,
	}) {

	if (!Array.isArray(inputs)) {
		inputs = [inputs];
	}

	const isValidInputs = useMemo(() => {
		return inputs.every((child) => {
			return FormInput.isFormInput(child)
		});
	}, [inputs]);

	if (!isValidInputs) {
		throw new Error("Form only accept FormInput");
	}

	const [objectValue, setObjectValue] = useState(initial ?? {});

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
			onSubmit={onSubmit}
		>
			{inputs.map((input, index) => {
				const inputId = input.id;
				return (
					<InputWrapper
						key={index}
						input={input}
						bindingValue={
							(value) => {
								if (value !== INIT_VALUE) {
									setObjectValue({
										...objectValue,
										[inputId]: value
									});
								}
								return objectValue[inputId];
							}
						}
					/>
				);
			})}
		</form>
	);
}

export default Form;
