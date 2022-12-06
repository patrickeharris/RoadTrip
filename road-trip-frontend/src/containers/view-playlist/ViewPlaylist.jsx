import {useEffect, useState} from "react";
import {myAxios} from "../../util/helper";
import React from "react";

const ViewPlaylist = () => {

    const [url, setUrl] = useState("");

    useEffect(() => {
        async function getPlaylist() {
            const response = await myAxios.get("/get-playlist-link",
                {
                    params: {trip_id: window.sessionStorage.getItem('curTrip')},
                    headers: {
                        'Access-Control-Allow-Origin' : '*',
                        'Authorization': window.sessionStorage.getItem('token')
                    }
                });
            console.log(response.data);
            setUrl(response.data);
        }
        getPlaylist();
    })

    const handleDelete = async() => {
        await myAxios.delete("/delete-playlist",
            {
                params: {
                    trip_id: window.sessionStorage.getItem('curTrip')
                },
                headers: {
                    'Access-Control-Allow-Origin' : '*',
                    'Authorization': window.sessionStorage.getItem('token')
                }
            })
        window.location.replace("/trip-dashboard");
    }

    return (
        <div>
        <div className="flex justify-center mt-4">
            <iframe title="Spotify Web Player"
                    src={`https://open.spotify.com/embed${url.substring(24)}`}
                    width="500"
                    height="580"
                    allow="encrypted-media"
            />
        </div>
            <div className="flex justify-center">
                <button className='mt-4 font-sans font-bold bg-green-500 hover:bg-green-700 text-white text-md py-3 px-4 rounded mb-4' onClick={handleDelete} type="button" >Delete Playlist</button>
                </div>
            <div className="flex justify-center">
                <button className='font-sans font-bold bg-red-500 hover:bg-red-700 text-white text-md py-3 px-4 rounded mb-4' type="button" onClick={() =>{window.location.replace("/trip-dashboard")}}>Back To Trips</button>
            </div>
    </div>
    )
}

export default ViewPlaylist;