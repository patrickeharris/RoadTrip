import React from 'react'
import styles from './register.module.css'
import globalStyles from "../container.module.css";

const Register = () => {
    return (
        <div className={globalStyles.sectionPadding}>
            <div className={styles.register}>
                <div className={styles.registerContent}>
                    <h1 className={globalStyles.gradientText}>Sign Up</h1>
                    <div className={styles.registerInput}>
                        <input type="text" placeholder="First name"/>
                        <input type="text" placeholder="Last name"/>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>
                        <input type="password" placeholder="Confirm Password"/>
                        <button type="button"><a href="./register">Sign Up</a></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register