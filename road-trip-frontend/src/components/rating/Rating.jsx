import React, {useState} from "react";
import axios from "axios";
import styles from "./rating.module.css";
import {Star} from "../index";

const Rating = ({title, type}) => {
    const [rating, setRating] = useState(0);
    const [message, setMessage] = useState('');
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
            "score": rating, "message": message, "type": type
        })
            .then((response) => {
                console.log(response)
                alert("Thank you for taking the time to give feedback!")
                window.location.href = "/"
            })
    }

    return (<div className={styles.rateTrip__wrapper}>
        <div className={styles.rateTrip__header}>
            {title}
        </div>
        <div className={styles.rateTrip__formWrapper}>
            <div className={styles.rateTrip__starSelectWrapper}>
                {ratingStars.map((star, index) => {
                    return (<Star title={star.title} isToggled={star.isToggled}
                                  onClick={() => handleStarClick(index)}/>)
                })}
            </div>
            <div>
                <textarea placeholder="Tell us a little bit more about how we did"
                          className={styles.rateTrip__textArea} onChange={handleMessageChange}/>
            </div>
        </div>
        <div className={styles.rateTrip__formSubmitButton} onClick={handleFormSubmit}>Submit</div>
    </div>)
}

export default Rating;