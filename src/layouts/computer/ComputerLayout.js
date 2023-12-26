import './ComputerLayoutStyle.module.scss';

import Header, {HeaderConfig} from "../headers/Header";

import styles from "./ComputerLayoutStyle.module.scss";

function ComputerLayout(
    {
        children,
        headerConfig = new HeaderConfig(),
        footer,
        leftBar,
        rightBar,
    }) {

    return (
        <div className={styles.layout}>
            <div className={styles.layout_header}>
                <Header config={headerConfig}/>
            </div>

            <div className={styles.layout_footer}>
                {footer}
            </div>

            <div className={styles.layout_left_bar}>
                {leftBar}
            </div>

            <div className={styles.layout_right_bar}>
                {rightBar}
            </div>

            <div className={styles.layout_body}>
                {children}
            </div>
        </div>
    );
}

export default ComputerLayout;
