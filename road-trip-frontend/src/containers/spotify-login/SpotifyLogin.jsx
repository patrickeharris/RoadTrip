import React from 'react'
import styles from './spotify.module.css'
import globalStyles from "../container.module.css";

const getSpotifyUserLogin = () => {
    fetch("http://trailblazers.gq:8080/spotify/login",  {headers: {"Content-Type": "application/json",
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE',}})
        .then((response) => response.text())
        .then((response) => {
            window.location.replace(response);
        })
        .catch((error) => {
            console.log(error);
        })
}

const SpotifyLogin = () => {

    return (
        <div className={globalStyles.sectionPadding}>
            <div className={styles.login}>
                <div className={styles.loginContent}>
                    <h1 className={globalStyles.gradientText}>Please log in with Spotify</h1>
                    <div className={styles.loginInput}>
                        <button onClick={getSpotifyUserLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpotifyLogin