import React, {useEffect, useRef, useState} from 'react'
import styles from './notification.module.css'
import globalStyles from "../container.module.css";
import {myAxios} from "../../util/helper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notification = () => {


    return (
        <div className={globalStyles.sectionPadding}>
            <ToastContainer />
            <div className={styles.profile}>
                <div className={styles.profileContent}>
                    <h1 className={globalStyles.gradientText}>Notifications</h1>
                    <div className={styles.profileInput}>
                        <input type="text" placeholder="First name"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notification