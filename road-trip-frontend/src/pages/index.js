import React from 'react';
import Link from '@material-ui/core/Link';
import styles from './styles/index.module.css';
import {Navbar} from "../components";
import {About, Footer, Header} from "../containers";

require('dotenv').config();

global.loggedIn = false;

function HomePage() {

    return (
        <div className={styles.wrapper}>
            <div className={styles.gradient__bg}>
                <Navbar />
                <Header />
            </div>
            <About />
            <Footer />
        </div>
    )
}

export default HomePage