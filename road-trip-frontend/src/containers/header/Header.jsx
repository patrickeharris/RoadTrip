import React, {useEffect, useState} from 'react'
import styles from './header.module.css'
import globalStyles from "../container.module.css";

const Header = () => {
    const [logged, setLogged] = useState('false');
    useEffect(() => {
        setLogged(window.sessionStorage.getItem('loggedIn'));
    })


    return (
        <div className={globalStyles.sectionPadding}>
            <div className="flex" id="home">
                <div className={styles.headerContent}>
                    <h1 className="font-sans text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-orange-300">Blaze Your Trail!</h1>

                    <p className="mt-4 font-sans text-blue-300 text-lg">Let TrailBlazers plan out your next trip so you can focus on the trail ahead! We offer route and stop planning as well as playlist generation services. With TrailBlazers, you are guaranteed an adventure!</p>
                    <div className={styles.headerInput}>
                        {logged === 'false' ? <>
                        <input className="font-sans text-lg" type="email" placeholder="Your email address" onChange={(e) => {window.sessionStorage.setItem('email', e.target.value)}}/>
                        <button className="bg-red-500 text-lg font-sans text-white" type="button"><a onClick={() => {
                            window.location.replace("/register");
                        }}>Get Started</a></button></>
                        : <button className="bg-red-500 text-lg font-sans text-white" type="button"><a onClick={() => {
                                window.location.replace("/trip-dashboard");
                            }}>See Your Trips</a></button>}
                    </div>
                </div>
                <div className={styles.headerImage}>
                    <img src="/static/maps.png" alt="ai"/>
                </div>
            </div>
        </div>
    )
}

export default Header