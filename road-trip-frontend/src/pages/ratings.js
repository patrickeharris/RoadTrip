import {useRouter} from 'next/router'
import styles from "./styles/index.module.css";
import {Navbar, RatingsTable} from "../components";
import {Footer} from "../containers";
import React, {useEffect} from "react";

const Ratings = () => {
    const {query, isReady} = useRouter();
    const {tripId} = query

    return (
        <div>
            <div className={styles.wrapper}>
                <div className={styles.gradient__bg}>
                    <Navbar/>
                    {isReady ? <RatingsTable tripId={tripId}/> : <div>Loading...</div>}
                    <Footer/>
                </div>
            </div>
        </div>
    )
}

export default Ratings