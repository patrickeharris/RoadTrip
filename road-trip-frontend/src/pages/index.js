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
        <div className="bg-blue-900">
            <div className={styles.gradient__bg}>
                <Navbar />
                <Header />
                <About />
                <Footer />
            </div>
        </div>
    )
}

export default HomePage