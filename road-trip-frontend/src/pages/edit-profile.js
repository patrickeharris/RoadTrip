import React from 'react';
import Link from '@material-ui/core/Link';
import styles from './styles/index.module.css';
import {Navbar} from "../components";
import {EditProfile, Footer} from "../containers";

require('dotenv').config();

function EditProfilePage() {
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

export default EditProfilePage