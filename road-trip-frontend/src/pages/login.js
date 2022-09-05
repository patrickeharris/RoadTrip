import React from 'react';
import Link from '@material-ui/core/Link';
import styles from './styles/index.module.css';
import {Navbar} from "../components";
import {Footer, Login} from "../containers";

require('dotenv').config();

function LoginPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.gradient__bg}>
                <Navbar />
                <Login />
                <Footer />
            </div>
        </div>
    )
}

export default LoginPage