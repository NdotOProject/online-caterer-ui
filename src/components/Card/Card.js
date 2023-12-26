import clsx from "clsx";
import {memo} from "react";

import styles from "./CardStyle.module.scss";

function Card({children}) {
    return (
        <div className={clsx(styles.card_component)}>
            {children}
        </div>
    );
}

export default memo(Card);
