import React, {useCallback, useEffect, useMemo, useState} from 'react'
import styles from './trip.module.css'
import globalStyles from "../container.module.css";
import {myAxios} from "../../util/helper";
import {DirectionsRenderer, GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {Combobox, ComboboxInput, ComboboxList, ComboboxOption, ComboboxPopover} from "@reach/combobox";
import "@reach/combobox/styles.css"
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {Checkbox} from "@material-ui/core";
import * as emailjs from "@emailjs/browser";
import ReactStars from 'react-stars';

const Trip = ({trip, setTest, setTrip, stopsResponse, setStopsResponse}) => {
    setTest(false);
    let i = 0;
    function removeListItem(e){
        let container = e.currentTarget;
        console.log(container)
        console.log(container.value)
        console.log(e.currentTarget.value)
        trip.map(function (item) {
            console.log(item.vicinity)
        })
        /*container.classList.add("transition", "duration-200", "opacity-0");
        container.ontransitionend = function () {
            const index = trip.findIndex(element => element.vicinity === container.value);
            console.log(index)
            if(index !== -1) {
                trip.splice(trip.findIndex(element => element.vicinity === container.value), 1);
                console.log(trip)
                container.parentElement.remove()
                setTrip(trip);
                setTest(true);
            }
        }*/
        const index = trip.findIndex(element => element.vicinity === container.value);
        console.log(index)
        if(index !== -1) {
            stopsResponse.push(trip.find(element => element.vicinity === container.value))
            stopsResponse.sort(function(a, b){return b.rating - a.rating});
            setStopsResponse(stopsResponse)
            trip.splice(trip.findIndex(element => element.vicinity === container.value), 1);
            console.log(trip)
            setTrip(trip);
            setTest(true);
        }
    }
    return trip.slice(1,-1).map(function (item) {
        i++;
        //return <div><h2>Name: {item.stopName}</h2></div>
        return <li className="border-b-2 border-gray-100">
            <button onClick={removeListItem} value={item.vicinity} className="py-5 px-4 flex justify-between border-l-4 border-transparent bg-transparent hover:border-green-400 hover:bg-gray-200 w-full">{item.stopName}<div className="font-bold text-white rounded-full bg-blue-400 flex items-center justify-center font-mono ml-4 w-6 h-6">{i}</div></button>
        </li>

    });
}

const Results = ({results, setSelectedRoute, selectedRoute, map}) => {
    const containerStyle = {
        width: '400px',
        height: '400px'
    };
    let routes = [];
    function selectOnlyThis(id){
        var myCheckbox = document.getElementsByName("myCheckbox");
        Array.prototype.forEach.call(myCheckbox,function(el){
            el.checked = false;
        });
        id.target.checked = true;

        selectedRoute = id.target.value;
        setSelectedRoute(id.target.value);
    }

    function getChecked(id){
        return id.target.value === selectedRoute;
    }

    const [selectedStart, setSelectedStart] = useState({lat: 43.45, lng: -80.49});
    return results.routes.map(function (item) {
        const t = [];
        t.routes = [item];
        t.request = results.request;
        routes.push(t);
        var directionsRenderer = new window.google.maps.DirectionsRenderer();
        directionsRenderer.setDirections(t);
        directionsRenderer.setMap(map);
        return <div className={styles.routes}><h2>Distance: {item.legs[0].distance.text}</h2><h2>Duration: {item.legs[0].duration.text}</h2>
            <GoogleMap center={selectedStart} mapContainerStyle={containerStyle} zoom={15}> <DirectionsRenderer
                directions={t}/> </GoogleMap><input
                type="checkbox" name="myCheckbox" value={item.summary} onClick={selectOnlyThis}
                checked={getChecked}/></div>
    });
}

const StopResultsNew = ({results, markers, trip, setTrip, updateTrip, city, setTest, setResults}) => {
    let numRestaurants = 0;
    let numGas = 0;
    let numLodging = 0;
    let numAttractions = 0;
    function test(thing) {
        const test = results.find(element => element.vicinity === thing.target.value)
        if (trip.find(element => element.stopName === test.stopName) === undefined){
            if(thing.target.checked) {
                trip.splice(trip.length - 1, 0, test);
            }
        }
        else if(!thing.target.check){
            trip.splice(trip.findIndex(element => element.stopName === test.stopName), 1);
        }
        setTest(true)
        setTrip(trip);
    }
    function clicked(e){
        const test = results.find(element => element.vicinity === e.currentTarget.value);
        results.splice(results.findIndex(element => element.vicinity === e.currentTarget.value), 1);
        setResults(results)
        trip.splice(trip.length - 1, 0, test);
        setTest(true)
        setTrip(trip);
    }
    return results.map(function (item) {
        if(city === "" || item.vicinity.toLowerCase().includes(city.toLowerCase())) {
            if(item.stopType === "restaurant" || item.stopType === "meal_takeaway" || item.stopType === "meal_delivery" || item.stopType === "cafe" || item.stopType === "bar"){
                if(numRestaurants > 10){
                    return;
                }
                numRestaurants++;
            }
            if(item.stopType === "gas_station" || item.stopType === "convenience_store" ){
                if(numGas > 10){
                    return;
                }
                numGas++;
            }
            if(item.stopType === "lodging"){
                if(numLodging > 10){
                    return;
                }
                numLodging++;
            }
            return <button onClick={clicked} className="bg-white flex items-center w-full flex-col justify-center hover:bg-gray-200 p-2" value={item.vicinity}><img src={item.image} width="50" height="50"/>
                <h4>{item.stopName}</h4><h6>{item.vicinity}</h6><ReactStars count={5} value={item.rating} edit={false}
                                                                            size={24}
                                                                            color2={'#ffd700'}/>
            </button>
        }
    });
}

const Places = ({placeholderText, start, setStart, selected, setSelected}) => {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: "AIzaSyDJGTHHgwc5HXLi7qDeMAvecrT0ts-7jLU",
        libraries: ["places"],
    });
    if(!isLoaded) return <div>Loading...</div>;
    return <Map placeholderText={placeholderText} start={start} setStart={setStart} selected={selected} setSelected={setSelected}/>
}

const Map = ({placeholderText, start, setStart, selected, setSelected}) => {
    const containerStyle = {
        width: '400px',
        height: '400px'
    };

    return (
        <>
            <div className="placesContainer">
                <PlacesAutocomplete setSelected={setSelected} placeholderText={placeholderText} start={start} setStart={setStart}/>
            </div>
        </>
    );
}

const PlacesAutocomplete = ({setSelected, placeholderText, start, setStart}) => {
    const{
        ready,
        value,
        setValue,
        suggestions: {status, data},
        clearSuggestions
    } = usePlacesAutocomplete();

    const handleSelect = async (val) => {
        setValue(val, false);
        setStart(val);
        clearSuggestions();

        const results = await getGeocode({ address: val });
        const {lat, lng} = await getLatLng(results[0]);
        setSelected({lat, lng, name: val});
    }

    return <Combobox onSelect={handleSelect}>
        <ComboboxInput value={start} onChange={e => {setStart(e.target.value); setValue(e.target.value)}} disabled={!ready} className="combobox-input" placeholder={placeholderText}/>
        <ComboboxPopover className={styles.popup}>
            <ComboboxList>
                {status === "OK" && data.map(({place_id, description}) => <ComboboxOption key={place_id} value={description}/>)}
            </ComboboxList>
        </ComboboxPopover>
    </Combobox>


}

const SearchAutocomplete = ({setSelected, placeholderText, start, setStart}) => {
    const{
        ready,
        value,
        setValue,
        suggestions: {status, data},
        clearSuggestions
    } = usePlacesAutocomplete();

    const handleSelect = async (val) => {
        setValue(val, false);
        setStart(val);
        clearSuggestions();

        const results = await getGeocode({ address: val });
        const {lat, lng} = await getLatLng(results[0]);
        setSelected({lat, lng, name: val});
    }

    return <Combobox onSelect={handleSelect}>
        <ComboboxInput value={start} onChange={e => {setStart(e.target.value); setValue(e.target.value)}} disabled={!ready} className="combobox-input" placeholder={placeholderText}/>
        <ComboboxPopover className={styles.popup}>
            <ComboboxList>
                {status === "OK" && data.map(({place_id, description}) => <ComboboxOption key={place_id} value={description}/>)}
            </ComboboxList>
        </ComboboxPopover>
    </Combobox>


}

const CreateTrip = () => {
    const [tripName, setTripName] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [date, setDate] = useState("");
    const [userID, setUserID] = useState("");
    const [open, setOpen] = useState(false);
    const closeModal = () => setOpen(false);
    const [map, setMap] = useState(null);
    const [tolls, setTolls] = useState(true);
    const [highways, setHighways] = useState(true);
    const [restaurants, setRestaurants] = useState(true);
    const [lodging, setLodging] = useState(true);
    const [gasStations, setGasStations] = useState(true);
    const [attractions, setAttractions] = useState(true);
    const [selectedRoute, setSelectedRoute] = useState("");
    const [defaultStart, setDefaultStart] = useState({lat: 43.45, lng: -80.49});
    const [selectedStart, setSelectedStart] = useState(null);
    const [selectedEnd, setSelectedEnd] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [stopsResponse, setStopsResponse] = useState([]);
    const [distance, setDistance] = useState(1);
    const [test, setTest] = useState(false);
    const [showStopPref, setShowStopPref] = useState(false);
    const [showStops, setShowStops] = useState(false);
    const [trip, setTrip] = useState([]);
    const [city, setCity] = useState("");
    let calc = false;
    const [calcFinsihed, setCalcFinished] = useState(false);
    const MAX = 50;
    const maxRating = 5;
    const [rating, setRating] = useState(maxRating);
    const markers = [];
    const [tripInfo, setTripInfo] = useState(true);
    const [routes, setRoutes] = useState(false);
    const [stops, setStops] = useState(false);
    const [search, setSearch] = useState("");

    const onLoad = useCallback((map) => setMap(map), []);
    const getBackgroundSize = () => {
        return {
            backgroundSize: `${(distance * 100) / MAX}% 100%`,
        };
    };

    useEffect(() => {
        if (map && selectedStart){
            var bounds = new google.maps.LatLngBounds();
            bounds.extend(selectedStart);
            map.fitBounds(bounds);
        }
        if (map && selectedEnd){
            var bounds = new google.maps.LatLngBounds();
            bounds.extend(selectedEnd);
            map.fitBounds(bounds);
        }
        if (map && selectedStart && selectedEnd) {
            while(trip.length > 0){
                trip.pop();
            }
            setTrip([]);
            var bounds = new google.maps.LatLngBounds();
            bounds.extend(selectedStart);
            bounds.extend(selectedEnd);
            map.fitBounds(bounds);
            calculateRoute();
            trip.push({stopName: selectedStart.name, vicinity: selectedStart.name})
            trip.push({stopName: selectedEnd.name, vicinity: selectedStart.name})
            setTrip(trip);

        }
    }, [map, selectedStart, selectedEnd, trip]);

    function placeSearch(){

        var service = new google.maps.places.PlacesService(map);

        service.findPlaceFromQuery(search, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    console.log(results[i]);
                }
            }
        });
    }


    async function calculateRoute(){
        if(start === "" || end === ""){
            return;
        }
        const directionsService = new google.maps.DirectionsService();

        const results = await directionsService.route({
            origin: selectedStart,
            destination: selectedEnd,
            travelMode: google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true,
            avoidHighways: !highways,
            avoidTolls: !tolls
        })
        setDirectionsResponse(results);
    }
    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            let arr = stopsResponse;
            //setStopsResponse(stopsResponse.concat(results));
            for (var i = 0; i < results.length; i++) {
                arr.push(results[i]);
                setStopsResponse(arr)
            }
        }
    }

    function bindInfoWindow(marker, map, infowindow, html) {
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.setContent(html);
            infowindow.open(map, marker);
            const svgMarker = {
                path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                fillColor: "blue",
                fillOpacity: 0.6,
                strokeWeight: 0,
                rotation: 0,
                scale: 2,
                anchor: new google.maps.Point(18, 27),
            };
            marker.setIcon(svgMarker);
        });
    }

    async function calculateStops() {
        stopsResponse.splice(0, stopsResponse.length)
        setStopsResponse(stopsResponse)
        let waypoints = []
        let polyline = require( 'google-polyline' );
        waypoints = polyline.decode( directionsResponse.routes[0].overview_polyline );
        var service = new google.maps.places.PlacesService(map);
        var infowindow =  new google.maps.InfoWindow({
            content: ''
        });

        for(let j = 0;j< waypoints.length;j+=60) {
            if(restaurants) {
                service.nearbySearch({
                    location: {lat: waypoints[j][0], lng: waypoints[j][1]},
                    radius: distance * 1609,
                    type: ['restaurant']
                }, callback);
            }
            if(lodging) {
                service.nearbySearch({
                    location: {lat: waypoints[j][0], lng: waypoints[j][1]},
                    radius: distance * 1609,
                    type: ['lodging']
                }, callback);
            }
            if(gasStations) {
                service.nearbySearch({
                    location: {lat: waypoints[j][0], lng: waypoints[j][1]},
                    radius: distance * 1609,
                    type: ['gas_station']
                }, callback);
            }
            if(attractions) {
                service.nearbySearch({
                    location: {lat: waypoints[j][0], lng: waypoints[j][1]},
                    radius: distance * 1609,
                    type: ['landmark']
                }, callback);
            }



        }
        function callback(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    if(stopsResponse.findIndex(e => e.vicinity === results[i].vicinity) === -1 && trip.findIndex(e => e.vicinity === results[i].vicinity) === -1)
                    {
                        var marker = new google.maps.Marker({
                            position: results[i].geometry.location,
                            map,
                            title: results[i].name
                        });
                        markers.push(marker);
                        bindInfoWindow(marker, map, infowindow, "<p>" + marker.title + "</p> <button>Add Stop</button>");
                        stopsResponse.push({stopName: results[i].name, vicinity: results[i].vicinity, stopLocLat: results[i].geometry.location.lat(), stopLocLong: results[i].geometry.location.lng(), stopType: results[i].types[0], image: results[i].icon, rating: results[i].rating});
                        setStopsResponse(stopsResponse);
                    }
                }
                stopsResponse.sort(function(a, b){return b.rating - a.rating});
                setStopsResponse(stopsResponse)
            }
        }
    }
    const handleTolls = () => {
        setTolls(!tolls);
    };
    const handleHighways = () => {
        setHighways(!highways);
    };
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: "AIzaSyDJGTHHgwc5HXLi7qDeMAvecrT0ts-7jLU",
        libraries: ["places"],
    });
    const handleSubmit = async () => {
        try {
            const startLoc = selectedStart.lat + " " + selectedStart.lng;
            const stops = [];
            var myCheckbox = document.getElementsByName("stops");
            Array.prototype.forEach.call(myCheckbox,function(el){
                if(el.checked){
                    stops.push(el.value);
                }
            });
            const endLoc = selectedEnd.lat + " " + selectedEnd.lng;
            let id = (await myAxios.get("/register/curUser")).data.user_id;
            const response = await myAxios.post(
                "/create-trip",
                JSON.stringify({tripName, start, startLoc, end, endLoc, date, tolls, highways, userid: id, user_id: id, selectedRoute, route: {routeName : selectedRoute, stops: trip}}),
                {
                    headers: {"Content-Type": "application/json",
                        'Access-Control-Allow-Origin' : '*',
                        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE',},
                    withCredentials: true,
                }
            );
            setTripName("");
            setStart("");
            setEnd("");
            setDate("");
            setUserID("");
            setSelectedRoute("");
            console.log(response);
            toast.success('Successfully Added Trip!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            if (!err?.response) {
                console.log("No Server Response");
                console.log(err);
            } else {
                console.log("Registration Failed");
                console.log(err?.response);
            }
        }
        //Sending trip confirmation email
        /*const response = (await myAxios.get("/register/curUser")).data;
        let email = response.email;
        const emailParams = {
            send_to: email,
            trip_name: tripName,
            trip_start: start,
            trip_end: end,
            trip_date: date
        };
        emailjs.send('service_9hfbdhb', 'template_m697stp', emailParams, 'BhNdV_jnMUg4W-obV')
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
                console.log('FAILED...', error);
            });*/
    }
    const containerStyle = {
        width: '100%',
        height: '1280px'
    };

    return (
        <div className={globalStyles.sectionPadding}>
            <ToastContainer />
            <div className={styles.register}>
                <div className={styles.registerContent}>
                    <h1 className={globalStyles.gradientText}>Create Trip</h1>
                    <div className={styles.registerInput}>
                        {isLoaded && <GoogleMap id="map" zoom={10} center={defaultStart} onLoad={onLoad} mapContainerStyle={containerStyle} mapContainerClassName="map-container">
                            {selectedStart && <Marker position={selectedStart}/>}
                            {selectedEnd && <Marker position={selectedEnd}/>}
                            <div className="relative flex flex-col justify-center items-center z-10">
                                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center bg-white text-gray-500 dark:text-gray-400">
                                    <li className="mr-2">
                                        {tripInfo ? <a href="#"
                                                       className="inline-flex p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500 group"
                                                       aria-current="page">
                                                <svg aria-hidden="true"
                                                     className="mr-2 w-5 h-5 text-blue-600 dark:text-blue-500"
                                                     fill="currentColor" viewBox="0 0 20 20"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
                                                </svg>
                                                Trip Information
                                            </a> :
                                            <a href="#"  onClick={() => {setTripInfo(true); setStops(false); setRoutes(false);}}
                                               className="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                                                <svg aria-hidden="true"
                                                     className="mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                                                     fill="currentColor" viewBox="0 0 20 20"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z"></path>
                                                </svg>
                                                Trip Information
                                            </a>
                                        }
                                    </li>
                                    <li className="mr-2">
                                        {routes ?
                                        <a href="#"
                                           className="inline-flex p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500 group"
                                           aria-current="page">
                                            <svg aria-hidden="true"
                                                 className="mr-2 w-5 h-5 text-blue-600 dark:text-blue-500"
                                                 fill="currentColor" viewBox="0 0 20 20"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                                            </svg>
                                            Routes
                                        </a> :
                                            <a href="#" onClick={() => {setTripInfo(false); setStops(false); setRoutes(true);}}
                                               className="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                                                <svg aria-hidden="true"
                                                     className="mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                                                     fill="currentColor" viewBox="0 0 20 20"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                                                </svg>
                                                Routes
                                            </a>}
                                    </li>
                                    <li className="mr-2">
                                        {stops ?
                                            <a href="#"
                                               className="inline-flex p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500 group"
                                               aria-current="page">
                                                <svg aria-hidden="true"
                                                     className="mr-2 w-5 h-5 text-blue-600 dark:text-blue-500"
                                                     fill="currentColor" viewBox="0 0 20 20"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                                                    <path fill-rule="evenodd"
                                                          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                                          clip-rule="evenodd"></path>
                                                </svg>
                                                Stops
                                            </a> :
                                            <a href="#" onClick={() => {setTripInfo(false); setStops(true); setRoutes(false);}}
                                               className="inline-flex p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group">
                                                <svg aria-hidden="true"
                                                     className="mr-2 w-5 h-5 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
                                                     fill="currentColor" viewBox="0 0 20 20"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                                                    <path fill-rule="evenodd"
                                                          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                                                          clip-rule="evenodd"></path>
                                                </svg>
                                                Stops
                                            </a>}
                                    </li>
                                </ul>
                            </div>
                            { tripInfo &&
                        <div className="absolute grid top-14 left-2 items-center z-10 w-80 bg-white rounded border-8 text-center border-white">
                            <input type="text" placeholder="Trip Name" onChange={(e) => setTripName(e.target.value)} value={tripName}/>
                            <Places placeholderText="Start" start={start} setStart={setStart} selected={selectedStart} setSelected={setSelectedStart}/>
                            <Places placeholderText="End" start={end} setStart={setEnd} selected={selectedEnd} setSelected={setSelectedEnd}/>
                            <input type="date" placeholder="Date" onChange={(e) => setDate(e.target.value)} value={date}/>
                            <div className="flex items-center justify-center w-full mb-12">

                                <label
                                    htmlFor="toogleA"
                                    className="flex items-center cursor-pointer"
                                >
                                    <div className="relative">
                                        <input id="toogleA" type="checkbox" className="sr-only peer" checked={tolls}
                                               onChange={handleTolls}/>
                                        <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner peer-checked:bg-blue-300"></div>
                                        <div
                                            className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 peer transition peer-checked:translate-x-6 peer-checked:bg-blue-500"></div>
                                    </div>
                                    <div className="ml-3 font-extrabold text-transparent text-lg bg-clip-text bg-gradient-to-r from-purple-400 to-orange-300">
                                        Tolls
                                    </div>
                                </label>

                            </div>
                            <div className="flex items-center justify-center w-full mb-12">

                                <label
                                    htmlFor="toogleB"
                                    className="flex items-center cursor-pointer"
                                >
                                    <div className="relative">
                                        <input id="toogleB" type="checkbox" className="sr-only peer" checked={highways}
                                               onChange={handleHighways}/>
                                        <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner peer-checked:bg-blue-300"></div>
                                        <div
                                            className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 peer transition peer-checked:translate-x-6 peer-checked:bg-blue-500"></div>
                                    </div>
                                    <div className="ml-3 font-extrabold text-transparent text-lg bg-clip-text bg-gradient-to-r from-purple-400 to-orange-300">
                                        Highways
                                    </div>
                                </label>

                            </div>

                        </div>}

                            <div className="absolute grid top-32 right-2 items-center z-10 w-auto bg-white rounded border-8 text-center border-white">
                                <div className="ml-3 font-extrabold text-transparent text-lg bg-clip-text bg-gradient-to-r from-purple-400 to-orange-300">
                                    Your Trip
                                </div>
                            { (trip.length > 0 || test) && <ul className={styles.list} id="tripList"><li className={`border-b-2 border-gray-100`}>
                                <div className="py-5 px-4 flex justify-between border-l-4 border-transparent bg-transparent hover:border-green-400 hover:bg-gray-200">{start}<img className="ml-4 w-6 h-6" src="/static/start.png" /></div>
                            </li><Trip trip={trip} setTrip={setTrip} setTest={setTest} stopsResponse={stopsResponse} setStopsResponse={setStopsResponse}/><li className="border-b-2 border-gray-100">
                                <div className="py-5 px-4 flex justify-between border-l-4 border-transparent bg-transparent hover:border-green-400 hover:bg-gray-200">{end} <img className="ml-4 w-6 h-6" src="/static/flag.png" /></div>
                            </li></ul>}
                        </div>

                            {routes && <div className="absolute grid top-14 left-2 items-center z-10 w-90 max-h-full overflow-auto bg-white rounded border-8 text-center border-white">{directionsResponse !== null ? <Results results={directionsResponse} setSelectedRoute={setSelectedRoute} selectedRoute={selectedRoute} map={map}/>: <h2>No start or end</h2>}</div>}
                            {stops && <div className="absolute grid top-14 left-2 items-center z-10 w-90 max-h-full w-96 overflow-auto bg-white rounded border-8 text-center border-white">{showStopPref ?
                                <div>
                                    <h2 className="font-extrabold text-transparent text-lg bg-clip-text bg-gradient-to-r from-purple-400 to-orange-300">Distance to Route:</h2> <h6 className="font-extrabold text-transparent text-lg bg-clip-text bg-gradient-to-r from-red-400 to-orange-300">{distance} mi</h6> <input type={"range"} min={"1"} style={getBackgroundSize()} max={MAX} onChange={(e) => setDistance(e.target.value)} value={distance}/>
                                    <h2 className="font-extrabold text-transparent text-lg bg-clip-text bg-gradient-to-r from-purple-400 to-orange-300">Minimum Rating:</h2> <ReactStars count={5} value={rating} edit={false}
                                                                                                                                                                                         size={24}
                                                                                                                                                                                         color2={'#ffd700'} className="flex justify-center items-center"/> <input type={"range"} min={"1"} style={getBackgroundSize()} max={maxRating} onChange={(e) => setRating(e.target.value)} value={rating}/>
                                    <div className="flex items-center justify-center w-full mb-12">
                                        <label
                                            htmlFor="toogleC"
                                            className="flex items-center cursor-pointer"
                                        >
                                            <div className="relative">
                                                <input id="toogleC" type="checkbox" className="sr-only peer" checked={restaurants}
                                                       onChange={() => {setRestaurants(!restaurants)}}/>
                                                <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner peer-checked:bg-blue-300"></div>
                                                <div
                                                    className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 peer transition peer-checked:translate-x-6 peer-checked:bg-blue-500"></div>
                                            </div>
                                            <div className="ml-3 font-extrabold text-transparent text-lg bg-clip-text bg-gradient-to-r from-purple-400 to-orange-300">
                                                Restaurants
                                            </div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-center w-full mb-12">
                                        <label
                                            htmlFor="toogleE"
                                            className="flex items-center cursor-pointer"
                                        >
                                            <div className="relative">
                                                <input id="toogleE" type="checkbox" className="sr-only peer" checked={lodging}
                                                       onChange={() => {setLodging(!lodging)}}/>
                                                <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner peer-checked:bg-blue-300"></div>
                                                <div
                                                    className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 peer transition peer-checked:translate-x-6 peer-checked:bg-blue-500"></div>
                                            </div>
                                            <div className="ml-3 font-extrabold text-transparent text-lg bg-clip-text bg-gradient-to-r from-purple-400 to-orange-300">
                                                Lodging
                                            </div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-center w-full mb-12">
                                        <label
                                            htmlFor="toogleD"
                                            className="flex items-center cursor-pointer"
                                        >
                                            <div className="relative">
                                                <input id="toogleD" type="checkbox" className="sr-only peer" checked={gasStations}
                                                       onChange={() => {setGasStations(!gasStations)}}/>
                                                <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner peer-checked:bg-blue-300"></div>
                                                <div
                                                    className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 peer transition peer-checked:translate-x-6 peer-checked:bg-blue-500"></div>
                                            </div>
                                            <div className="ml-3 font-extrabold text-transparent text-lg bg-clip-text bg-gradient-to-r from-purple-400 to-orange-300">
                                                Gas Stations
                                            </div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-center w-full mb-12">
                                        <label
                                            htmlFor="toogleF"
                                            className="flex items-center cursor-pointer"
                                        >
                                            <div className="relative">
                                                <input id="toogleF" type="checkbox" className="sr-only peer" checked={attractions}
                                                       onChange={() => {setAttractions(!attractions)}}/>
                                                <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner peer-checked:bg-blue-300"></div>
                                                <div
                                                    className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 peer transition peer-checked:translate-x-6 peer-checked:bg-blue-500"></div>
                                            </div>
                                            <div className="ml-3 font-extrabold text-transparent text-lg bg-clip-text bg-gradient-to-r from-purple-400 to-orange-300">
                                                Restaurants
                                            </div>
                                        </label>
                                    </div>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-1 px-4 rounded-full" onClick={()=>{calculateStops()}}>Submit</button>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-1 px-4 rounded-full" onClick={()=>{setShowStopPref(!showStopPref)}}>Close</button>
                                </div>: <div><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-1 px-4 rounded-full" onClick={()=>{setShowStopPref(!showStopPref)}}>Preferences</button>
                                    <input type="text" placeholder="Search" onChange={(e) => setSearch(e.target.value)} value={search}/>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-1 px-4 rounded-full" onClick={placeSearch}>Search</button>
                            {selectedRoute != "" && <div className={styles.scrollable}><input type="text" placeholder="City" onChange={(e) => setCity(e.target.value)} value={city}/><StopResultsNew results={stopsResponse} markers={markers} trip={trip} setTrip={setTrip} city={city} setTest={setTest} setResults={setStopsResponse}/></div>}</div>}</div>}

                        </GoogleMap>}
                        <button type="button" onClick={handleSubmit}>Create Trip</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreateTrip