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

const getFirstName = async () => {
    let id = window.localStorage.getItem('curUser');
    const response = (await myAxios.get("/register/users")).data;
    let found = false;
    let index;

    for (let i = 0; i < response.length; i++) {
        if (response[i].id == id) {
            console.log(response[i].firstName);
            return response[i].firstName;
        }
    }
}

const getLastName = async () => {
    let id = window.localStorage.getItem('curUser');
    const response = (await myAxios.get("/register/users")).data;
    let found = false;
    let index;

    for (let i = 0; i < response.length; i++) {
        if (response[i].id == id) {
            return response[i].lastName;
        }
    }
}

const getEmail = async () =>{
    let id = window.localStorage.getItem('curUser');
    const response = (await myAxios.get("/register/users")).data;
    let found = false;
    let index;

    for (let i = 0; i < response.length; i++) {
        if (response[i].id == id) {
            return response[i].email;
        }
    }
}

const getPassword = async () => {
    let id = window.localStorage.getItem('curUser');
    const response = (await myAxios.get("/register/users")).data;
    let found = false;
    let index;

    for (let i = 0; i < response.length; i++) {
        if (response[i].id == id) {
            return response[i].password;
        }
    }
}

const Profile = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const handleLoadFirst = async () => {
        [firstName, setFirstName] = useState(await getFirstName);
    }
    const handleSubmit = async () => {
        try {
            const response = await myAxios.post(
                "/register/update",
                JSON.stringify({getFirstName, getLastName, getEmail, getPassword}),
                {
                    headers: {
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                    },
                    withCredentials: true,
                }
            );
            toast.success('Successfully Updated Profile!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            window.location.replace("");
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