import styles from "./styles/index.module.css";
import {Navbar, AddAPlaylist} from "../components";
import {Footer} from "../containers";
import React from "react";

require('dotenv').config();

function AddPlaylist() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.gradient__bg}>
                <Navbar />
                <AddAPlaylist />
                <Footer />
            </div>
        </div>
    )
}

export default AddPlaylist