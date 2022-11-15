import React, {useCallback, useEffect, useState} from 'react'
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

const Trip = ({trip}) => {
    return trip.map(function (item) {
        console.log(item);
        //return <div><h2>Name: {item.stopName}</h2></div>
        return <li className={`${styles.listContainer} ${styles.show}`}>
            <div className={`${styles.listItem} ${styles.show}`}>{item.stopName}</div>
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
        //console.log(item);
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

const StopResultsNew = ({results, markers, trip, setTrip, updateTrip, city}) => {
    let numRestaurants = 0;
    let numGas = 0;
    let numLodging = 0;
    let numAttractions = 0;
    function removeListItem(e){
        let container = e.target;
        container.classList.remove(styles.show);
        container.parentElement.classList.remove(styles.show);
        /*const listItem = container.querySelector('.listItem');
        listItem.classList.remove(styles.show);
        container.ontransitionend = function(){
            container.remove();
        }*/
    }
    function test(thing) {
        const test = results.find(element => element.vicinity === thing.target.value)
        console.log(thing.target.checked)
        if (trip.find(element => element.stopName === test.stopName) === undefined){
            if(thing.target.checked) {
                trip.splice(trip.length - 1, 0, test);
                console.log(trip);
                const t = document.getElementById("tripList");
                const container = document.createElement('li'); container.classList.add(styles.listContainer); container.setAttribute('role', 'listitem');
                const listItem = document.createElement('div'); listItem.classList.add(styles.listItem); listItem.innerHTML = test.stopName;
                container.onclick = removeListItem;
                container.append(listItem);
                t.insertBefore(container, t.lastChild);
                setTimeout(function(){
                    container.classList.add(styles.show); listItem.classList.add(styles.show);
                }, 15);
            }
        }
        else if(!thing.target.check){
            trip.splice(trip.findIndex(element => element.stopName === test.stopName), 1);
        }
        setTrip(trip);
    }
    return results.map(function (item) {
        if(city === "" || item.vicinity.toLowerCase().includes(city.toLowerCase())) {
            console.log(item.stopType);
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
            return <div className={styles.stopResults}><img src={item.image} width="50" height="50"/>
                <h4>{item.stopName}</h4><h6>{item.vicinity}</h6><ReactStars count={5} value={item.rating} edit={false}
                                                                            size={24}
                                                                            color2={'#ffd700'}/><input onClick={test}
                                                                                                       value={item.vicinity}
                                                                                                       type="checkbox"></input>
            </div>
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
            console.log("hmm")
            trip.push({stopName: selectedStart.name, })
            trip.push({stopName: selectedEnd.name})
            setTrip(trip);

        }
    }, [map, selectedStart, selectedEnd, trip]);

    async function calculateRoute(){
        console.log("calculating...")
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
        console.log(results);
        setDirectionsResponse(results);
    }
    function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            let arr = stopsResponse;
            //setStopsResponse(stopsResponse.concat(results));
            for (var i = 0; i < results.length; i++) {
                arr.push(results[i]);
                setStopsResponse(arr)
                console.log(results[i]);
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
        console.log("calc")

        for(let j = 0;j< waypoints.length;j+=20) {
            if(restaurants) {
                service.nearbySearch({
                    location: {lat: waypoints[j][0], lng: waypoints[j][1]},
                    radius: distance * 1000,
                    type: ['restaurant']
                }, callback);
            }
            if(lodging) {
                service.nearbySearch({
                    location: {lat: waypoints[j][0], lng: waypoints[j][1]},
                    radius: distance * 1000,
                    type: ['lodging']
                }, callback);
            }
            if(gasStations) {
                service.nearbySearch({
                    location: {lat: waypoints[j][0], lng: waypoints[j][1]},
                    radius: distance * 1000,
                    type: ['gas_station']
                }, callback);
            }
            if(attractions) {
                service.nearbySearch({
                    location: {lat: waypoints[j][0], lng: waypoints[j][1]},
                    radius: distance * 1000,
                    type: ['landmark']
                }, callback);
            }


            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        //console.log(results[i]);
                        if(stopsResponse.findIndex(e => e.stopName === results[i].name) === -1 && results[i].rating >= rating)
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
            console.log(id);
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
        width: '1280px',
        height: '1280px'
    };

    return (
        <div className={globalStyles.sectionPadding}>
            <ToastContainer />
            <div className={styles.register}>
                <div className={styles.registerContent}>
                    <h1 className={globalStyles.gradientText}>Create Trip</h1>
                    <div className={styles.registerInput}>
                        <div className={styles.float}>
                            <input type="text" placeholder="Trip Name" onChange={(e) => setTripName(e.target.value)} value={tripName}/>
                            <Places placeholderText="Start" start={start} setStart={setStart} selected={selectedStart} setSelected={setSelectedStart}/>
                            <Places placeholderText="End" start={end} setStart={setEnd} selected={selectedEnd} setSelected={setSelectedEnd}/>
                            <input type="date" placeholder="Date" onChange={(e) => setDate(e.target.value)} value={date}/>
                            <h2 className={globalStyles.gradientText}>Tolls: <Checkbox label="Tolls"
                                                                                       value={tolls} checked={tolls}
                                                                                       onChange={handleTolls}
                            /></h2>
                            <h2 className={globalStyles.gradientText}>Highways: <Checkbox label="Highways"
                                                                                          value={highways} checked={highways}
                                                                                          onChange={handleHighways}
                            /></h2>
                            {selectedRoute != "" && <div className={styles.scrollable}><input type="text" placeholder="City" onChange={(e) => setCity(e.target.value)} value={city}/><StopResultsNew results={stopsResponse} markers={markers} trip={trip} setTrip={setTrip} city={city}/></div>}
                        </div>
                        { !showStopPref &&
                        <div className={styles.stopFloatButton}>
                            <button onClick={()=>{setShowStopPref(!showStopPref)}}>Preferences</button>
                            { trip.length > 0 && <ul className={styles.list} id="tripList"><li className={`${styles.listContainer} ${styles.show}`}>
                                <div className={`${styles.listItem} ${styles.show}`}>{start}</div>
                            </li><li className={`${styles.listContainer} ${styles.show}`}>
                                <div className={`${styles.listItem} ${styles.show}`}>{end}</div>
                            </li></ul>}
                        </div>}
                        { showStopPref && <div className={styles.stopFloat}>
                            <h2 className={globalStyles.gradientText}>Distance to Route: <input type={"range"} min={"1"} style={getBackgroundSize()} max={MAX} onChange={(e) => setDistance(e.target.value)} value={distance}/></h2><h6>{distance} mi</h6>
                            <h2 className={globalStyles.gradientText}>Minimum Rating: <input type={"range"} min={"1"} style={getBackgroundSize()} max={maxRating} onChange={(e) => setRating(e.target.value)} value={rating}/></h2><h6>{rating} stars</h6>
                            <h2 className={globalStyles.gradientText}>Restaurants: <Checkbox label="Restaurants"
                                                                                             value={restaurants} checked={restaurants}
                                                                                             onChange={() => {setRestaurants(!restaurants)}}
                            /></h2>
                            <h2 className={globalStyles.gradientText}>Lodging: <Checkbox label="Lodging"
                                                                                         value={lodging} checked={lodging}
                                                                                         onChange={() => {setLodging(!lodging)}}
                            /></h2>
                            <h2 className={globalStyles.gradientText}>Gas Stations: <Checkbox label="Gas Stations"
                                                                                              value={gasStations} checked={gasStations}
                                                                                              onChange={() => {setGasStations(!gasStations)}}
                            /></h2>
                            <h2 className={globalStyles.gradientText}>Attractions: <Checkbox label="Attractions"
                                                                                             value={attractions} checked={attractions}
                                                                                             onChange={() => {setAttractions(!attractions)}}
                            /></h2>
                            <button onClick={()=>{calculateStops()}}>Submit</button>
                            <button onClick={()=>{setShowStopPref(!showStopPref)}}>Close</button>
                        </div>}
                        {isLoaded && <GoogleMap id="map" zoom={10} center={defaultStart} onLoad={onLoad} mapContainerStyle={containerStyle} mapContainerClassName="map-container">
                            {selectedStart && <Marker position={selectedStart}/>}
                            {selectedEnd && <Marker position={selectedEnd}/>}
                        </GoogleMap>}
                        {selectedStart && selectedEnd && (!selectedRoute || open) && <div className={styles.floatRoutes}>

                            {directionsResponse != null ? (<div className={styles.menu}><Results results={directionsResponse} setSelectedRoute={setSelectedRoute} selectedRoute={selectedRoute} map={map}/></div>) : (<></>)}
                        <h2 className={globalStyles.gradientText}>Chosen Route: {selectedRoute}</h2>
                        </div>}
                        <button type="button" onClick={handleSubmit}>Create Trip</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreateTrip