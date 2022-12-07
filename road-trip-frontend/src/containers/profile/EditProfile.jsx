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
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    const handleSubmit = async () => {
        let user = (await myAxios.get("/register/curUser", {
            headers:{
                'Access-Control-Allow-Origin' : '*',
                'Authorization': window.sessionStorage.getItem('token')}
        })).data
        console.log('firstName: ' + user.firstName + '. lastName: ' + user.lastName + '. email: ' + user.email)
        let sendFirstName, sendLastName, sendEmail;
        if(firstName === ""){
            sendFirstName = user.firstName
        }else{
            sendFirstName = firstName
        }
        if(lastName === ""){
            sendLastName = user.lastName
        }else{
            sendLastName = lastName
        }
        if(email === ""){
            sendEmail = user.email
        }else{
            sendEmail = email
        }
        if(password!=confirm){
            showError('Error: Passwords must match')
        }else if(!isValidEmail(sendEmail)){
            showError('Error: Email must be valid');
        }else{
            let hashedPassword;
            if(password === "" && confirm === "") {
                hashedPassword = user.password;
            }else{
                hashedPassword = bcrypt.hashSync(password, 10);
            }
            let id = (await myAxios.get("/register/curUser", {
                headers:{
                    'Access-Control-Allow-Origin' : '*',
                    'Authorization': window.sessionStorage.getItem('token')}
            })).data.user_id;
            console.log("sending: first = " + sendFirstName + ", last = " + sendLastName + ", email = " + sendEmail + ", ID = " + id, ", password = " + hashedPassword);
            try {
                const response = await myAxios.post(
                    "/register/update",
                    JSON.stringify({firstName: sendFirstName, lastName: sendLastName, email: sendEmail, password: hashedPassword, user_id: id}),
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
                window.location.replace("/profile");
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
                        <input type="text" placeholder="First name" onChange={(e) => setFirstName(e.target.value)} value={firstName}/>
                        <input type="text" placeholder="Last name" onChange={(e) => setLastName(e.target.value)} value={lastName}/>
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                        <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirm(e.target.value)} value={confirm}/>

                        <button className="font-sans bg-red-500 hover:bg-red-700 text-white rounded py-2 px-10 font-bold text-lg" type="button" onClick={handleSubmit}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile