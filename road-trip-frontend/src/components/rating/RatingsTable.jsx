import {useEffect, useState} from "react";
import styles from "./rating.module.css"
import {myAxios} from "../../util/helper";
import React from "react";

const RatingsTable = () => {
    const [ratings, setRatings] = useState([]);

    let url = "/rating/ratings";

    useEffect(() => {

        if (window.sessionStorage.getItem('token') === null) {
            window.location.replace("/login");
        }

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
            <div className="h-screen overflow-scroll overflow-hidden">
                <h1 className="font-sans text-transparent flex justify-center text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-orange-300 pb-12">Ratings</h1>
                <div className="justify-center px-10">
                    <table className={styles.ratings__tableWrapper}>
                        <tbody>
                        <tr className="font-sans">
                            <th>ID</th>
                            <th>Trip ID</th>
                            <th>Name</th>
                            <th>Score</th>
                            <th>Message</th>
                            <th>Type</th>
                        </tr>
                        {ratings.map((r) => {
                            let ratingType = "Trip"
                            let name;
                            if (r.name != null) {
                                ratingType = "Stop"
                            }
                            return (
                                <tr className={styles.ratings__tr}>
                                    <td className="font-sans">{r.id}</td>
                                    <td className="font-sans">{r.trip_id}</td>
                                    <td className="font-sans">{r.name}</td>
                                    <td className="font-sans">{r.score}</td>
                                    <td className="font-sans">{r.message}</td>
                                    <td className="font-sans">{ratingType}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
         :
        <h1>No Ratings Found</h1>
    )
}

export default RatingsTable;