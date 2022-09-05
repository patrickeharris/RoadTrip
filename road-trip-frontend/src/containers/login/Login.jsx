import React from 'react'
import styles from './login.module.css'
import globalStyles from "../container.module.css";

const Login = () => {
    return (
        <div className={globalStyles.sectionPadding}>
            <div className={styles.login}>
                <div className={styles.loginContent}>
                    <h1 className={globalStyles.gradientText}>Sign In</h1>
                    <div className={styles.loginInput}>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>
                        <button type="button"><a href="./">Sign In</a></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login