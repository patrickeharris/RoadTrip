import {useEffect, useState} from "react";
import styles from "./rating.module.css"
import {myAxios} from "../../util/helper";

const RatingsTable = ({tripId}) => {
    const [ratings, setRatings] = useState([]);

    let url = "https://localhost:8080/rating/ratings";

    if (tripId != null) {
        url += "?tripId=" + tripId
    }

    useEffect(() => {
        const fetchRatings = async () => {
            const response = await myAxios.get(url,{
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': window.sessionStorage.getItem('token')
                }
            });
            return response.data
        }

        fetchRatings().then(r => setRatings(r));
    }, [])

    return (
        ratings ?
        <div style={{ paddingLeft: "100px", paddingRight: "100px" }}>
            <table className={styles.ratings__tableWrapper}>
                <tr>
                    <th>ID</th>
                    <th>Trip ID</th>
                    <th>Name</th>
                    <th>Score</th>
                    <th>Message</th>
                    <th>Type</th>
                </tr>
                {ratings.map((r) => {
                    let ratingType = "Trip"
                    if (r.name != null) {
                        ratingType = "Stop"
                    }
                    return (
                        <tr className={styles.ratings__tr}>
                            <td>{r.id}</td>
                            <td>{r.trip_id}</td>
                            <td>{r.name}</td>
                            <td>{r.score}</td>
                            <td>{r.message}</td>
                            <td>{ratingType}</td>
                        </tr>
                    )
                })}
            </table>
        </div> :
        <h2>No Ratings Found</h2>
    )
}

export default RatingsTable;