import React, {useEffect, useState} from "react";
import styles from "./styles/index.module.css";
import {Navbar} from "../components";
import {Footer} from "../containers";


function TopArtists() {
    const [userTopArtists, setUserTopArtists] = useState();

    useEffect(() => {
        fetch("http://trailblazers.gq/spotify/user-top-artists")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setUserTopArtists(data)
            })
    }, [])

    return (

        <div className={styles.wrapper}>
            <div className={styles.gradient__bg}>
                <Navbar />
                <div className={styles.white__txt}>
                    {userTopArtists ? (
                        userTopArtists.map((artistResult) => {
                            return <h1 key= {artistResult.name}>{artistResult.name}</h1>
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

export default TopArtists