import styles from "./styles/index.module.css";
import {Navbar, AddAPlaylist} from "../components";
import {Footer} from "../containers";
import React, {useState} from "react";
import {myAxios} from "../util/helper";

require('dotenv').config();

function AddPlaylistPage() {
    const [playlistName, setPlaylistName] = useState("");
    return (
        <div className={styles.wrapper}>
            <div className={styles.gradient__bg}>
                <Navbar />
                <AddAPlaylist />
                <div className={styles.input}>
                    <input type="playlistName" placeholder="Playlist Name" onChange={(e) => setPlaylistName(e.target.value)} value={playlistName}/>
                </div>
                <div className={styles.buttons}>
                    <button type="button" onClick={async() => {
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
                                    'Access-Control-Allow-Origin' : '*',
                                    'Authorization': window.sessionStorage.getItem('token')
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
                                    'Access-Control-Allow-Origin' : '*',
                                    'Authorization': window.sessionStorage.getItem('token')
                                },
                                withCredentials: true,
                            }
                        )
                        window.location.replace("/trip-dashboard");
                    }} >Create Playlist</button>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default AddPlaylistPage