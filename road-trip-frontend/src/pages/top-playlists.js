import React, {useEffect, useState} from "react";
import styles from "./styles/index.module.css";
import {Navbar} from "../components";
import {Footer} from "../containers";


function TopPlaylists() {
    const [userTopPlaylists, setUserTopPlaylists] = useState();

    useEffect(() => {
        fetch("http://trailblazers.gq:8080/spotify/user-playlists")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUserTopPlaylists(data)
            })
    }, [])

    return (

        <div className={styles.wrapper}>
            <div className={styles.gradient__bg}>
                <Navbar />
                <div className={styles.white__txt}>
                    {userTopPlaylists ? (
                        userTopPlaylists.map((playlistResult) => {
                            return <h1 key= {playlistResult.name}>{playlistResult.name}</h1>
                        })
                        ):
                        (
                            <h1>LOADING...</h1>
                        )
                    }
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default TopPlaylists