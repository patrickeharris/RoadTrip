import React from 'react';
import styles from './styles/index.module.css';
import {Navbar} from "../components";
import {Footer, Notification} from "../containers";

require('dotenv').config();

function NotificationPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.gradient__bg}>
                <Navbar />
                <Notification />
                <Footer />
            </div>
        </div>
    )
}

export default NotificationPage