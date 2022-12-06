import React, {useEffect, useState} from "react";
import styles from "./rating.module.css";
import {RatingCard, Star} from "../index";
import {myAxios} from "../../util/helper";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";

const Rating = ({ tripId }) => {
    const [rating, setRating] = useState(0);
    const [stopRatings, setStopRatings] = useState([]);
    const [message, setMessage] = useState('');
    const [trip_id, setTrip_Id] = useState("");
    const [ratingStars, setRatingStars] = useState([{
        title: "1 star", isToggled: false
    }, {
        title: "2 stars", isToggled: false
    }, {
        title: "3 stars", isToggled: false
    }, {
        title: "4 stars", isToggled: false
    }, {
        title: "5 stars", isToggled: false
    }])
    const [stops, setStops] = useState([]);

    useEffect(() => {
        const fetchStops = async () => {
            const response = await myAxios.get("/stops?tripId=" + tripId,
                {
                    headers: {
                        'Access-Control-Allow-Origin' : '*',
                        'Authorization': window.sessionStorage.getItem('token')
                    }
                });
            return response.data
        }

        fetchStops().then(r => setStops(r))
    }, [])

    const handleStarClick = (index) => {
        for (let i = 0; i < ratingStars.length; i++) {
            ratingStars[i].isToggled = i <= index;
        }

        setRating(index + 1);
    }


    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    }

    const handleFormSubmit = async () => {
        if (rating === 0) {
            alert("Please enter a star rating for your trip!")
            return
        }

        if (message.length === 0) {
            alert("Please enter some feedback in the text box!")
            return
        }

        setTrip_Id(window.sessionStorage.getItem('curTrip'));

        const response = await myAxios.post("/rating/add-rating", JSON.stringify({
            trip_id: parseInt(tripId),
            score: rating,
            stopRatings: stopRatings,
            message
        }), {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
                'Authorization': window.sessionStorage.getItem('token')
            }, withCredentials: true,
        });

        toast.success('Successfully Rated Trip!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });

        window.location.replace("/trip-dashboard");
    }

    return (<div>
            <ToastContainer/>
            <div className="flex justify-center items-center flex-col">

                <h1 className="font-sans text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-orange-300 mb-3 mt-4">Rate Your Trip</h1>
                <h1 className="font-sans text-white font-bold text-4xl mt-3">
                    How would you rate your trip?
                </h1>
                <div className={styles.rateTrip__formWrapper}>
                    <div className={styles.rateTrip__starSelectWrapper}>
                        {ratingStars.map((star, index) => {
                            return (<Star title={star.title} isToggled={star.isToggled}
                                          onClick={() => handleStarClick(index)}/>)
                        })}
                    </div>

                    <div className="text-white font-bold font-sans text-2xl mt-7 mb-2">Stop Ratings</div>
                    {
                        stops.map((stop, index) => {
                            return (
                                <RatingCard className="font-sans" name={stop.stopName} stopRatings={stopRatings} setStopRatings={setStopRatings} />
                            )
                        })
                    }

                    <textarea placeholder="Tell us a little bit more about how we did" className={styles.rateTrip__textArea} onChange={handleMessageChange}/>
                </div>
                <button className="bg-red-500 hover:bg-red-700 text-white text-lg rounded py-2 px-5 font-bold" onClick={handleFormSubmit}>Submit</button>
            </div>
        </div>)
}

export default Rating;