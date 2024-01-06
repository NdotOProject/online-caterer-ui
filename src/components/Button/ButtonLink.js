export default class ButtonLink {
	static #INTERNAL_LINK = "internalLink";
	static #EXTERNAL_LINK = "externalLink";
	static #CREATION_KEY = "ButtonLinkKey";

	#type;

	constructor(key, type, link) {
		if (key !== ButtonLink.#CREATION_KEY) {
			throw new Error("Can't create new instance of ButtonLink");
		}

		if (!link) {
			throw new Error("link is null or undefined.");
		}

		if (typeof link !== "string") {
			throw new Error("link must is an string.");
		}

		this.#type = type;
		this.value = link;
	}

	isInternalLink = () => this.#type === ButtonLink.#INTERNAL_LINK;
	isExternalLink = () => this.#type === ButtonLink.#EXTERNAL_LINK;

	static internal = (link) => new ButtonLink(
		ButtonLink.#CREATION_KEY,
		ButtonLink.#INTERNAL_LINK,
		link
	);

	static external = (link) => new ButtonLink(
		ButtonLink.#CREATION_KEY,
		ButtonLink.#EXTERNAL_LINK,
		link
	);
}
