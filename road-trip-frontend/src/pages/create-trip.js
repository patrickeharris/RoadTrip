import React from 'react';
import Link from '@material-ui/core/Link';
import styles from "./styles/index.module.css";
import {Navbar} from "../components";
import {CreateTrip, Footer} from "../containers";

require('dotenv').config();

function CreateTripPage() {
    return (

        <div className={styles.wrapper}>
            <div className={styles.gradient__bg}>
                <Navbar />
                <CreateTrip />
                <Footer />
            </div>
        </div>
    )
}

export default CreateTripPage