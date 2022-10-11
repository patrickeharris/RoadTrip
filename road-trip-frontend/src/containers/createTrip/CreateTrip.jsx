import React, {useState, useMemo} from 'react'
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
import {Checkbox} from "@material-ui/core";
import {Label} from "@material-ui/icons";

const Results = ({results, setSelectedRoute}) => {
    const containerStyle = {
        width: '400px',
        height: '400px'
    };
    function selectOnlyThis(id){
        var myCheckbox = document.getElementsByName("myCheckbox");
        Array.prototype.forEach.call(myCheckbox,function(el){
            el.checked = false;
        });
        id.target.checked = true;
        setSelectedRoute(id.target.value);
    }
    const [selectedStart, setSelectedStart] = useState({lat: 43.45, lng: -80.49});
    const resultList = results.routes.map(function(item) {
        //console.log(item);
        const t = [];
        t.routes = [item];
        t.request = results.request;
        return <div><h2>Distance: {item.legs[0].distance.text}</h2><h2>Duration: {item.legs[0].duration.text}</h2><GoogleMap center={selectedStart} mapContainerStyle={containerStyle} zoom={15}> <DirectionsRenderer directions={t}/> </GoogleMap><input
            type="checkbox" name="myCheckbox" value={item.legs[0].distance.text} onClick={selectOnlyThis}/></div>
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
            <GoogleMap id="map" zoom={10} center={selected} mapContainerStyle={containerStyle} mapContainerClassName="map-container">
                {selected && <Marker position={selected}/>}
            </GoogleMap>
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
    const [tolls, setTolls] = useState(true);
    const [highways, setHighways] = useState(true);
    const [restaurants, setRestaurants] = useState(true);
    const [lodging, setLodging] = useState(true);
    const [gasStations, setGasStations] = useState(true);
    const [attractions, setAttractions] = useState(true);
    const [selectedRoute, setSelectedRoute] = useState("");
    const [selectedStart, setSelectedStart] = useState({lat: 43.45, lng: -80.49});
    const [selectedEnd, setSelectedEnd] = useState({lat: 43.45, lng: -80.49});
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [stopsResponse, setStopsResponse] = useState(null);

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
        console.log(results);
        setDirectionsResponse(results);
    }
    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            setStopsResponse(results);
            for (var i = 0; i < results.length; i++) {
                console.log(results[i]);
            }
        }
    }
    async function calculateStops(){

        var map = new google.maps.Map(document.getElementById('map'), {
            center: selectedStart,
            zoom: 10
        });
        var request = {
            location: selectedStart,
            radius: '500',
            types: ['restaurant']
        };

        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch(request, callback);
    }
    const handleTolls = () => {
        setTolls(!tolls);
    };
    const handleHighways = () => {
        setHighways(!highways);
    };
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
            const response = await myAxios.post(
                "/create-trip",
                JSON.stringify({tripName, start, startLoc, end, endLoc, date, tolls, highways, userID, selectedRoute}),
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
                        <input type="text" placeholder="User" onChange={(e) => setUserID(e.target.value)} value={userID}/>
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
                        <button type="button" onClick={calculateRoute}>Calculate Routes</button>
                        <div className={styles.results}>
                            {directionsResponse != null ? (<div><Results results={directionsResponse} setSelectedRoute={setSelectedRoute}/></div>) : (<></>)}
                        </div>
                        <h2 className={globalStyles.gradientText}>Chosen Route: {selectedRoute}</h2>
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