import styles from "./styles/index.module.css";
import {Navbar} from "../components";
import {Footer, ChooseGenre} from "../containers";
import React from "react";

require('dotenv').config();

function ChooseGenre() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.gradient__bg}>
                <Navbar />
                <ChooseGenre />
                <Footer />
            </div>
        </div>
    )
}

export default ChooseGenre