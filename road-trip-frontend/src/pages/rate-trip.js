import React from 'react';
import styles from "./styles/index.module.css";
import {Navbar, Rating} from "../components";
import {Footer} from "../containers";
import {useRouter} from "next/router";

require('dotenv').config();

function RateTripPage() {
    const {query, isReady} = useRouter()
    const {tripId} = query

    return (
        <div className={styles.wrapper}>
            <div className={styles.gradient__bg}>
                <Navbar/>
                {isReady ? <Rating tripId={tripId} /> : <div>Loading...</div>}
                <Footer/>
            </div>
        </div>
    )
}

export default RateTripPage