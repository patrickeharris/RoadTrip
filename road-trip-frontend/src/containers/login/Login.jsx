<<<<<<< HEAD
import React, {useState} from 'react'
import styles from './login.module.css'
import globalStyles from "../container.module.css";
import bcrypt from "bcryptjs";
=======
/*
    Things Left:
        - myAxios is not running (Server is not connected)
        - Set currently logged in User
 */

import React, {useState} from 'react'
import styles from './login.module.css'
import globalStyles from "../container.module.css";
>>>>>>> a85de1b16e87dca0e0402e482a2951ff2805fe97
import {myAxios} from "../../util/helper";
import {toast} from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async () => {
        console.log(email + " " + password);
        try {
            //console.log("made it");
            const response = await myAxios.post(
                "/login",
                JSON.stringify({email, password}),
                {
                    headers: {
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                    },
                    withCredentials: true,
                }
            );
            toast.success('Successfully Logged In!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            window.location.replace("trips");
        } catch (err) {
            if (!err?.response) {
                console.log("No Server Response");
            } else {
                console.log("Registration Failed");
                console.log(err?.response);
            }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {

        if (global.loggedIn === true) {
            if (confirm("You are already logged in. Do you want to log out?")) {
                global.loggedIn = false;
            }
        } else {

            try {
                const response = await myAxios.get("/register/users");
                const info = JSON.parse(response);
                let found = false;
                let index;

                for (let i = 0; i < info.email && !found; i++) {
                    if (info[i] === email) {
                        index = i;
                        found = true;
                    }
                }

                if (found) {
                    if (info.password[index] === password) {

                        global.loggedIn = true;
                        toast.success('Successfully Logged In!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    } else {
                        alert("This is the wrong password. Please try again!")
                    }
                } else {
                    if (confirm("This email is not registered. Do you want to be directed to the sign up page?")) {

                    } else {
                        alert("Please try again!")
                    }
                }

            } catch (err) {
                if (!err?.response) {
                    console.log("No Server Response");
                } else {
                    console.log("Login Failed");
                    console.log(err?.response);
                }
            }

>>>>>>> a85de1b16e87dca0e0402e482a2951ff2805fe97
        }
    }

    return (
        <div className={globalStyles.sectionPadding}>
            <div className={styles.login}>
                <div className={styles.loginContent}>
                    <h1 className={globalStyles.gradientText}>Sign In</h1>
                    <div className={styles.loginInput}>
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
<<<<<<< HEAD
                        <button type="button" onClick={handleSubmit}>Sign In</button>
=======
                        <button type="button" onClick={handleSubmit}><a href="./">Sign In</a></button>
>>>>>>> a85de1b16e87dca0e0402e482a2951ff2805fe97
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login