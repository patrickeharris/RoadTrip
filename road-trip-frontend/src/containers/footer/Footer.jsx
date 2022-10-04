import React from 'react'
import styles from './footer.module.css'
import globalStyles from "../container.module.css";

const Footer = () => {
    return (
        <div className={styles.footer} id="footer">
            <div className={styles.footerHeading}>
                <h1 className={globalStyles.gradientText}>Do you not want to blaze your next trail?</h1>
            </div>
            <div className={styles.footerBtn}>
                <p><a href="./register">Sign Up</a></p>
            </div>
            <div className={styles.footerLinks}>
                <div className={styles.footerLinksDiv}>
                    <h4>Links</h4>
                    <p><a href="./">Home</a></p>
                    <p><a href="./#about">About Us</a></p>
                    <p><a href="./login">Sign In</a></p>
                    <p><a href="./register">Sign Up</a></p>
                </div>
                <div className={styles.footerLinksDiv}>
                    <h4>Get in touch</h4>
                    <p>Travelz.TrailBlazers@gmail.com</p>
                    <p>(123) 456 - 7890</p>
                    <p>123 Shell St.</p>
                </div>
            </div>
            <div className={styles.footerCopyright}>
                <p>©2022 Travelz. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Footer