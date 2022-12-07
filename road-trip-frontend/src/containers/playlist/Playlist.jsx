import React, {useState, useEffect} from "react";
import {toast, ToastContainer} from "react-toastify";
import globalStyles from "../container.module.css";
import styles from "../profile/editprofile.module.css";
import {myAxios} from "../../util/helper";

const Playlist = () => {

    const [genre, setGenre] = useState({ value: 'default', label: 'Choose Genre'});
    const [playlistName, setPlaylistName] = useState("");
    const [playlistUrl, setPlaylistUrl] = useState("");
    const [hidden, setHidden] = useState(false);

    const options = [
        { value: 'default', label: 'Choose Genre'},
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

    useEffect(() => {
        if (window.sessionStorage.getItem('token') === null) {
            window.location.replace("/login");
        }
    })

    const handleChange = selectedOption => {
        setGenre(selectedOption.target.value);
    }

    const handleSubmit = async () => {

        console.log(genre.value);
        if (genre.value === 'default') {
            toast.error('Choose a Genre!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            console.log(genre);
            const response = await (myAxios.get("/generate-recommendations",
                {
                    params: {trip_id: window.sessionStorage.getItem('curTrip'),genre: genre, playlistName: playlistName},
                    headers: {
                        'Access-Control-Allow-Origin' : '*',
                        'Access-Control-Allow-Headers' : '*',
                        'Authorization': window.sessionStorage.getItem('token')}
                }))
            console.log(response.data);

            setPlaylistUrl(response.data)
            console.log(playlistUrl);
            setHidden(true);
        }
    }

    return (
        <div className={globalStyles.sectionPadding}>
            <ToastContainer />
            <div className={styles.profile}>
                <div className={styles.profileContent}>
                    <h1 className="font-sans text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-orange-300">Generate Playlist</h1>
                    <div className={styles.profileInput}>
                        <input className="font-sans" type="text" placeholder="Playlist Name" onChange={(e) => setPlaylistName(e.target.value)} value={playlistName}/>
                        <select
                            className="font-sans bg-[#031B34] text-gray-300 flex text-center w-full py-3 px-10 rounded"
                            value={genre.value}
                            onChange={handleChange}
                        >{options.map(option => {
                            return (<option value={option.value}>{option.label}</option>)
                        })}</select>
                    </div>
                    <button className='font-sans font-bold bg-green-500 hover:bg-green-700 text-white text-md py-3 px-4 rounded mb-4 mt-2' type="button" onClick={handleSubmit}>Generate Playlist</button>
                    {hidden &&
                        <div>
                            <iframe title="Spotify Web Player"
                                    src={`https://open.spotify.com/embed${playlistUrl.substring(24)}`}
                                    width="500"
                                    height="580"
                                    allow="encrypted-media"
                                    />
                        </div>}
                    <button className='font-sans font-bold bg-red-500 hover:bg-red-700 text-white text-md py-3 px-4 rounded mt-4' type="button" onClick={() =>{window.location.replace("/trip-dashboard")}}>Back To Trips</button>
                </div>
            </div>
        </div>
    )
}

export default Playlist