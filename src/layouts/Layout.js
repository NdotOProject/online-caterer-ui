import ComputerLayout from "./computer/ComputerLayout";
import {HeaderConfig} from "./headers/Header";
import Row from "../components/Row";
import TextInput, {TextInputValidator} from "../components/TextInput";
import Button from "../components/Button";
import Footer from "./footers/Footer";
import SideBar from "./sidebars";

export default function Layout({children}) {

    let LayoutComponent = ComputerLayout;

    const appLogo = "Online Catering";
    const headerContent = (
        <>
            <Row spacing={"15px"}>
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

            </Row>

            <Row style={{position: "absolute", right: "15vw"}}>
                <TextInput
                    label={"Search"}
                    validators={[TextInputValidator.NOT_EMPTY()]}
                    showError={false}
                />

                <Button title={"Sign In"}/>
            </Row>
        </>
    );

    return (
        <LayoutComponent>
            {children}
        </LayoutComponent>
    );
}