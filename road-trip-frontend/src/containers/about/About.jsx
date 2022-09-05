import React from 'react'
import styles from './about.module.css'
import globalStyles from '../container.module.css';
import Feature from "../../components/feature/Feature";

const About = () => {
    return (
        <div className={globalStyles.sectionPadding}>
            <div className={styles.about} id="about">
                <div className={styles.aboutFeature}>
                    <Feature title="What is TrailBlazers?" subfeature={false} text="TrailBlazers is the next generation of road trip planning. Just plug in where you want to go and where you are starting at and get custom route options, stop recommendations, and unique road trip playlists. No more need for paper maps or the hassle that comes with trying to plan a road trip. Just let us do it for you! We're not evil artificial intelligence working to build skynet and take complete control over your life. Trust us!" />
                </div>
                <div className={styles.aboutHeading}>
                    <h1 className={globalStyles.gradientText}>The possibilities are beyond your imagination</h1>
                </div>
                <div className={styles.aboutContainer}>
                    <Feature title="Routes" subfeature={true} text="Plug in your start and destination and select from a host of routes. We offer routes optimized to best suit your needs whether you are looking for the shortest distance, least amount of travel time, or lowest average gas mileage." />
                    <Feature title="Stops" subfeature={true} text="Get stops suggested along your route suited to what you need. Explore options including hotels, restaurants, gas stations, attractions, historical sites, and so much more. " />
                    <Feature title="Music" subfeature={true} text="Connect your ____ music account and get a custom playlist of awesome tunes generated for each trip. Your playlist is tailored to offer a unique experience that fits with your trip and what you like to listen to." />
                </div>
            </div>
        </div>
    )
}

export default About