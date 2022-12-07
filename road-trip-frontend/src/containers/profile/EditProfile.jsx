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
    const [firstNameChange, setFirstNameChange] = useState(false)
    const [lastNameChange, setLastNameChange] = useState(false)
    const [emailChange, setEmailChange] = useState(false)
    const [defaultFirst, setDefaultFirst] = useState("");
    const [defaultLast, setDefaultLast] = useState("");
    const [defaultEmail, setDefaultEmail] = useState("");
    const [badEmail, setBadEmail] = useState(false);


    useEffect(() => {
        if (window.sessionStorage.getItem('token') === null) {
            window.location.replace("/login");
        }

        if (window.sessionStorage.getItem('token') === null) {
            window.location.replace("/login");
        } else {
            const fetchUserID = async () => {
                const response = (await myAxios.get("/register/curUser", {
                    headers:{
                        'Access-Control-Allow-Origin' : '*',
                        'Authorization': window.sessionStorage.getItem('token')}
                })).data;
                const user  = response;
                setDefaultFirst(user.firstName)
                setDefaultLast(user.lastName)
                setDefaultEmail(user.email)
            };
            fetchUserID();
        }
    })


    const handleSubmit = async () => {
        if (email !== "" && !isValidEmail(email)){
            showError('Error: Email must be valid');
        } else {

            const r = (await myAxios.get("/register/users")).data;

            if (r) {
                r.map((item) => {
                    if (item.email === email) {
                        showError('Email is already in use');
                        setBadEmail(true);
                    }
                });
            }

            if (!badEmail) {
                let id = (await myAxios.get("/register/curUser", {
                    headers:{
                        'Access-Control-Allow-Origin' : '*',
                        'Authorization': window.sessionStorage.getItem('token')}
                })).data.user_id;

                try {
                    const response = await myAxios.post(
                        "/register/update",
                         null,
                        {
                            params: {
                                firstName: firstName,
                                lastName: lastName,
                                email: email,
                                userID: id,
                            },
                            headers: {
                                "Content-Type": "application/json",
                                'Authorization': window.sessionStorage.getItem('token')
                            },
                            withCredentials: true,
                        }
                    );

                    if (emailChange) {
                        setFirstNameChange(false);
                        setLastNameChange(false);
                        setEmailChange(false);
                        window.sessionStorage.setItem('loggedIn', 'false');
                        window.sessionStorage.setItem('updatedEmail', 'true');
                        window.location.replace("/login");
                    } else {
                        setFirstNameChange(false);
                        setLastNameChange(false);
                        setEmailChange(false);
                        window.location.reload(false);
                    }

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
    }

    return (
        <div className="h-screen">
            <ToastContainer />
            <div className={styles.profile}>
                <div className={styles.profileContent}>
                    <h1 className="font-sans text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-orange-300 mt-20">Profile</h1>
                    <div className={styles.profileInput}>
                        <div className="flex flex-row items-center text-gray-600 mt-5">
                            <h1 className="text-white text-2xl mr-5 mb-5 font-sans">First Name: </h1>
                            {
                                firstNameChange ?
                                    <div className="w-80">
                                        <input type="text" placeholder={defaultFirst} onChange={(e) => setFirstName(e.target.value)} value={firstName} readOnly={false}/>
                                    </div> :
                                    <div className="w-80">
                                        <input type="text" placeholder={defaultFirst} onChange={(e) => setFirstName(e.target.value)} value={firstName} readOnly={true}/>
                                    </div>
                            }
                            <button onClick={() => {setFirstNameChange(true)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" className="w-8 h-8 pb-4 fill-white" viewBox="0 0 494.936 494.936">
                                    <g>
                                        <g>
                                            <path d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157    c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21    s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741    c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z"/>
                                            <path d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069    c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963    c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692    C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107    l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005    c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z"/>
                                        </g>
                                    </g>
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-row items-center text-gray-600 mt-10">
                            <h1 className="text-white text-2xl mr-5 mb-5 font-sans">Last Name: </h1>
                            {
                                lastNameChange ?
                                    <div className="w-80">
                                        <input type="text" placeholder={defaultLast} onChange={(e) => setLastName(e.target.value)} value={lastName} readOnly={false}/>
                                    </div> :
                                    <div className="w-80">
                                        <input type="text" placeholder={defaultLast} onChange={(e) => setLastName(e.target.value)} value={lastName} readOnly={true}/>
                                    </div>

                            }
                            <button onClick={() => {setLastNameChange(true)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" className="w-8 h-8 pb-4 fill-white" viewBox="0 0 494.936 494.936">
                                    <g>
                                        <g>
                                            <path d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157    c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21    s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741    c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z"/>
                                            <path d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069    c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963    c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692    C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107    l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005    c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z"/>
                                        </g>
                                    </g>
                                </svg>
                            </button>
                        </div>
                        <div className="flex flex-row items-center text-gray-600 mt-10">
                            <h1 className="text-white text-2xl mr-5 mb-5 font-sans">Email: </h1>
                            {
                                emailChange ?
                                    <div className="ml-14 w-80">
                                        <input type="email" placeholder={defaultEmail} defaultValue={defaultEmail} onChange={(e) => setEmail(e.target.value)} value={email} readOnly={false}/>
                                    </div> :
                                    <div className="ml-14 w-80">
                                        <input type="email" placeholder={defaultEmail} defaultValue={defaultEmail} onChange={(e) => setEmail(e.target.value)} value={email} readOnly={true}/>
                                    </div>
                            }
                            <button onClick={() => {setEmailChange(true)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" className="w-8 h-8 pb-4 fill-white" viewBox="0 0 494.936 494.936">
                                    <g>
                                        <g>
                                            <path d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157    c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21    s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741    c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z"/>
                                            <path d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069    c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963    c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692    C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107    l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005    c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z"/>
                                        </g>
                                    </g>
                                </svg>
                            </button>
                        </div>

                        {
                            ((firstNameChange) || (lastNameChange) || (emailChange)) &&
                                <div className="flex flex-row mt-4">
                                    <button className="font-sans bg-red-500 hover:bg-red-700 text-white rounded py-2 px-10 font-bold text-lg mr-4" type="button"
                                            onClick={() => {
                                                setFirstNameChange(false);
                                                setLastNameChange(false);
                                                setEmailChange(false);
                                                window.location.reload(false);
                                            }}>Cancel</button>
                                    <button className="font-sans bg-green-500 hover:bg-green-700 text-white rounded py-2 px-10 font-bold text-lg" type="button" onClick={handleSubmit}>Update</button>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile