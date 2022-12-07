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

        if (window.sessionStorage.getItem('token') === null) {
            window.location.replace("/login");
        }

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
            console.log("selected")
            console.log(item)

            return <div key={id}>
                <Card title={item.tripName} start={start} end={end} date={date} menu={null} startLoc={item.startLoc}
                      endLoc={item.endLoc} selectedRoute={item.selectedRoute} stops={item.route.stops} tripid={item.trip_id} playlistid={item.playlist_id}>
                </Card>
            </div>
        }
    })

    return <Carousel responsive={responsive}>{itemList}</Carousel>
}

export default TripList