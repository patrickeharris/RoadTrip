import React from 'react';
import styles from './styles/index.module.css';
import {Navbar} from '../components';
import {Footer, SpotifyLogin} from '../containers';

require('dotenv').config();

export default function SpotifyLoginPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.gradient__bg}>
                <Navbar />
                <SpotifyLogin />
                <Footer />
            </div>
        </div>
    )
}