export class InputValidator {
	#message;
	#callback;

	constructor(message, callback) {
		this.#message = message;
		this.#callback = callback;
	}

	validate(newValue, oldValue) {
		let testResult;
		if (newValue === undefined || newValue === null) {
			testResult = false;
		} else {
			testResult = this.#callback(newValue, oldValue);
		}
		return {
			isValid: testResult,
			message: testResult ? undefined : this.#message,
		};
	}

	static notEmpty(message) {
		return new InputValidator(message,
			(newValue, oldValue) => {
				if (newValue === "" && oldValue !== "") {
					return true;
				}
				return newValue.trim() !== "";
			}
		);
	};

	static emailFormat(message) {
		return new InputValidator(message,
			(newValue, oldValue) => {
				const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
				return regex.test(newValue);
			}
		);
	}

	static numberOnly(message) {
		return new InputValidator(message,
			(newValue, oldValue) => {

			}
		);
	}
}