import React, {useState} from 'react'
import styles from '../createTrip/trip.module.css'
import globalStyles from "../container.module.css";
import {myAxios} from "../../util/helper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditTrip = () => {
    const [tripName, setTripName] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [date, setDate] = useState("");
    const [userID, setUserID] = useState("");
    const [selectedRoute, setSelectedRoute] = useState("");

    const handleSubmit = async () => {
        try {
            const response = await myAxios.post(
                "/edit-trip",
                JSON.stringify({tripName, start, end, date, userID, selectedRoute}),
                {
                    headers: {"Content-Type": "application/json",
                        'Access-Control-Allow-Origin' : '*',
                        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE',},
                    withCredentials: true,
                }
            );
            setTripName("");
            setStart("");
            setEnd("");
            setDate("");
            setUserID("");
            setSelectedRoute("");
            console.log(response);
            toast.success('Successfully Edited Trip!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (err) {
            if (!err?.response) {
                console.log("No Server Response");
            } else {
                console.log("Registration Failed");
                console.log(err?.response);
            }
        }
    }

    return (
        <div className={globalStyles.sectionPadding}>
            <ToastContainer />
            <div className={styles.register}>
                <div className={styles.registerContent}>
                    <h1 className={globalStyles.gradientText}>Create Trip</h1>
                    <div className={styles.registerInput}>
                        <input type="text" placeholder="Trip Name" onChange={(e) => setTripName(e.target.value)} value={tripName}/>
                        <input type="text" placeholder="Start" onChange={(e) => setStart(e.target.value)} value={start}/>
                        <input type="text" placeholder="End" onChange={(e) => setEnd(e.target.value)} value={end}/>
                        <input type="date" placeholder="Date" onChange={(e) => setDate(e.target.value)} value={date}/>
                        <input type="text" placeholder="User" onChange={(e) => setUserID(e.target.value)} value={userID}/>
                        <input type="text" placeholder="Selected Route" onChange={(e) => setSelectedRoute(e.target.value)} value={selectedRoute}/>
                        <button type="button" onClick={handleSubmit}>Edit Trip</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditTrip