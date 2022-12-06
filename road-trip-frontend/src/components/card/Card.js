/* global google */
import React, {useEffect, useState} from "react";
import styles from "./card.module.css"
import {GoogleMap, useLoadScript, Marker, DirectionsRenderer} from "@react-google-maps/api";

/**
 * NOTES:
 * - On styling:
 * For this test I moved the styles to styles.css.
 * - On conditional rendering:
 * The conditional statement that checks whether or not to display an image
 * exists within the 'CardImage' function. Used in the component as:
 * <CardImage />
 * - On default props:
 * I have no idea whether this approach of handling defaults is the right/best one.
 * Next step would be to try variations on setting defaults.
 */

/*
1. Card Class
2. Defaults
*/

// 1. Card Class /////////////////////////////////////////////
function CardImage(props) {
    const isImageURL = props.image;
    // If an image was passed:
    if (isImageURL) {
        return (
            <div className={styles.styleImage}>
                <img
                    style={{ width: props.width + "px", marginTop: "-8%" }}
                    src={props.image}
                    alt="Seattle"
                />
            </div>
        );
    }
    return null;
}

const CardContent = (props) => {

    const [toggle, setToggle] = useState(false);

    return (
        <div className={styles.styleCardContent}>
            <p className="font-sans font-bold text-lg mt-1">{props.title}</p>
            <hr className="mb-2 mt-1"></hr>
            <p className="font-sans text-md mb-1">{props.start}</p>
            <p className="font-sans text-md mb-1">{props.end}</p>
            <p className="font-sans text-md mb-1">{props.date}</p>
            <div>
                <button onClick={() => {
                    setToggle(!toggle)
                }} className="text-blue-800 text-2xl">...</button>

                {toggle  ? <div id="dropdown" className="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                        <ul className="font-sans py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                            <li>
                                <a className="font-sans font-bold block py-2 pl-3 pr-4 text-white bg-green-500 hover:bg-green-700 text-white p-0 dark:text-white"
                                   onClick={function addPlaylist() {
                                       window.sessionStorage.setItem('curTrip', props.tripid);
                                       console.log(window.sessionStorage.getItem('spotifyLogged') )
                                       if (window.sessionStorage.getItem('spotifyLogged') === 'true') {
                                           window.location.replace("/choose-genre");
                                       } else {
                                           window.sessionStorage.setItem('spotifyLogged', 'true');
                                           fetch("https://localhost:8080/spotify-login", {
                                               headers: {
                                                   "Content-Type": "application/json",
                                                   'Access-Control-Allow-Origin' : '*',
                                                   'Authorization': window.sessionStorage.getItem('token')
                                               }
                                           })
                                               .then((response) => response.text())
                                               .then((response) => {
                                                   window.location.replace(response);
                                               })
                                               .catch((error) => {
                                                   console.log(error);
                                               })
                                       }}}>Add Playlist</a>
                            </li>
                            <li>
                                <a className="font-sans font-bold bg-blue-500 block py-2 pl-3 pr-4 text-white hover:bg-blue-700 border-0 p-0 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:hover:bg-transparent"
                                   onClick={function editTrip() {
                                       window.sessionStorage.setItem('curTrip', props.tripid);
                                       window.location.replace('/edit-trip');}}>Edit Trip</a>
                            </li>
                            <li>
                                <a className="font-sans font-bold bg-violet-500 block py-2 pl-3 pr-4 text-white hover:bg-violet-700 border-0 p-0 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:hover:bg-transparent"
                                   onClick={function rateTrip() {
                                       window.sessionStorage.setItem('curTrip', props.tripid);
                                       window.location.replace('/rate-trip?tripId=' + props.tripid);}}>Rate Trip</a>
                            </li>
                            <li>
                                <a className="font-sans font-bold bg-red-500 block py-2 pl-3 pr-4 text-white hover:bg-red-700 border-0 p-0 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:hover:bg-transparent"
                                   onClick={async function cancelTrip(){

                                       await myAxios.delete("/cancel-trip",{
                                           params: {tripId: props.tripid},
                                           headers: {
                                               "Content-Type": "application/json",
                                               'Authorization': window.sessionStorage.getItem('token')
                                           }});
                                       window.location.replace("/trip-dashboard");}}>Cancel Trip</a>
                            </li>
                        </ul>
                    </div> : <></>}
            </div>
        </div>
    );
}

const Markers = (props) => {

    return (<div>{props.stops && props.stops.map((stop) => {
        if(stop.stopLocLat === undefined || stop.stopLocLong === undefined){
            return <Marker position={{lat: -25.363, lng: 131.044}}/>
        }
        return <Marker position={{lat: stop.stopLocLat, lng: stop.stopLocLong}}/>
    })}</div>)

}

const Map = (props) => {
    const [results, setResults] = useState(null)

    useEffect(() => {
        async function getResults() {
            const directionsService = new google.maps.DirectionsService();
            console.log(props.startLoc)
            return await directionsService.route({
                origin: props.startLoc,
                destination: props.endLoc,
                travelMode: google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: true,
                avoidHighways: false,
                avoidTolls: false
            });
        }
        console.log("isLoaded")
        console.log(isLoaded)

        if (isLoaded) {
            getResults().then((response) => {
                if (results === null) {
                    const resultList = response.routes.filter(function (item) {
                        //console.log(item);
                        const t = [];
                        t.push(item);
                        if (item.summary === props.selectedRoute) {
                            return t;
                        }

                    });
                    const t = [];
                    t.routes = resultList;
                    t.request = response.request;
                    setResults(t);
                }
            })
        }
    }, [isLoaded])

    const containerStyle = {
        width: props.width + "px",
        height: '300px'
    };

    let test = true;

    const [selected, setSelected] = useState({lat: 43.45, lng: -80.49});
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: "AIzaSyDJGTHHgwc5HXLi7qDeMAvecrT0ts-7jLU",
        libraries: ["places"],
    });

    return (<>{isLoaded ?
        <GoogleMap zoom={10} center={selected} mapContainerStyle={containerStyle} mapContainerClassName="map-container">
            <DirectionsRenderer directions={results}/>
            <Markers stops={props.stops}/>
        </GoogleMap> : <></>}</>);
}

const Card = ({title, start, end, date, menu, startLoc, endLoc, selectedRoute, stops, tripid}) => {
    console.log("test")
        return (
            <div style={{ width: 350 + "px" }}>
                <div className={styles.styleCard}>
                    <Map startLoc={startLoc} endLoc={endLoc} selectedRoute={selectedRoute} stops={stops}/>
                    <CardContent
                    title={title}
                    start={start}
                    end={end}
                    date={date}
                    tripid={tripid}
                />


                </div>
            </div>
        );
}

export default Card

// 2. Defaults /////////////////////////////////////////////
