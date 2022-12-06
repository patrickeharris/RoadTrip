import React from "react";
import {Navbar} from "../components";
import {Footer, ViewPlaylist} from "../containers";
import styles from "./styles/index.module.css";

require('dotenv').config();

function ViewPlaylistPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.gradient__bg}>
                <Navbar />
                <ViewPlaylist />
                <Footer />
            </div>
        </div>
    )
}

export default ViewPlaylistPage