import React, {useState} from 'react'
import styles from './login.module.css'
import globalStyles from "../container.module.css";
import {myAxios} from "../../util/helper";
import {toast, ToastContainer} from "react-toastify";
import bcrypt from "bcryptjs";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [notifications, setNotifications] = useState("");
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const handleSubmit = async () => {

        if (window.sessionStorage.getItem('loggedIn') === 'true') {
            if (confirm("You are already logged in. Do you want to log out?")) {
                window.sessionStorage.setItem('loggedIn', 'false');
                await myAxios.get("/logout");
            }
        } else {

            try {
                const response = (await myAxios.get("/register/users")).data;
                let found = false;
                let index;
                let pass;

                for (let i = 0; i < response.length; i++) {
                    if (response[i].email === email) {
                        found = true;
                        pass = response[i].password;
                    }
                }

                console.log(pass)

                if (found === true) {

                    if (bcrypt.compareSync(password, pass)) {
                        window.sessionStorage.setItem('loggedIn', 'true');
                        console.log(pass);

                        const response = await myAxios.post(
                            "/login",
                            null,
                            {
                                params: {email: email, password: pass},
                                headers: {
                                    "Content-Type": "application/json",
                                    'Access-Control-Allow-Origin': '*',
                                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                                },
                                withCredentials: true,
                            });
                        console.log(response.data);
                        window.sessionStorage.setItem('token', "Bearer " + response.data);
                        console.log(window.sessionStorage.getItem('token'));
                        myAxios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`;
                        toast.success('Successfully Logged In!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        window.sessionStorage.setItem('spotifyLogged', 'false');
                        window.location.replace("/trip-dashboard");
                    } else {
                        toast.warn('Your password is incorrect.', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
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

            const response2 = (await myAxios.get("/register/curUser", {
                headers:{
                    'Access-Control-Allow-Origin' : '*',
                    'Authorization': window.sessionStorage.getItem('token')}
            })).data;

            const response = (await myAxios.get("/get/notifications", {
                headers:{
                    'Access-Control-Allow-Origin' : '*',
                    'Authorization': window.sessionStorage.getItem('token')}
            })).data;
            let closest = '';
            for (let i = 0; i < response.length; i++) {
                if(response2.user_id === response[i].user){
                    if(closest === ''){
                        closest = response[i].date
                    }else{
                        let d = new Date(response[i].date)
                        let d2 = new Date(closest)
                        if(d < d2){
                            closest = response[i].data
                        }
                    }
                }
            }
            console.log('Closest date: ' + closest)

        }
    }

    return (
        <div className={globalStyles.sectionPadding}>
            <ToastContainer />
            <div className={styles.login}>
                <div className={styles.loginContent}>
                    <h1 className="font-sans text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-orange-300">Sign In</h1>
                    <div className={styles.loginInput}>
                        <input className="font-sans" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                        <input className="font-sans" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                        <button className="text-lg font-sans bg-red-500 hover:bg-red-700 text-white rounded py-2 px-10 font-bold" type="button" onClick={handleSubmit}>Sign In</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login