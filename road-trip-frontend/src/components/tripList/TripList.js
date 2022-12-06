import React, {Component, useState, useEffect} from 'react';
import {myAxios} from "../../util/helper";
import Carousel from "react-multi-carousel";
import {Card} from "../index";
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

const TripList = () => {
    const [data, setData] = useState([]);
    const [curID, setCurID] = useState("");

    useEffect(() => {
        async function getData() {
            const response = (await myAxios.get(
                "/trips", {
                    headers: {
                        'Authorization': window.sessionStorage.getItem('token')
                    },
                    withCredentials: true,
                }
            )).data;
            setData(response);
            const r = (await myAxios.get("/register/curUser", {
                headers:{
                    'Access-Control-Allow-Origin' : '*',
                    'Authorization': window.sessionStorage.getItem('token')}
            })).data.user_id;
            setCurID(r);
        }
        getData();
    }, [])

    const itemList = data.map((item) => {
        if (item.user_id === curID) {
            console.log("t2");
            console.log(item);
            const start = "Start: " + item.start;
            const end = "End: " + item.end;
            const date = "Date: " + item.date;
            const id = item.trip_id;

            return <div key={id}>
                <Card title={item.tripName} start={start} end={end} date={date} menu={null} startLoc={item.startLoc}
                      endLoc={item.endLoc} selectedRoute={item.selectedRoute} stops={item.route.stops} tripid={item.trip_id} playlistid={item.playlist_id}>
                </Card>
            </div>
        }
    })

    return <Carousel responsive={responsive}>{itemList}</Carousel>
}

/*export default class TripList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            curID: null,
            toggle: false
        };
    }
    async componentDidMount() {

        const data = (await myAxios.get(
            "/trips", {
                headers: {
                    'Authorization': window.sessionStorage.getItem('token')
                },
                withCredentials: true,
            }
        )).data;
        const curID = (await myAxios.get("/register/curUser", {
            headers:{
                'Access-Control-Allow-Origin' : '*',
                'Authorization': window.sessionStorage.getItem('token')}
        })).data.user_id;
        this.setState({ data, curID });
    }
    render() {
        let { data, curID, toggle} = this.state;
        let tog = false;

        function update(){
            tog = !tog;
            console.log(tog)
            this.setState({ state: this.state });
        }

        const itemList = data.map( function (item) {
            console.log(item);
            if (item.user_id === curID) {
                console.log(item);
                const start = "Start: " + item.start;
                const end = "End: " + item.end;
                const date = "Date: " + item.date;
                const id = item.trip_id;

                return <div><Card title={item.tripName} start={start} end={end} date={date}



                                  menu={<div>
                                      {
                                          tog ?
                                          <div id="dropdown" className="z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                                              <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
                                                  <li>
                                                      <a className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                                                         onClick={function addPlaylist() {
                                                             window.sessionStorage.setItem('curTrip', item.trip_id);
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
                                                      <a className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                                         onClick={function editTrip() {
                                                             window.sessionStorage.setItem('curTrip', item.trip_id);
                                                             window.location.replace('/edit-trip');}}>Edit Trip</a>
                                                  </li>
                                                  <li>
                                                      <a className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                                         onClick={function rateTrip() {
                                                             window.sessionStorage.setItem('curTrip', item.trip_id);
                                                             window.location.replace('/rate-trip?tripId=' + item.trip_id);}}>Rate Trip</a>
                                                  </li>
                                                  <li>
                                                      <a className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                                         onClick={async function cancelTrip(){

                                                             await myAxios.delete("/cancel-trip",{
                                                                 params: {tripId: id},
                                                                 headers: {
                                                                     "Content-Type": "application/json",
                                                                     'Authorization': window.sessionStorage.getItem('token')
                                                                 }});
                                                             window.location.replace("/trip-dashboard");}}>Cancel Trip</a>
                                                  </li>
                                              </ul>
                                          </div> :
                                              <button onClick={update} className="text-blue-800 text-2xl">...</button>
                                      }
                                  </div>}/*
                menu={<menu className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
                    <div className="container flex flex-wrap items-center justify-between mx-auto">
                        <button data-collapse-toggle="navbar-default" type="button"
                                className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                aria-controls="navbar-default" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                      clip-rule="evenodd"></path>
                            </svg>
                        </button>
                        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                <li>
                                    <a
                                       className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                                       onClick={function addPlaylist() {
                                           window.sessionStorage.setItem('curTrip', item.trip_id);
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
                                    <a
                                       className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                       onClick={function editTrip() {
                                           window.sessionStorage.setItem('curTrip', item.trip_id);
                                           window.location.replace('/edit-trip');}}>Edit Trip</a>
                                </li>
                                <li>
                                    <a
                                       className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                       onClick={function rateTrip() {
                                           window.sessionStorage.setItem('curTrip', item.trip_id);
                                           window.location.replace('/rate-trip?tripId=' + item.trip_id);}}>Rate Trip</a>
                                </li>
                                <li>
                                    <a
                                       className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                                       onClick={async function cancelTrip(){

                                           await myAxios.delete("/cancel-trip",{
                                               params: {tripId: id},
                                               headers: {
                                                   "Content-Type": "application/json",
                                                   'Authorization': window.sessionStorage.getItem('token')
                                               }});
                                           window.location.replace("/trip-dashboard");}}>Cancel Trip</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </menu>} /*
                                  playlistButton=
                                      {
                                          <button onClick={function addPlaylist() {
                                          window.sessionStorage.setItem('curTrip', item.trip_id);
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
                                          }
                                      }}>Add Playlist</button>
                                  }
                                  editButton={<button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                                                      onClick={function editTrip() {
                                      window.sessionStorage.setItem('curTrip', item.trip_id);
                                      window.location.replace('/edit-trip');
                                  }}>Edit Trip</button>}
                                  rateButton={<button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={function rateTrip() {
                                      window.sessionStorage.setItem('curTrip', item.trip_id);
                                      window.location.replace('/rate-trip?tripId=' + item.trip_id);
                                  }}>Rate Trip</button>}
                                  cancelButton={<button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={async function cancelTrip(){

                                      await myAxios.delete("/cancel-trip",{
                                          params: {tripId: id},
                                          headers: {
                                              "Content-Type": "application/json",
                                              'Authorization': window.sessionStorage.getItem('token')
                                          }});
                                      window.location.replace("/trip-dashboard");

                                  }}>Cancel Trip</button>}
                                  startLoc={item.startLoc} endLoc={item.endLoc} selectedRoute={item.selectedRoute} stops={item.route.stops}></Card>
                </div>
            }
        });
        return <Carousel responsive={responsive}>{itemList}</Carousel>;
    }

}*/

export default TripList