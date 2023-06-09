import React from 'react';
import styles from "./styles/index.module.css";
import {Navbar, TripList} from "../components";
import {Footer} from "../containers";
import 'react-multi-carousel/lib/styles.css';

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

function TripsPage() {

    return (
        <div className="h-screen">
            <div className={styles.gradient__bg}>
                <Navbar />
                <div className='flex justify-center py-10'>
                    <button className='font-sans font-bold bg-red-500 hover:bg-red-700 text-white text-lg py-3 px-10 rounded' onClick={() => window.location.replace("/create-trip")} >Add Trip</button>
                </div>
                <div className="h-screen">
                    <TripList />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default TripsPage