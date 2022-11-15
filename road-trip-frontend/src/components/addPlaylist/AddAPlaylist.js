import React, {Component, useEffect, useState} from "react";
import {myAxios} from "../../util/helper";
import PlaylistCard from "../playlist-card/Playlist-Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

export default function AddPlaylist() {

    const [userTopPlaylists, setUserTopPlaylists] = useState();

    useEffect(() => {
        fetch("http://trailblazers.gq:8080/user-playlists")
            .then(response => response.json())
            .then(data => {
                console.log("hmm")
                console.log(data)
                setUserTopPlaylists(data);
            })
    }, []);

    console.log(userTopPlaylists);

    return <Carousel responsive={responsive}>{
        <div>
            {userTopPlaylists ? (
                    userTopPlaylists.map((playlistResult) => {
                        console.log(playlistResult);
                        const description = "Link: " + playlistResult.externalUrls.externalUrls.spotify;
                        const trip_id = window.sessionStorage.getItem('curTrip');
                        return <PlaylistCard title={playlistResult.name} description={description}

                                             selectButton={<button onClick={async function selectPlaylist() {

                                                 const curUser = (await myAxios.get("/register/curUser")).data.user_id;

                                                 const id = await myAxios.post(
                                                     "/save-playlist",
                                                     JSON.stringify({
                                                         user_id: curUser, playlistName: playlistResult.name,
                                                         playlistLink: playlistResult.externalUrls.externalUrls.spotify
                                                     }),
                                                     {
                                                         headers: {
                                                             "Content-Type": "application/json",
                                                             'Access-Control-Allow-Origin': '*',
                                                             'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
                                                         }, withCredentials: true
                                                     })
                                                 console.log("id")
                                                 console.log(id.data)

                                                 const params = new URLSearchParams({
                                                     trip_id: trip_id,
                                                     playlistID: id.data
                                                 }).toString();
                                                 const url = "http://trailblazers.gq:8080/add-playlist?" + params
                                                 await myAxios.post(
                                                     url,
                                                     {},
                                                     {
                                                         headers: {
                                                             "Content-Type": "application/json",
                                                             'Access-Control-Allow-Origin': '*',
                                                             'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
                                                         }, withCredentials: true
                                                     })

                                                 await myAxios.post(
                                                     url,
                                                     null,
                                                     {
                                                         params: {},
                                                         headers: {
                                                             'Access-Control-Allow-Origin': '*',
                                                             'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                                                         }, withCredentials: true
                                                     });
                                                 window.location.replace("/trip-dashboard");
                                             }}>Select Playlist</button>}>
                        </PlaylistCard>
                    })
                ) :
                (
                    <h1>LOADING...</h1>
                )
            }
        </div>}</Carousel>;
}