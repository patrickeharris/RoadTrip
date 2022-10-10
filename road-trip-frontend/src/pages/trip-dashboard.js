import React from 'react';
import Link from '@material-ui/core/Link';
import styles from "./styles/index.module.css";
import {Navbar, Card, TripList} from "../components";
import {Footer} from "../containers";
import {Button} from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import bcrypt from "bcryptjs";
import {myAxios} from "../util/helper";
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

function test() {
    let test = <p>hello</p>
    return test;
};

async function getTrips() {
    let add = "";
    try {
        const response = await myAxios.get(
            "/trips"
        );
        let trips = response.data;
        console.log(trips);
        trips.forEach((trip) => {
            add = add + <div><Card title={trip.trip_name}/></div>
            console.log(trip.trip_id);
        })
    } catch (err) {
        if (!err?.response) {
            console.log("No Server Response");
        } else {
            console.log(err?.response);
        }
    }
    return add;
};
require('dotenv').config();

function TripsPage() {
    return (

        <div className={styles.wrapper}>
            <div className={styles.gradient__bg}>
                <Navbar />
                <Carousel responsive={responsive}>
                    <TripList />
                </Carousel>
                <Footer />
            </div>
        </div>
    )
}

export default TripsPage