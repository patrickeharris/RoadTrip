import React, {useState} from 'react'
import styles from '../createTrip/trip.module.css'
import globalStyles from "../container.module.css";
import {myAxios} from "../../util/helper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditTrip = () => {

    const getDefaultValues = async () => {
        try {
            return (await myAxios.get("/trips")).data;
        } catch (err) {
            if (!err?.response) {
                console.log("No Server Response");
                console.log(err);
            } else {
                console.log("Edit Trip Failed");
                console.log(err?.response);
            }
        }
    }

    const [tripName, setTripName] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [date, setDate] = useState("");
    const [userID, setUserID] = useState("");
    const [selectedRoute, setSelectedRoute] = useState("");

    if (tripName === "" && start === "" && end === "" && date === "" && userID === "" && selectedRoute === "") {
        getDefaultValues().then((response) => {

            for (let i = 0; i < response.length; i++) {
                if (response[i].trip_id.toString() === window.localStorage.getItem('curTrip')) {
                    setTripName(response[i].tripName);
                    setStart(response[i].start);
                    setEnd(response[i].end);
                    setDate(response[i].date);
                    setUserID(response[i].userID);
                    setSelectedRoute(response[i].selectedRoute);
                    break;
                }
            }
        })
    }

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

            window.localStorage.setItem('curTrip', null);

        } catch (err) {
            if (!err?.response) {
                console.log("No Server Response");
            } else {
                console.log("Edit Trip Failed");
                console.log(err?.response);
            }
        }
    }

    return (
        <div className={globalStyles.sectionPadding}>
            <ToastContainer />
            <div className={styles.register}>
                <div className={styles.registerContent}>
                    <h1 className={globalStyles.gradientText}>Edit Trip</h1>
                    <div className={styles.registerInput}>
                        <input type="text" onChange={(e) => setTripName(e.target.value)} value={tripName}/>
                        <input type="text" onChange={(e) => setStart(e.target.value)} value={start}/>
                        <input type="text" onChange={(e) => setEnd(e.target.value)} value={end}/>
                        <input type="date" onChange={(e) => setDate(e.target.value)} value={date}/>
                        <input type="text" onChange={(e) => setUserID(e.target.value)} value={userID}/>
                        <input type="text" onChange={(e) => setSelectedRoute(e.target.value)} value={selectedRoute}/>
                        <button type="button" onClick={handleSubmit}>Edit Trip</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditTrip