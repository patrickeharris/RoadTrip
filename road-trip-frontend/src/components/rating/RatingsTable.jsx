import {useEffect, useState} from "react";
import styles from "./rating.module.css"
import axios from "axios";

const RatingsTable = ({tripId}) => {
    const [ratings, setRatings] = useState([]);

    let url = "http://trailblazers.gq:8080/rating/ratings";

    if (tripId != null) {
        url += "?tripId=" + tripId
    }

    useEffect(() => {
        const fetchRatings = async () => {
            const response = await axios.get(url);
            return response.data
        }

        fetchRatings().then(r => setRatings(r));
    }, [])

    return (
        <div style={{ paddingLeft: "100px", paddingRight: "100px" }}>
            <table className={styles.ratings__tableWrapper}>
                <tr>
                    <th>ID</th>
                    <th>Trip ID</th>
                    <th>Score</th>
                    <th>Message</th>
                    <th>Type</th>
                </tr>
                {ratings.map((r) => {
                    return (
                        <tr className={styles.ratings__tr}>
                            <td>{r.id}</td>
                            <td>{r.trip_id}</td>
                            <td>{r.score}</td>
                            <td>{r.message}</td>
                            <td>Todo</td>
                        </tr>
                    )
                })}
            </table>
        </div>
    )
}

export default RatingsTable;