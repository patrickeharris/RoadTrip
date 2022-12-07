import React, {useState, useEffect} from 'react'
import styles from './register.module.css'
import globalStyles from "../container.module.css";
import {myAxios} from "../../util/helper";
import bcrypt from 'bcryptjs';
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

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [badEmail, setBadEmail] = useState(false);

    useEffect(() => {
        if (window.sessionStorage.getItem('email') !== "") {
            setEmail(window.sessionStorage.getItem('email'));
            window.sessionStorage.setItem('email',"");
        }
    })


    const handleSubmit = async () => {
        const hashedPassword = bcrypt.hashSync(password, 10);
        try {
            //Check validity
            if (firstName==="") {
                showError('Error: First name cannot be blank');
            }else if(lastName==="") {
                showError('Error: Last name cannot be blank');
            }else if(email==="") {
                showError('Error: Email cannot be blank');
            }else if(!isValidEmail(email)){
                showError('Error: Email must be valid');
            }else if(password!==confirmPassword){
                showError('Error: Password must match the confirmation password');
            }else if(password==="") {
                showError('Error: Password cannot be blank');
            }else if(password.length < 6) {
                showError('Error: Password must be 6 or more characters');
            } else{

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
                    const response = await myAxios.post(
                        "/register",
                        JSON.stringify({firstName, lastName, email, password: hashedPassword}),
                        {
                            headers: {
                                "Content-Type": "application/json",
                                'Access-Control-Allow-Origin': '*',
                                'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                            },
                            withCredentials: true,
                        }
                    );
                    window.sessionStorage.setItem('spotifyLogged', 'false');
                    setBadEmail(false);
                    toast.success('Successfully Registered!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    window.location.replace("/login");

                }
            }
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
        <div className="w-screen">
            <ToastContainer />
            <div className={styles.register}>
                <div className={styles.registerContent}>
                    <h1 className="font-sans text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-orange-300 mt-5">Sign Up</h1>
                    <div className={styles.registerInput}>
                        <input className="font-sans" type="text" placeholder="First name" onChange={(e) => setFirstName(e.target.value)} value={firstName}/>
                        <input className="font-sans" type="text" placeholder="Last name" onChange={(e) => setLastName(e.target.value)} value={lastName}/>
                        <input className="font-sans" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                        <input className="font-sans" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                        <input className="font-sans" type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword}/>
                        <button className="text-lg font-sans bg-red-500 hover:bg-red-700 text-white rounded py-2 px-10 font-bold" type="button" onClick={handleSubmit}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register