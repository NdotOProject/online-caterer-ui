export class InputValidator {
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
		return new InputValidator(message,
			(currentValue, prevValue) => {
				if (currentValue === "" && prevValue !== "") {
					return true;
				}
				return currentValue.trim() !== "";
			}
		);
	};

	static numberOnly = (message) => {
		new InputValidator(message,
			(currentValue, prevValue) => {

			}
		);
	}
}