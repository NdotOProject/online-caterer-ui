import clsx from "clsx";

import {Link} from "react-router-dom";

import styles from "./ButtonStyle.module.scss";

export default function Button(
    {
        type = ButtonType.TEXT,
        disabled = false,
        internalLink,
        externalLink,
        children,
        className,
        title,
        onClick,
        ...props
    }) {
    const componentProps = {title, onClick, ...props};

    if (disabled) {
        Object.keys(componentProps).forEach(key => {
            if (typeof componentProps[key] === "function"
                && key.startsWith("on")) {
                delete componentProps[key];
            }
        });
    }

    let Component;
    if (internalLink) {
        Component = Link;
        componentProps.to = internalLink;
    } else if (externalLink) {
        Component = "a";
        componentProps.href = externalLink;
    } else {
        Component = "button";
    }

    const componentClass = clsx(styles.button_component, {
        [styles[ButtonType.PRIMARY.value]]: type === ButtonType.PRIMARY,
        [styles[ButtonType.OUTLINE.value]]: type === ButtonType.OUTLINE,
        [styles[ButtonType.TEXT.value]]: type === ButtonType.TEXT,
        [styles[ButtonType.ROUNDED.value]]: type === ButtonType.ROUNDED,
        [styles.disabled]: disabled,
        [className]: className,
    });

    if (children === undefined) {
        children = title;
    }

    return (
        <Component className={componentClass} {...componentProps}>
            {children}
        </Component>
    );
}

export class ButtonType {

    constructor(value) {
        this.value = value;
    }

    static PRIMARY = new ButtonType("primary");
    static OUTLINE = new ButtonType("outline");
    static TEXT = new ButtonType("text");
    static ROUNDED = new ButtonType("rounded");
}
