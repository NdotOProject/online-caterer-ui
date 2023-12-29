import {memo} from "react";

import styles from "./HeaderStyle.module.scss";
import Row from "../../components/Row/Row";
import Button from "../../components/Button";
import TextInput, {TextInputValidator} from "../../components/TextInput";
import clsx from "clsx";
import WindowType from "../WindowType";

function Header(
    {}) {

    const headerClass = clsx(styles.header_component, {});

    const centerContentClass = clsx({});

    const rightContentClass = clsx(styles.right_content, {});

    const windowType = WindowType.getType();

    const logoClass = clsx(styles.app_logo, styles[windowType.type], {});

    return (
        <Row
            spacing={"50px"}
            className={headerClass}
        >
            <div className={logoClass}>
                <Button className={styles.logo_child} externalLink={"/"}>
                    Online Catering
                </Button>
            </div>

            {windowType.isComputer() &&
                <Row className={centerContentClass} spacing={"15px"}>
                    <Button externalLink={"#"} title={"Home"}>
                        <span>Home</span>
                    </Button>

                    <Button externalLink={"#"} title={"Menu"}>
                        <span>Menu</span>
                    </Button>

                    <Button externalLink={"#"} title={"Service"}>
                        <span>Service</span>
                    </Button>

                    <Button externalLink={"#"} title={"Contact"}>
                        <span>Contact</span>
                    </Button>

                </Row>}

            {!windowType.isMobile() &&
                <Row className={rightContentClass}>
                    <TextInput
                        label={"Search"}
                        validators={[TextInputValidator.NOT_EMPTY()]}
                        showError={false}
                    />

                    <Button title={"Sign In"}/>
                </Row>}
        </Row>
    );
}

export class HeaderConfig {
    constructor(logo, content) {
        this.logo = logo;
        this.content = content;
    }
}

export default memo(Header);
