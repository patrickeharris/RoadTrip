import React, {useEffect, useRef, useState} from 'react'
import styles from './editprofile.module.css'
import globalStyles from "../container.module.css";
import {myAxios} from "../../util/helper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import bcrypt from "bcryptjs";
import {Checkbox} from "@material-ui/core";

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
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")

    const handleSubmit = async () => {
        if(firstName===""){
            showError('Error: First name cannot be blank');
        }else if(lastName==="") {
            showError('Error: Last name cannot be blank');
        }else if(email==="") {
            showError('Error: Email cannot be blank');
        }else if(!isValidEmail(email)){
            showError('Error: Email must be valid');
        }else if(password!=confirm){
            showError('Error: Passwords must match')
        }else{
            const hashedPassword = bcrypt.hashSync(password, 10);
            let id = (await myAxios.get("/register/curUser", {
                headers:{
                    'Access-Control-Allow-Origin' : '*',
                    'Authorization': window.sessionStorage.getItem('token')}
            })).data.user_id;
            console.log("sending: first = " + firstName + ", last = " + lastName + ", email = " + email + ", ID = " + id, ", password = " + hashedPassword);

            try {
                const response = await myAxios.post(
                    "/register/update",
                    JSON.stringify({firstName, lastName, email, password: hashedPassword, user_id: id}),
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
                        <input type="text" placeholder="First name" onChange={(e) => setFirstName(e.target.value)} value={firstName}/>
                        <input type="text" placeholder="Last name" onChange={(e) => setLastName(e.target.value)} value={lastName}/>
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                        <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirm(e.target.value)} value={confirm}/>

                        <img className="h-20 w-20 rounded-full" src="/static/girlProfile.png"/>
                        <div className="app">
                            <Checkbox label="my value" />
                        </div>
                        <img className="h-20 w-20 rounded-full" src="/static/guyProfile.png"/>
                        <div className="app">
                            <Checkbox label="my value" />
                        </div>
                        <button type="button" onClick={handleSubmit}>Update Profile</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile