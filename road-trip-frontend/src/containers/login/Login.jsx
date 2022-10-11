import React, {useState} from 'react'
import styles from './login.module.css'
import globalStyles from "../container.module.css";
import {myAxios} from "../../util/helper";
import {toast, ToastContainer} from "react-toastify";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {

        if (window.localStorage.getItem('loggedIn') === 'true') {
            if (confirm("You are already logged in. Do you want to log out?")) {
                window.localStorage.setItem('loggedIn', 'false');
            }
        } else {

            try {
                const response = (await myAxios.get("/register/users")).data;
                let found = false;
                let index;

                for (let i = 0; i < response.length; i++) {
                    if (response[i].email === email) {
                        found = true;
                        index = i;
                    }
                }

                if (found === true) {
                    if (response[index].password === password) {
                        window.localStorage.setItem('loggedIn', 'true');
                        toast.success('Successfully Logged In!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        window.localStorage.setItem('curUser', response[index].user_id);
                        window.location.replace("/");
                    } else {
                        alert("This is the wrong password. Please try again!")
                    }
                } else {
                    if (confirm("This email is not registered. Do you want to be directed to the sign up page?")) {
                        window.location.replace("/register");
                    } else {
                        alert("Please try again!")
                    }
                }

            } catch (err) {
                if (!err?.response) {
                    console.log("No Server Response");
                    console.log(err);
                } else {
                    console.log("Login Failed");
                    console.log(err?.response);
                }
            }

        }
    }

    return (
        <div className={globalStyles.sectionPadding}>
            <ToastContainer />
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