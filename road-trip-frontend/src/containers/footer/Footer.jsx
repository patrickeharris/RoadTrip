import React from 'react'
import styles from './footer.module.css'
import globalStyles from "../container.module.css";
import {useEffect, useState} from "react";

const Footer = () => {
    const [logged, setLogged] = useState('false');
    useEffect(() => {
        setLogged(window.sessionStorage.getItem('loggedIn'));
        console.log("set")
        console.log(window.sessionStorage.getItem('loggedIn'))
    })

    return (
        <div className="flex justify-center items-center flex-col w-full" id="footer">

            <hr className="border-slate-700 h-px w-full mt-6"/>
                    <h4 className="font-sans text-white mb-2 text-lg mt-2">Links</h4>
                    <p className="font-sans text-white hover:text-slate-300 mb-1"><a href="./">Home</a></p>
                    <p className="font-sans text-white hover:text-slate-300 mb-1"><a href="./#about">About Us</a></p>
            {logged === 'false' && <>
                    <p className="font-sans text-white hover:text-slate-300 mb-1"><a href="./login">Sign In</a></p>
                    <p className="font-sans text-white hover:text-slate-300 mb-1"><a href="./register">Sign Up</a></p></>}
            <div>
                <p className="font-sans text-white mt-3 mb-2">©2022 Travelz. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer