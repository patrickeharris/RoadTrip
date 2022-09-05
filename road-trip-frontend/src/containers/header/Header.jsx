import React from 'react'
import styles from './header.module.css'
import globalStyles from "../container.module.css";

const Header = () => {
    return (
        <div className={globalStyles.sectionPadding}>
            <div className={styles.header} id="home">
                <div className={styles.headerContent}>
                    <h1 className={globalStyles.gradientText}>Let's go on a road trip!</h1>

                    <p>TrailBlazers can plan out your next trip by offering you different routes and stops and generating custom playlists for those good vibes. With TrailBlazers, worry less about the planning and enjoy the trail!</p>
                    <div className={styles.headerInput}>
                        <input type="email" placeholder="Your email address"/>
                        <button type="button"><a href="./register">Get Started</a></button>
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