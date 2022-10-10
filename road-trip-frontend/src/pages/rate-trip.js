import React, {useState} from 'react';
import styles from "./styles/index.module.css";
import {Navbar, Star} from "../components";
import {Footer} from "../containers";
import axios from "axios";

require('dotenv').config();

function RateTripPage() {
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');
    const [ratingStars, setRatingStars] = useState([
        {
            title: "1 star",
            isToggled: false
        },
        {
            title: "2 stars",
            isToggled: false
        },
        {
            title: "3 stars",
            isToggled: false
        },
        {
            title: "4 stars",
            isToggled: false
        },
        {
            title: "5 stars",
            isToggled: false
        }
    ])

    const handleStarClick = (index) => {
        for (let i = 0; i < ratingStars.length; i++) {
            ratingStars[i].isToggled = i <= index;
        }

        setRating(index + 1);
    }

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    }

    const handleFormSubmit = () => {
        if (rating === 0) {
            alert("Please enter a star rating!")
            return
        }

        if (message.length === 0) {
            alert("Please enter some feedback in the text box!")
            return
        }

        axios.post("http://localhost:8080/rating/add", {
            "score": rating,
            "message": message
        })
            .then((response) => {
                console.log(response)
                alert("Thank you for taking the time to give feedback!")
                window.location.href = "/"
            })
    }

    return (

        <div className={styles.wrapper}>
            <div className={styles.gradient__bg}>
                <Navbar/>
                <div className={styles.rateTrip__wrapper}>
                    <div className={styles.rateTrip__header}>
                        How was your trip?
                    </div>
                    <div className={styles.rateTrip__formWrapper}>
                        <div className={styles.rateTrip__starSelectWrapper}>
                            {ratingStars.map((star, index) => {
                                return (
                                    <Star title={star.title} isToggled={star.isToggled}
                                          onClick={() => handleStarClick(index)}/>
                                )
                            })}
                        </div>
                        <div>
                            <textarea placeholder="Tell us a little bit more about how we did"
                                      className={styles.rateTrip__textArea} onChange={handleMessageChange}/>
                        </div>
                    </div>
                    <div className={styles.rateTrip__formSubmitButton} onClick={handleFormSubmit}>Submit</div>
                </div>
                <Footer/>
            </div>
        </div>)
}

export default RateTripPage