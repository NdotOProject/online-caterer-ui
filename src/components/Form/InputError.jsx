import {clsx} from "clsx";

export default class InputError {

    #className;

    constructor({className}) {
        this.#className = className;
    }

    getComponent(content) {
        return (
            <span
                className={clsx({
                    [this.#className]: this.#className,
                })}
            >
                {content}
            </span>
        );
    }
}
