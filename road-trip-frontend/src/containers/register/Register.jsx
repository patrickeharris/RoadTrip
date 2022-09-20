import React, {useState} from 'react'
import styles from './register.module.css'
import globalStyles from "../container.module.css";
import {myAxios} from "../../util/helper";

const signUp=(user)=>{
    console.log("User");
    console.log(user);
    /*
    return myAxios.post("/register").then((response) => {
        console.log(response);
        console.log("Success");
    }).catch((error) => {
        console.log(error);
        console.log("Error");
    })*/
}

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        console.log(firstName, lastName, email, password);
        try {
            const response = await myAxios.post(
                "/register",
                JSON.stringify({firstName, lastName, email, password}),
                {
                    headers: {"Content-Type": "application/json"},
                    withCredentials: true,
                }
            );
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
            <div className={styles.register}>
                <div className={styles.registerContent}>
                    <h1 className={globalStyles.gradientText}>Sign Up</h1>
                    <div className={styles.registerInput}>
                        <input type="text" placeholder="First name" onChange={(e) => setFirstName(e.target.value)} value={firstName}/>
                        <input type="text" placeholder="Last name" onChange={(e) => setLastName(e.target.value)} value={lastName}/>
                        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                        <input type="password" placeholder="Confirm Password"/>
                        <button type="button" onClick={handleSubmit}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register