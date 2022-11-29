import styles from "./styles/index.module.css";
import {Navbar, AddAPlaylist} from "../components";
import {Footer} from "../containers";
import React, {useState} from "react";
import {myAxios} from "../util/helper";

require('dotenv').config();

const [playlistName, setPlaylistName] = useState("");

async function addPlaylistToTrip() {

    const response = await myAxios.post(
        "/create-playlist",
        null,
        {
            params: {
                name: playlistName,
                tracks: window.sessionStorage.getItem('tracks')
            },
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
            },
            withCredentials: true,
        }
    );

    const r = await myAxios.post(
        "/add-playlist",
        null,
        {
            params: {
                trip_id: window.sessionStorage.getItem('curTrip'),
                playlistID: response.data,
            },
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
            },
            withCredentials: true,
        }
    )
    window.location.replace("/trip-dashboard");
}

function AddPlaylist() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.gradient__bg}>
                <Navbar />
                <AddAPlaylist />
                <div className={styles.input}>
                    <input type="playlistName" placeholder="Playlist Name" onChange={(e) => setPlaylistName(e.target.value)} value={playlistName}/>
                </div>
                <div className={styles.buttons}>
                    <button type="button" onClick={addPlaylistToTrip} >Create Playlist</button>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default AddPlaylist