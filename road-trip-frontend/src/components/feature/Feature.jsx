import React from 'react'
import styles from './feature.module.css'

const Feature = ({title, text, subfeature}) => {
    if(subfeature) {
        return (
            <div className={styles.subfeature}>
                <div className={styles.featureTitle}>
                    <div/>
                    <h1>{title}</h1>
                </div>
                <div className={styles.featureText}>
                    <div className={styles.subFeatureText}>
                        <p>{text}</p>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className={styles.feature}>
                <div className={styles.featureTitle}>
                    <div/>
                    <h1>{title}</h1>
                </div>
                <div className={styles.featureText}>
                    <p>{text}</p>
                </div>
            </div>
        )
    }
}

export default Feature