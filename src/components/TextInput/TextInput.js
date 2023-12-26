import {useState} from "react";
import clsx from "clsx";

import styles from "./TextInputStyle.module.scss";

export default function TextInput(
    {
        type = TextInputType.TEXT,
        validators = [],// [TextInputValidator.NOT_EMPTY("Empty input")],
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

    const inputProps = {
        id, pattern, placeholder,
        disabled, readOnly,
        ...props
    };

    const componentClass = clsx(styles.text_input_component, {
        [className]: className
    });

    let labelClass = {
        [styles.input_label]: true,
        [labelClassName]: labelClassName,
        [styles.label_top]: labelTop,
    };

    const inputClass = clsx(styles.form_input, {
        [inputClassName]: inputClassName,
    });

    const errorMessageClass = clsx(styles.error_text, {
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
        <div className={componentClass}>
            {label &&
                <label
                    className={clsx(labelClass)}
                    htmlFor={id}>
                    {label}
                </label>}
            <input
                className={inputClass}
                type={type.value}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                onFocus={handleFocus}
                value={inputValue}
                {...inputProps}
            />
            {showError &&
                <span className={errorMessageClass}>
                    {errorMessage}
                </span>}
        </div>
    );
}

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

    static NOT_EMPTY = (message) => {
        return new TextInputValidator(message,
            (currentValue, prevValue) => {
                if (currentValue === "" && prevValue !== "") {
                    return true;
                }
                return currentValue.trim() !== "";
            }
        );
    };

    static NUMBER_ONLY = (message) => {
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
