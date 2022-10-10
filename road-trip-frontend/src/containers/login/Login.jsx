import React, {useState} from 'react'
import styles from './login.module.css'
import globalStyles from "../container.module.css";
import bcrypt from "bcryptjs";
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
                        <button type="button" onClick={handleSubmit}>Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login