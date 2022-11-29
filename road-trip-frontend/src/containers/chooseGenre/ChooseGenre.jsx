import React, {useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import globalStyles from "../container.module.css";
import styles from "../profile/editprofile.module.css";
import Select from "react-select"

const ChooseGenre = () => {

    const [genre, setGenre] = useState("");

    const options = [
        { value: 'acoustic', label: 'Acoustic' },
        { value: 'alternative', label: 'Alternative' },
        { value: 'blues', label: 'Blues' },
        { value: 'classical', label: 'Classical' },
        { value: 'country', label: 'Country' },
        { value: 'disco', label: 'Disco' },
        { value: 'disney', label: 'Disney' },
        { value: 'electronic', label: 'Electronic' },
        { value: 'folk', label: 'Folk' },
        { value: 'gospel', label: 'Gospel' },
        { value: 'hard-rock', label: 'Hard Rock' },
        { value: 'heavy-metal', label: 'Heavy Metal' },
        { value: 'hip-hop', label: 'Hip Hop' },
        { value: 'indie', label: 'Indie' },
        { value: 'jazz', label: 'Jazz' },
        { value: 'pop', label: 'Pop' },
        { value: 'punk-rock', label: 'Punk Rock' },
        { value: 'salsa', label: 'Salsa' },
        { value: 'show-tunes', label: 'Show Tunes' },
        { value: 'techno', label: 'Techno' },
    ];

    const handleChange = selectedOption => {
        setGenre(selectedOption);
    }

    const handleSubmit = async () => {

        try {
            window.sessionStorage.setItem('genre', genre);
            console.log(window.sessionStorage.getItem('spotifyLogged'));
            if (window.sessionStorage.getItem('spotifyLogged') === 'true') {
                window.location.replace("/add-playlist");
            } else {
                window.sessionStorage.setItem('spotifyLogged', 'true');
                fetch("http://trailblazers.gq:8080/spotify-login", {
                    headers: {
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                    }
                })
                    .then((response) => response.text())
                    .then((response) => {
                        window.location.replace(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        } catch (err) {
            if (!err?.response) {
                console.log("No Server Response");
            } else {
                console.log("Choose Genre Failed");
                console.log(err?.response);
            }
        }
    }

    return (
        <div className={globalStyles.sectionPadding}>
            <ToastContainer />
            <div className={styles.profile}>
                <div className={styles.profileContent}>
                    <h1 className={globalStyles.gradientText}>Update Profile</h1>
                    <div className={styles.profileInput}>
                        <Select
                            value={genre}
                            onChange={handleChange}
                            options={options}
                        />
                        <button type="button" onClick={handleSubmit}>Choose Genre</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChooseGenre