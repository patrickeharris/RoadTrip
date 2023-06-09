import React from 'react';
import Link from '@material-ui/core/Link';
import styles from './styles/index.module.css';
import {Navbar} from "../components";
import {Footer, Register} from "../containers";

require('dotenv').config();

function RegisterPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.gradient__bg}>
                <Navbar />
                <Register />
                <Footer />
            </div>
        </div>
    )
}

export default RegisterPage