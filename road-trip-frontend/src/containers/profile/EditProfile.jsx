import React, {useEffect, useRef, useState} from 'react'
import styles from './editprofile.module.css'
import globalStyles from "../container.module.css";
import {myAxios} from "../../util/helper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bcrypt from "bcryptjs";

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

//Function for checking email validity
function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

const EditProfile = () => {
    const [firstName, setFirstName] = useState("");
    /*useEffect(() => {
        getFirstName().then((firstName) => setFirstName(firstName));
    }, [])*/
    const [lastName, setLastName] = useState("");
    /*useEffect(() => {
        getLastName().then((lastName) => setLastName(lastName));
    }, [])*/
    const [email, setEmail] = useState("");
    /*useEffect(() => {
        getEmail().then((email) => setEmail(email));
    }, [])*/

    const handleSubmit = async () => {
        if(firstName===""){
            showError('Error: First name cannot be blank');
        }else if(lastName==="") {
            showError('Error: Last name cannot be blank');
        }else if(email==="") {
            showError('Error: Email cannot be blank');
        }else if(!isValidEmail(email)){
            showError('Error: Email must be valid');
        }else {
            let id = (await myAxios.get("/register/curUser", {
                headers:{
                    'Access-Control-Allow-Origin' : '*',
                    'Authorization': window.sessionStorage.getItem('token')}
            })).data.user_id;
            console.log("sending: first = " + firstName + ", last = " + lastName + ", email = " + email + ", ID = " + id);
            try {
                const response = await myAxios.post(
                    "/register/update",
                    JSON.stringify({firstName, lastName, email, user_id: id}),
                    {
                        headers: {
                            "Content-Type": "application/json",
                            'Authorization': window.sessionStorage.getItem('token')
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
                //window.location.replace("");
            } catch (err) {
                if (!err?.response) {
                    console.log("No Server Response");
                } else {
                    console.log("Update Profile Failed");
                    console.log(err?.response);
                }
            }
        }
    }

    return (
        <div className={globalStyles.sectionPadding}>
            <ToastContainer />
            <div className={styles.profile}>
                <div className={styles.profileContent}>
                    <h1 className="font-sans text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-orange-300">Update Profile</h1>
                    <div className={styles.profileInput}>
                        <input className="font-sans" type="text" placeholder="First name" onChange={(e) => setFirstName(e.target.value)} value={firstName}/>
                        <input className="font-sans" type="text" placeholder="Last name" onChange={(e) => setLastName(e.target.value)} value={lastName}/>
                        <input className="font-sans" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                        <button className="font-sans bg-red-500 hover:bg-red-700 text-white rounded py-2 px-10 font-bold" type="button" onClick={handleSubmit}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile