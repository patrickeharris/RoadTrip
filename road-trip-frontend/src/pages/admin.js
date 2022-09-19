import React from 'react';
import Link from '@material-ui/core/Link';
import styles from "./styles/index.module.css";
import {Navbar} from "../components";
import {Footer, Login} from "../containers";

require('dotenv').config();

function AdminPage() {
    return (

        <div className={styles.wrapper}>
            <div className={styles.gradient__bg}>
                <Navbar />
                <div className={styles.white__txt}>
                    This is the admin console page!
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default AdminPage