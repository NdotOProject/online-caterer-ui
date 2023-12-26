import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.scss';
import ComputerLayout from "./layouts/computer/ComputerLayout";
import Footer from "./layouts/footers/Footer";
import Column from "./components/Column";
import Row from "./components/Row";
import Card from "./components/Card";
import {HeaderConfig} from "./layouts/headers/Header";
import Layout from "./layouts/Layout";
import Button from "./components/Button/Button";

function App() {

    document.title = "Online Catering";

    return (
        <>
            <Layout>
            </Layout>
        </>
    );
}

export default App;
