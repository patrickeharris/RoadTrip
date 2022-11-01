import styles from "./styles/index.module.css";
import {Navbar} from "../components";
import {Footer, Profile} from "../containers";
import React from "react";

require('dotenv').config();

function AddPlaylist() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.gradient__bg}>
                <Navbar />
                <Footer />
            </div>
        </div>
    )
}

export default AddPlaylist