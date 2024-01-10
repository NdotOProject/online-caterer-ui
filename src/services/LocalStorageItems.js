export class LocalStorageItems {

	static get(key) {
		if (typeof window !== "undefined") {
			return JSON.parse(localStorage.getItem(key));
		}
	}

	static set(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	}
}