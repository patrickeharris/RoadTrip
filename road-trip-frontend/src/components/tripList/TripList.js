import React, {Component, useState} from 'react';
import {myAxios} from "../../util/helper";
import Carousel from "react-multi-carousel";
import {Card} from "../index";
import styles from "./triplist.module.css";
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

export default class TripList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    async componentDidMount() {
        const data = (await myAxios.get(
            "/trips", {
                headers: {
                    'Token': window.sessionStorage.getItem('token'),
                }
            }
        )).data;
        const curID = (await myAxios.get("/register/curUser")).data.user_id;
        this.setState({ data, curID });
    }
    render() {
        const { data, curID } = this.state;

        const itemList = data.map( function (item) {
            console.log(item);
            if (item.user_id === curID) {
                console.log(item);
                const description = "Start: " + item.start + "\n End: " + item.end + "\n Date: " + item.date;
                const id = item.trip_id;

                return <div><Card title={item.tripName} description={description}
                                  playlistButton=
                                      {

                                          <button onClick={function addPlaylist() {
                                          window.sessionStorage.setItem('curTrip', item.trip_id);
                                          console.log(window.sessionStorage.getItem('spotifyLogged'));
                                          if (window.sessionStorage.getItem('spotifyLogged') === 'true') {
                                              window.location.replace("/add-playlist");
                                          } else {
                                              window.sessionStorage.setItem('spotifyLogged', 'true');
                                              fetch("http://trailblazers.gq:8080/spotify-login", {
                                                  headers: {
                                                      "Content-Type": "application/json",
                                                      'Access-Control-Allow-Origin': '*',
                                                      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                                                  }
                                              })
                                                  .then((response) => response.text())
                                                  .then((response) => {
                                                      window.location.replace(response);
                                                  })
                                                  .catch((error) => {
                                                      console.log(error);
                                                  })
                                          }
                                      }}>Add Playlist</button>
                                  }
                                  editButton={<button onClick={function editTrip() {
                                      window.sessionStorage.setItem('curTrip', item.trip_id);
                                      window.location.replace('/edit-trip');
                                  }}>Edit Trip</button>}
                                  rateButton={<button onClick={function rateTrip() {
                                      window.sessionStorage.setItem('curTrip', item.trip_id);
                                      window.location.replace('/rate-trip?tripId=' + item.trip_id);
                                  }}>Rate Trip</button>}
                                  cancelButton={<button onClick={async function cancelTrip(){

                                      await myAxios.delete("/cancel-trip",{
                                          params: {tripId: id},
                                          headers: {
                                              "Content-Type": "application/json",
                                              'Access-Control-Allow-Origin': '*',
                                              'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                                          }});
                                      window.location.replace("/trip-dashboard");

                                  }}>Cancel Trip</button>}
                                  startLoc={item.startLoc} endLoc={item.endLoc} selectedRoute={item.selectedRoute} stops={item.route.stops}/>
                </div>
            }
        });
        return <Carousel responsive={responsive}>{itemList}</Carousel>;
    }

}