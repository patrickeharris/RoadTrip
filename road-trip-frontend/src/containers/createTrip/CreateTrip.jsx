import React, {useState, useMemo, useCallback, useEffect} from 'react'
import styles from './trip.module.css'
import globalStyles from "../container.module.css";
import {myAxios} from "../../util/helper";
import {GoogleMap, useLoadScript, Marker, DirectionsRenderer} from "@react-google-maps/api";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption} from "@reach/combobox";
import bcrypt from 'bcryptjs'
import "@reach/combobox/styles.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {Checkbox} from "@material-ui/core";
import {Label} from "@material-ui/icons";

const Test = ({start, end, selectedStart, selectedEnd, setDirectionsResponse, highways, tolls, directionsResponse}) => {
    async function calc() {
        console.log("calculating...")
        if (start === "" || end === "") {
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
    if(directionsResponse == null) {
        calc();
    }
    return <div></div>
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

        setSelectedRoute(id.target.value);
    }
    function getChecked(id){
        if(id.target.value === selectedRoute){
            return true;
        }
        return false;
    }
    const [selectedStart, setSelectedStart] = useState({lat: 43.45, lng: -80.49});
    const resultList = results.routes.map(function(item) {
        //console.log(item);
        const t = [];
        t.routes = [item];
        t.request = results.request;
        routes.push(t);
        var directionsRenderer = new window.google.maps.DirectionsRenderer();
        directionsRenderer.setDirections(t);
        directionsRenderer.setMap(map);
        return <div><h2>Distance: {item.legs[0].distance.text}</h2><h2>Duration: {item.legs[0].duration.text}</h2><GoogleMap center={selectedStart} mapContainerStyle={containerStyle} zoom={15}> <DirectionsRenderer directions={t}/> </GoogleMap><input
            type="checkbox" name="myCheckbox" value={item.legs[0].distance.text} onClick={selectOnlyThis} checked={getChecked}/></div>
    })
    return resultList;
}

const StopResults = ({results}) => {
    const resultList = results.map(function(item) {
        return <div><h2 className={globalStyles.gradientText}>Name: {item.name}</h2><h2 className={globalStyles.gradientText}>Address: {item.vicinity}</h2><input
            type="checkbox" name="stops" value={item.name}/></div>
    })
    return resultList;
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
        setSelected({lat, lng});
    }

    return <Combobox onSelect={handleSelect}>
        <ComboboxInput value={start} onChange={e => {setStart(e.target.value); setValue(e.target.value)}} disabled={!ready} className="combobox-input" placeholder={placeholderText}/>
        <ComboboxPopover>
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
    const [selectedStart, setSelectedStart] = useState(null);
    const [selectedEnd, setSelectedEnd] = useState(null);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [stopsResponse, setStopsResponse] = useState([]);

    const onLoad = useCallback((map) => setMap(map), []);

    useEffect(() => {
        if (map) {
            var bounds = new google.maps.LatLngBounds();
            bounds.extend(selectedStart);
            bounds.extend(selectedEnd);
            map.fitBounds(bounds);
        }
    }, [map, selectedStart, selectedEnd]);

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
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            let arr = stopsResponse;
            //setStopsResponse(stopsResponse.concat(results));
            for (var i = 0; i < results.length; i++) {
                arr.push(results[i]);
                setStopsResponse(arr)
                console.log(results[i]);
            }
        }
    }

    function PolygonArray(latitude) {
        const R = 6378137;
        const pi = 3.14;
        const upper_offset = 1000;
        const lower_offset = -1000;
        let Lat_up = upper_offset / R;
        let Lat_down = lower_offset / R;
        let lat_upper = latitude + (Lat_up * 180) / pi;
        let lat_lower = latitude + (Lat_down * 180) / pi;
        return [lat_upper, lat_lower];
    }

    function PolygonPoints() {

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
        let waypoints = []
        var polyline = require( 'google-polyline' );
        waypoints = polyline.decode( directionsResponse.routes[0].overview_polyline );



        /*let polypoints = waypoints
        let PolyLength = polypoints.length;
        let UpperBound = [];
        let LowerBound = [];
        for (let j = 0; j <= PolyLength - 1; j++) {
            let NewPoints = PolygonArray(polypoints[j][0]);
            UpperBound.push({ lat: NewPoints[0], lng: polypoints[j][1] });
            LowerBound.push({ lat: NewPoints[1], lng: polypoints[j][1] });
        }
        let reversebound = LowerBound.reverse();
        let FullPoly = UpperBound.concat(reversebound);

        const PolygonBound = new google.maps.Polygon({
            paths: FullPoly,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
        });*/
        var service = new google.maps.places.PlacesService(map);
        var infowindow =  new google.maps.InfoWindow({
            content: ''
        });
        for(let j = 0;j< waypoints.length;j+=40) {
            service.nearbySearch({
                location: {lat: waypoints[j][0], lng: waypoints[j][1]},
                radius: '20000',
                type: ['restaurant']
            }, callback);

            function callback(results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        var marker = new google.maps.Marker({
                            position: results[i].geometry.location,
                            map,
                            title: results[i].name
                        });
                        bindInfoWindow(marker, map, infowindow, "<p>" + marker.title + "</p> <button>Add Stop</button>");
                    }
                }
            }
        }


        /*while (stopsResponse.length > 0) {
            stopsResponse.pop();
            setStopsResponse(stopsResponse);
            console.log("popp")
        }
        var map = new google.maps.Map(document.getElementById('map'), {
            center: selectedStart,
            zoom: 10
        });
        var request;
        var service = new google.maps.places.PlacesService(map);
        if (restaurants) {
            request = {
                location: selectedStart,
                radius: '500',
                types: ['restaurant']
            };
            service.nearbySearch(request, callback);
        }
        if(gasStations) {
            request = {
                location: selectedStart,
                radius: '500',
                types: ['gas_station']
            };
            service.nearbySearch(request, callback);
        }

        if(lodging){
            request = {
                location: selectedStart,
                radius: '500',
                types: ['lodging']
            };
            service.nearbySearch(request, callback);
        }

        if(attractions) {
            request = {
                location: selectedStart,
                radius: '500',
                types: ['amusement_park']
            };
            service.nearbySearch(request, callback);
        }*/
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
            console.log(stops);
            const endLoc = selectedEnd.lat + " " + selectedEnd.lng;
            let id = (await myAxios.get("/register/curUser")).data.user_id;
            const response = await myAxios.post(
                "/create-trip",
                JSON.stringify({tripName, start, startLoc, end, endLoc, date, tolls, highways, user_id: id, selectedRoute}),
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
    }
    const containerStyle = {
        width: '400px',
        height: '400px'
    };

    return (
        <div className={globalStyles.sectionPadding}>
            <ToastContainer />
            <div className={styles.register}>
                <div className={styles.registerContent}>
                    <h1 className={globalStyles.gradientText}>Create Trip</h1>
                    <div className={styles.registerInput}>
                        <input type="text" placeholder="Trip Name" onChange={(e) => setTripName(e.target.value)} value={tripName}/>
                        <Places placeholderText="Start" start={start} setStart={setStart} selected={selectedStart} setSelected={setSelectedStart}/>
                        <Places placeholderText="End" start={end} setStart={setEnd} selected={selectedEnd} setSelected={setSelectedEnd}/>
                        <input type="date" placeholder="Date" onChange={(e) => setDate(e.target.value)} value={date}/>
                        {isLoaded && selectedStart && selectedEnd && <GoogleMap id="map" zoom={10} center={selectedStart} onLoad={onLoad} mapContainerStyle={containerStyle} mapContainerClassName="map-container">
                            {selectedStart && <Marker position={selectedStart}/>}
                            {selectedEnd && <Marker position={selectedEnd}/>}
                        </GoogleMap>}
                        <h1 className={globalStyles.gradientText}>Route Preferences</h1>
                        <h2 className={globalStyles.gradientText}>Tolls: <Checkbox label="Tolls"
                                                                                   value={tolls} checked={tolls}
                                                                                   onChange={handleTolls}
                        /></h2>
                        <h2 className={globalStyles.gradientText}>Highways: <Checkbox label="Highways"
                                  value={highways} checked={highways}
                                  onChange={handleHighways}
                        /></h2>
                        <h1 className={globalStyles.gradientText}>Routes</h1>
                        <button type="button" onClick={() => {calculateRoute(); setOpen(o => !o)}}>Calculate Routes</button>
                        <Popup open={open} closeOnDocumentClick onClose={closeModal}>
                        <div className={styles.results}>

                            {directionsResponse != null ? (<div className={styles.menu}><Results results={directionsResponse} setSelectedRoute={setSelectedRoute} selectedRoute={selectedRoute} map={map}/></div>) : (<></>)}
                        </div>
                        <h2 className={globalStyles.gradientText}>Chosen Route: {selectedRoute}</h2>
                        </Popup>
                        <h1 className={globalStyles.gradientText}>Stop Preferences</h1>
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
                        <h1 className={globalStyles.gradientText}>Stops</h1>
                        <button type="button" onClick={calculateStops}>Calculate Stops</button>
                        <div>
                            {stopsResponse != null ? (<div><StopResults results={stopsResponse}/></div>) : (<></>)}
                        </div>
                        <button type="button" onClick={handleSubmit}>Create Trip</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateTrip