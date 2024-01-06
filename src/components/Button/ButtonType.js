export default class ButtonType {
	constructor(value) {
		this.value = value;
	}

	static TEXT = new ButtonType("text");
	static PRIMARY = new ButtonType("primary");
	static OUTLINE = new ButtonType("outline");
}
