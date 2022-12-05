import React, {Component, useEffect, useState} from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import TrackCard from "../track-card/Track-Card";
import {myAxios} from "../../util/helper"

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

export default function AddAPlaylist() {

    const [tracks, setTracks] = useState();



    useEffect(() => {
        async function genRec() {
            console.log(window.sessionStorage.getItem('token'))
            const response = await (myAxios.get("/generate-recommendations",
                {
                    params: {genre: window.sessionStorage.getItem('genre')},
                    headers: {
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin' : '*',
                        'Authorization': window.sessionStorage.getItem('token')}
                }))
            console.log(response);
            setTracks(response.data);
        }
        genRec();

    }, [myAxios]);

    return <Carousel responsive={responsive}>{
        <div>
            {tracks ? (
                    tracks.map((trackResult) => {
                        console.log(trackResult);
                        const link = "Link: " + trackResult.externalUrls.externalUrls.spotify;
                        let artists;
                        if (trackResult.artists.length === 1) {
                            artists = "Artist: " + trackResult.artists[0].name;
                        } else {
                            artists = "Artists: ";
                            trackResult.artists.map((artist) => {
                                artists = artists + artist.name + ", ";
                            });
                        }
                        console.log(trackResult.album)
                        return <TrackCard title={trackResult.name} artists={artists} link={link}

                                             addButton={<button onClick={async function addTrack() {
                                                 if (window.sessionStorage.getItem('tracks') === null) {
                                                     let list = []
                                                     list.push(trackResult);
                                                     window.sessionStorage.setItem('tracks', JSON.stringify(list));
                                                 } else {
                                                     let list = window.sessionStorage.getItem('tracks');
                                                     list = JSON.parse(list);
                                                     list.push(trackResult);
                                                     window.sessionStorage.setItem('tracks', JSON.stringify(list));
                                                 }
                                             }}>Add Track</button>}>
                        </TrackCard>
                    })
                ) :
                (
                    <h1>LOADING...</h1>
                )
            }
        </div>}</Carousel>;
}