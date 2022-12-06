import React, {useState} from "react";
import styles from "./track.card.module.css"

/**
 * NOTES:
 * - On styling:
 * For this test I moved the styles to styles.css.
 * - On conditional rendering:
 * The conditional statement that checks whether or not to display an image
 * exists within the 'CardImage' function. Used in the component as:
 * <CardImage />
 * - On default props:
 * I have no idea whether this approach of handling defaults is the right/best one.
 * Next step would be to try variations on setting defaults.
 */

/*
1. Card Class
2. Defaults
*/

// 1. Card Class /////////////////////////////////////////////

function CardContent(props) {
    return (
        <div className={styles.styleCardContent}>
            <p className={styles.styleCardTitle}>{props.title}</p>
            <p className={styles.styleDescription}>{props.artists}</p>
            <p className={styles.styleDescription}>{props.link}</p>
            <p className={styles.styleButton}>{props.addButton}</p>
        </div>
    );
}

export default class TrackCard extends React.Component {
    render() {
        return (
            <div style={{ width: this.props.width + "px" }}>
                <div className={styles.styleCard}>
                    <CardContent
                        title={this.props.title}
                        artists={this.props.artists}
                        link={this.props.link}
                        addButton={this.props.addButton}
                    />
                </div>
            </div>
        );
    }
}

// 2. Defaults /////////////////////////////////////////////
TrackCard.defaultProps = {
    width: 350,
    title: "Template - Card Title",
    artists: "Artists here",
    link: "Link here"
};
