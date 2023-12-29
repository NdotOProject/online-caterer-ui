import './ComputerLayoutStyle.module.scss';

import styles from "./ComputerLayoutStyle.module.scss";
import Row from "../../components/Row/Row";
import Button from "../../components/Button";
import TextInput, {TextInputValidator} from "../../components/TextInput";
import Footer from "../footers/Footer";
import SideBar from "../sidebars";
import Header from "../headers/Header";

function ComputerLayout({children}) {

    return (
        <div className={styles.layout}>
            <Header/>
            {/*<div className={styles.layout_header}>*/}
            {/*    <div className={styles.app_logo}>*/}
            {/*        {"Online Catering"}*/}
            {/*    </div>*/}

            {/*    <Row spacing={"15px"}>*/}
            {/*        <Button externalLink={"#"} title={"Home"}>*/}
            {/*            <span>Home</span>*/}
            {/*        </Button>*/}

            {/*        <Button externalLink={"#"} title={"Menu"}>*/}
            {/*            <span>Menu</span>*/}
            {/*        </Button>*/}

            {/*        <Button externalLink={"#"} title={"Service"}>*/}
            {/*            <span>Service</span>*/}
            {/*        </Button>*/}

            {/*        <Button externalLink={"#"} title={"Contact"}>*/}
            {/*            <span>Contact</span>*/}
            {/*        </Button>*/}

            {/*    </Row>*/}

            {/*    <Row style={{position: "absolute", right: "15vw"}}>*/}
            {/*        <TextInput*/}
            {/*            label={"Search"}*/}
            {/*            validators={[TextInputValidator.NOT_EMPTY()]}*/}
            {/*            showError={false}*/}
            {/*        />*/}

            {/*        <Button title={"Sign In"}/>*/}
            {/*    </Row>*/}
            {/*</div>*/}
            <SideBar/>
            {/*<Footer/>*/}
            <div className={styles.layout_body}>
                {children}
            </div>
        </div>
    );
}

export default ComputerLayout;
