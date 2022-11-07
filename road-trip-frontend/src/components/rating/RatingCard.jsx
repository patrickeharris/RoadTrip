import React, {useState} from "react";
import styles from "./rating.module.css";
import {Star} from "../index";

const RatingCard = ({ name, stopRatings, setStopRatings }) => {
    const [rating, setRating] = useState(0);
    const [ratingStars, setRatingStars] = useState(
        [
            {
                title: "1 star", isToggled: false
            },
            {
                title: "2 stars", isToggled: false
            },
            {
                title: "3 stars", isToggled: false
            },
            {
                title: "4 stars", isToggled: false
            },
            {
                title: "5 stars", isToggled: false
            }]
    )

    const handleStarClick = (index) => {
        for (let i = 0; i < ratingStars.length; i++) {
            ratingStars[i].isToggled = i <= index;
        }

        setRating(index + 1);

        let obj = {
            name: name,
            score: index + 1
        }

        let ind = stopRatings.indexOf(obj)
        if (ind === -1) {
            setStopRatings(current => [...current, obj]);
        } else {
            const newState = stopRatings.map(r => {
                if (r.name === name) {
                    return {...r, score: index + 1}
                }

                return r
            })

            setStopRatings(newState)
        }
    }

    return (
        <div>
            <div className={styles.rateTrip__stopStarWrapper}>
                <div style={{ color: "white", fontWeight: "bold", marginRight: "30px" }}>{name}</div>
                <div className={styles.rateTrip__starSelectWrapper}>
                    {ratingStars.map((star, index) => {
                        return (<Star title={star.title} isToggled={star.isToggled}
                                      onClick={() => handleStarClick(index)}/>)
                    })}
                </div>
            </div>
        </div>
    )
}

export default RatingCard;