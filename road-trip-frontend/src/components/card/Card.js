/* global google */
import React, {useState} from "react";
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

function CardContent(props) {
    return (
        <div className={styles.styleCardContent}>
            <p className={styles.styleCardTitle}>{props.title}</p>
            <p className={styles.styleDescription}>{props.description}</p>
            <p className={styles.styleButton}>{props.playlistButton}</p>
            <p className={styles.styleButton}>{props.editButton}</p>
            <p className={styles.styleButton}>{props.rateButton}</p>
        </div>
    );
}

const Map = (props) => {
    const [results, setResults] = useState(null)
    async function getResults() {
        const directionsService = new google.maps.DirectionsService();
        return await directionsService.route({
            origin: props.startLoc,
            destination: props.endLoc,
            travelMode: google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true,
            avoidHighways: false,
            avoidTolls: false});
    }
    const containerStyle = {
        width: '300px',
        height: '300px'
    };

    const [selected, setSelected] = useState({lat: 43.45, lng: -80.49});
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: "AIzaSyDJGTHHgwc5HXLi7qDeMAvecrT0ts-7jLU",
        libraries: ["places"],
    });
    if(isLoaded) {
        getResults().then((response) => {
            if(results === null) {
                const resultList = response.routes.filter(function (item) {
                    //console.log(item);
                    const t = [];
                    t.push(item);
                    if (item.legs[0].distance.text === props.selectedRoute) {
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
    return (<>{isLoaded ?
        <GoogleMap zoom={10} center={selected} mapContainerStyle={containerStyle} mapContainerClassName="map-container">
            <DirectionsRenderer directions={results}/>
        </GoogleMap> : <></>}</>);
}

export default class Card extends React.Component {
    render() {
        console.log(this.props.startLoc)
        return (
            <div style={{ width: this.props.width + "px" }}>
                <div className={styles.styleCard}>
                    <Map startLoc={this.props.startLoc} endLoc={this.props.endLoc} selectedRoute={this.props.selectedRoute}/>
                    <CardImage image={this.props.image} width={this.props.width} />
                    <CardContent
                        title={this.props.title}
                        location={this.props.location}
                        description={this.props.description}
                        playlistButton={this.props.playlistButton}
                        editButton={this.props.editButton}
                        rateButton={this.props.rateButton}
                    />
                </div>
            </div>
        );
    }
}

// 2. Defaults /////////////////////////////////////////////
Card.defaultProps = {
    width: 350,
    title: "Template - Card Title",
    location: "Location label",
    description: "Template description textbox"
};
