import React from 'react'
import styles from './footer.module.css'

const Footer = () => {
    return (
        <div className={styles.footer} id="footer">

            <div className={styles.footerLinks}>
                <div className={styles.footerLinksDiv}>
                    <h4 className="font-sans text-white mb-2 text-lg">Links</h4>
                    <p className="font-sans text-white hover:text-slate-300 mb-1"><a href="./">Home</a></p>
                    <p className="font-sans text-white hover:text-slate-300 mb-1"><a href="./#about">About Us</a></p>
                    <p className="font-sans text-white hover:text-slate-300 mb-1"><a href="./login">Sign In</a></p>
                    <p className="font-sans text-white hover:text-slate-300 mb-1"><a href="./register">Sign Up</a></p>
                </div>
            </div>
            <div className={styles.footerCopyright}>
                <p className="font-sans text-white">©2022 Travelz. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer