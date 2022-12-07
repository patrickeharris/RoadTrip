import React from 'react';
import styles from './styles/index.module.css';
import {Navbar} from "../components";
import {EditProfile, Footer} from "../containers";

require('dotenv').config();

function ProfilePage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.gradient__bg}>
                <Navbar />
                <EditProfile />
                <Footer />
            </div>
        </div>
    )
}

export default ProfilePage