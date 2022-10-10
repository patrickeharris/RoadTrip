import React from 'react';
import styles from "./styles/index.module.css";
import {Navbar, Rating} from "../components";
import {Footer} from "../containers";

require('dotenv').config();

function RateTripPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.gradient__bg}>
                <Navbar/>
                <Rating/>
                <Footer/>
            </div>
        </div>
    )
}

export default RateTripPage