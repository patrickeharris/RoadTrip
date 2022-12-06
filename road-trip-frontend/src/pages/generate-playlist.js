import styles from "./styles/index.module.css";
import {Navbar} from "../components";
import {Footer, Playlist} from "../containers";
import React from "react";

require('dotenv').config();

function PlaylistPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.gradient__bg}>
                <Navbar />
                <Playlist />
                <Footer />
            </div>
        </div>
    )
}

export default PlaylistPage