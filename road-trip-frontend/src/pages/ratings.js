import styles from "./styles/index.module.css";
import {Navbar, RatingsTable} from "../components";
import {Footer} from "../containers";
import React, {useEffect} from "react";

const Ratings = () => {
    return (
        <div>
            <div className={styles.wrapper}>
                <div className={styles.gradient__bg}>
                    <Navbar/>
                    <RatingsTable/>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}

export default Ratings