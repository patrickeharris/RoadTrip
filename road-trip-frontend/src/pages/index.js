import React from 'react';
import Link from '@material-ui/core/Link';
import styles from './styles/index.module.css';
import {Navbar} from "../components";
import {About, Footer, Header} from "../containers";

require('dotenv').config();

function HomePage() {

    React.useEffect(() => {
        if (window.sessionStorage.getItem('loggedIn') === null) {
            window.sessionStorage.setItem('loggedIn', 'false');
        }
        if (window.sessionStorage.getItem('spotifyLogged') === null) {
            window.sessionStorage.setItem('spotifyLogged', 'false');
        }
    });


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