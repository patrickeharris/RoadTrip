import React, {useState} from 'react'
import styles from './profile.module.css'
import globalStyles from "../container.module.css";
import {myAxios} from "../../util/helper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Sign up a given user
const signUp=(user)=>{
    return myAxios.post("/register").then((response) => {
        console.log("Successful registration");
    }).catch((error) => {
        console.log("Error in registration");
    })
}

//Function for checking email validity
function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

//Function to show error message to the user
function showError(errorMsg){
    toast.error(errorMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

const Profile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    //window.localStorage.getItem('curUser');
    const handleSubmit = async () => {

    }

    return (
        <div className={globalStyles.sectionPadding}>
            <ToastContainer />
            <div className={styles.profile}>
                <div className={styles.profileContent}>
                    <h1 className={globalStyles.gradientText}>Profile</h1>
                    <div className={styles.profileInput}>
                        <input type="text" placeholder="First name" onChange={(e) => setFirstName(e.target.value)} value={firstName}/>
                        <input type="text" placeholder="Last name" onChange={(e) => setLastName(e.target.value)} value={lastName}/>
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                        <button type="button" onClick={handleSubmit}>Update Profile</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile