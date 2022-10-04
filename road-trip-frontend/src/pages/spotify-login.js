import React from 'react';
import Link from '@material-ui/core/Link';
import styles from "./styles/index.module.css";
import {Navbar} from "../components";
import {Footer} from "../containers";

require('dotenv').config();

const getSpotifyUserLogin = () => {
    fetch("http://trailblazers.gq:8080/spotify/login", {
        method: "GET",
        headers: {"Content-type": "application/json;charset=UTF-8", 'Access-Control-Allow-Origin' : '*'}
    } )
        .then((response) => response.text())
        .then((response) => {
            console.log(response);
            window.location.replace(response);
        })
        .catch((error) => {
            console.log(error);
        })
}

function SpotifyLoginPage() {

    return (
        <div className={styles.wrapper}>
            <div className={styles.gradient__bg}>
                <Navbar />
                <div className={styles.white__txt}>
                    <h2>Please log in with Spotify to get started!</h2>
                    <button onClick={getSpotifyUserLogin}>Login</button>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default SpotifyLoginPage