import React from 'react'
import styles from './about.module.css'
import globalStyles from '../container.module.css';
import Feature from "../../components/feature/Feature";

const About = () => {
    return (
        <div className={globalStyles.sectionPadding}>
            <div className={styles.about} id="about">
                <div className="font-sans">
                    <Feature title="What is TrailBlazers?" subfeature={false} text="TrailBlazers is the next generation of road trip planning. Just plug in where you want to start and where you want to go! TrailBlazers will recommend custom routes, stops, and playlists based on your road tripping needs. Remove the hassle of road trip planning with TrailBlazers!" />
                </div>
                <div className={styles.aboutHeading}>
                    <h1 className="font-sans text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-orange-300">Trip planning too much of a hassle? Try TrailBlazers!</h1>
                </div>
                <div className="font-sans flex flex-row">
                    <Feature title="Routes" subfeature={true} text="Routes are recommended based on travel time, average gas mileage, and your own personal travel preferences. Each trip offers several route recommendations in order to provide the best possible trip planning experience." />
                    <Feature title="Stops" subfeature={true} text="Stops include hotels, restaurants, gas stations, attractions, historical sites, and more. Our recommendation algorithm will take your ratings into consideration as well as ratings collected from popular navigation sites." />
                    <Feature title="Music" subfeature={true} text="Generate custom playlists based on genre. We include genres from classical to hard rock to disney! Spotify assists us in bringing you the best and most popular road trip tunes!" />
                </div>
            </div>
        </div>
    )
}

export default About