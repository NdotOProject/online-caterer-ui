import {memo} from "react";

import styles from "./HeaderStyle.module.scss";

function Header({config = new HeaderConfig()}) {
    return (
        <div className={styles.header_component}>
            <div className={styles.app_logo}>
                {config.logo}
            </div>

            <div className={styles.header_content}>
                {config.content}
            </div>
        </div>
    );
}

export class HeaderConfig {
    constructor(logo, content) {
        this.logo = logo;
        this.content = content;
    }
}

export default memo(Header);
