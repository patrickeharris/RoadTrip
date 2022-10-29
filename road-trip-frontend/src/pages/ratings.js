import {useRouter} from 'next/router'
import styles from "./styles/index.module.css";
import {Navbar, RatingsTable} from "../components";
import {Footer} from "../containers";
import React from "react";

const Ratings = () => {
    const router = useRouter();
    const {tripId} = router.query

    return (
        <div>
            <div className={styles.wrapper}>
                <div className={styles.gradient__bg}>
                    <Navbar/>
                    <RatingsTable tripId={tripId}/>
                    <Footer/>
                </div>
            </div>
        </div>
    )
}

export default Ratings