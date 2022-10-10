import React from 'react';
import Link from '@material-ui/core/Link';
import styles from "./styles/index.module.css";
import {Navbar} from "../components";
import {Footer, EditTrip} from "../containers";

require('dotenv').config();

function EditTripPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.gradient__bg}>
                <Navbar />
                <EditTrip />
                <Footer />
            </div>
        </div>
    )
}

export default EditTripPage