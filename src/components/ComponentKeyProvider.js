export default class ComponentKeyProvider {

	static #KEYS_GENERATED = [];
	static #CHARS =
		"abcdefghijklmnopqrstuvwxyz" +
		"ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
		"1234567890" +
		"`~!@#$%^&*-_+=,<.>/?";


	static #randomString(length) {
		let result = "";
		for (let i = 0; i < length; i++) {
			const index = Math.floor(
				Math.random() * this.#CHARS.length
			);
			result += this.#CHARS[index];
		}
		return result;
	}

	static getKey(keyPrefix) {
		const keySuffix = this.#randomString(15);

		let key;
		if (keyPrefix) {
			key = `${keyPrefix}_${keySuffix}`;
		} else {
			key = keySuffix;
		}

		if (this.#KEYS_GENERATED.includes(key)) {
			return this.getKey(keyPrefix);
		} else {
			this.#KEYS_GENERATED = [...this.#KEYS_GENERATED, key];
			return key;
		}
	}
}