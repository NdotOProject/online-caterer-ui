import {memo} from "react";
import clsx from "clsx";

import Button from "../../components/Button";

import styles from "./SideBar.module.scss";
import Card from "../../components/Card";
import {Column} from "../../components/ListView";

function SideBarItem(
    {
        className,
        title,
        internalLink,
        externalLink,
        ...props
    }) {

    const classes = clsx(styles.side_bar_item, {
        [className]: className,
    });

    const componentProps = {
        ...props
    };

    return (
        <Card>
            <Button className={classes} {...componentProps}>
                {title}
            </Button>
        </Card>
    );
}

function SideBar(
    {
        className,
        itemModels = [
            {
                title: "Item 1",
                externalLink: ""
            },
            {
                title: "Item 2",
                externalLink: ""
            }
        ],
    }) {

    const componentClass = clsx(styles.side_bar_component, {
        [className]: className,
    });

    return (
        <Column
            className={componentClass}
            spacing={"5px"}
        >
            {itemModels.map((model, index) => (
                <SideBarItem key={index} {...model} />
            ))}
        </Column>
    );
}

export default memo(SideBar);