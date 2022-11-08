import React, {useState} from "react";
import styles from "./playlist.card.module.css"

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
function CardImage(props) {
    const isImageURL = "https://www.protocol.com/media-library/spotify-app-with-headphones-on.png?id=29171621&width=1245&height=700&quality=85&coordinates=0%2C0%2C0%2C0";
    // If an image was passed:
    if (isImageURL) {
        return (
            <div className={styles.styleImage}>
                <img
                    style={{ width: props.width + "px", marginTop: "-8%" }}
                    src={"https://www.protocol.com/media-library/spotify-app-with-headphones-on.png?id=29171621&width=1245&height=700&quality=85&coordinates=0%2C0%2C0%2C0"}
                    alt="Spotify"
                />
            </div>
        );
    }
    return null;
}

function CardContent(props) {
    return (
        <div className={styles.styleCardContent}>
            <p className={styles.styleCardTitle}>{props.title}</p>
            <p className={styles.styleDescription}>{props.description}</p>
            <p className={styles.styleButton}>{props.selectButton}</p>
        </div>
    );
}

export default class PlaylistCard extends React.Component {
    render() {
        return (
            <div style={{ width: this.props.width + "px" }}>
                <div className={styles.styleCard}>
                    <CardImage image={this.props.image} width={this.props.width} />
                    <CardContent
                        title={this.props.title}
                        description={this.props.description}
                        selectButton={this.props.selectButton}
                    />
                </div>
            </div>
        );
    }
}

// 2. Defaults /////////////////////////////////////////////
PlaylistCard.defaultProps = {
    width: 350,
    title: "Template - Card Title",
    description: "Link here"
};
