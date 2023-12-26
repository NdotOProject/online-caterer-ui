import {memo} from "react";
import clsx from "clsx";

import styles from "./SideBar.module.scss";

function SideBar() {

    const componentClass = clsx(styles.side_bar_component, {});

    return (
        <div className={componentClass}>
            Side Bar
        </div>
    );
}

export default memo(SideBar);