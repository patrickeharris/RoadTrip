import {useEffect, useState} from "react";
import axios from "axios";

const RatingsTable = ({tripId}) => {
    const [ratings, setRatings] = useState([]);

    useEffect(() => {

        const fetchRatings = async () => {
            let url = "http://localhost:8080/rating/ratings";

            if (tripId != null) {
                url += "?tripId=" + tripId
            }
            const response = await axios.get(url);

            setRatings(response.data)
        }

        fetchRatings();
    }, [])

    return (
        <div>
            {ratings.map((r) => {
                return (
                    <div>{JSON.stringify(r)}</div>
                )
            })}
        </div>
    )
}

export default RatingsTable;