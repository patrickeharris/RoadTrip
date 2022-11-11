import React, {Component, useEffect, useState} from "react";
import {myAxios} from "../../util/helper";
import PlaylistCard from "../playlist-card/Playlist-Card";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

export default function AddPlaylist() {

    const [userTopPlaylists, setUserTopPlaylists] = useState();

    useEffect(() => {
        fetch("http://trailblazers.gq:8080/user-playlists")
            .then(response => response.json())
            .then(data => {
                console.log("hmm")
                console.log(data)
                setUserTopPlaylists(data);
            })
    }, []);

    console.log(userTopPlaylists);

    return <Carousel responsive={responsive}>{
            <div>
                {userTopPlaylists ? (
                        userTopPlaylists.map((playlistResult) => {
                            console.log(playlistResult);
                            const description = "Link: " + playlistResult.externalUrls.externalUrls.spotify;
                            const trip_id = window.sessionStorage.getItem('curTrip');
                            return <PlaylistCard title={playlistResult.name} description={description}

                                         selectButton={<button onClick={async function selectPlaylist() {

                                             const curUser = (await myAxios.get("/register/curUser")).data.user_id;

                                             const id = await myAxios.post(
                                                 "/save-playlist",
                                                 JSON.stringify({user_id: curUser, playlistName: playlistResult.name,
                                                     playlistLink: playlistResult.externalUrls.externalUrls.spotify}),
                                                 {headers:  {
                                                         "Content-Type": "application/json",
                                                         'Access-Control-Allow-Origin': '*',
                                                         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
                                                     }, withCredentials: true
                                                 })
                                             console.log("id")
                                             console.log(id.data)

                                             const params = new URLSearchParams({
                                                 trip_id: trip_id,
                                                 playlistID: id.data
                                             }).toString();
                                             const url = "http://trailblazers.gq:8080/add-playlist?" + params
                                             await myAxios.post(
                                                 url,
                                                 {},
                                                 {headers:  {
                                                         "Content-Type": "application/json",
                                                         'Access-Control-Allow-Origin': '*',
                                                         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
                                                     }, withCredentials: true
                                                 })

                                             await myAxios.post(
                                                 url,
                                                 null,
                                                 {
                                                     params: {},
                                                     headers: {
                                                         'Access-Control-Allow-Origin': '*',
                                                         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                                                     }, withCredentials: true
                                                 });
                                             window.location.replace("/trip-dashboard");
                                         }}>Select Playlist</button>}>
                            </PlaylistCard>
                        })
                    ):
                    (
                        <h1>LOADING...</h1>
                    )
                }
            </div>}</Carousel>;


    /*
    const itemList = {userTopPlaylists ? (userTopPlaylists.map(async function (item) {
        console.log(item.user_id);
        console.log(curUser);
        if ('' + item.user_id === (await myAxios.get("register/curUser")).data.user_id) {
            console.log(item);

            const description = "Link: " + item.owner.external_links.spotify;
            const trip_id = window.sessionStorage.getItem('curTrip');
            const id = item.playlistID;
            return <div><Card title={item.name} description={description}

                              selectButton={<button onClick={async function selectPlaylist() {
                                  await myAxios.post(
                                      "/add-playlist",
                                      null,
                                      {
                                          params: {trip_id, id},
                                          headers: {
                                              "Content-Type": "application/json",
                                              'Access-Control-Allow-Origin': '*',
                                              'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                                          },
                                          withCredentials: true,
                                      });
                                  window.location.replace("/trip-dashboard");
                              }}>Select Playlist</button>}>
            </Card>
            </div>
        }
    }))}

     */

    // return <Carousel responsive={responsive}>{itemList}</Carousel>;
}

/*
export default class AddAPlaylist extends Component {

    /*
    async componentDidMount() {

        const [userTopPlaylists, setUserTopPlaylists] = useState();
        useEffect(() => {
            fetch("http://localhost:8080/user-playlists")
                .then(response => response.json())
                .then(data => {
                    console.log("hmm")
                    console.log(data)
                    setUserTopPlaylists(data);
                })
        }, []);

        console.log(userTopPlaylists);

        this.setState({data: userTopPlaylists,
            curUser: (await myAxios.get("register/curUser")).data.user_id});
    }



    /*
    renderPlaylists = async () => {


        const [userTopPlaylists, setUserTopPlaylists] = useState();
        useEffect(() => {
            fetch("http://localhost:8080/user-playlists")
                .then(response => response.json())
                .then(data => {
                    console.log("hmm")
                    console.log(data)
                    setUserTopPlaylists(data);
                })
        }, [])



            /*
            userTopPlaylists.map(async (playlistResult) => {
                const name = playlistResult.name;
                const link = playlistResult.owner.external_links.spotify;
                const id = (await myAxios.get("/register/curUser")).data.user_id;
                console.log(name);
                console.log(link);
                console.log(id);
                await myAxios.post(
                    "/save-playlist",
                    JSON.stringify({id, name, link}),
                    {
                        headers: {
                            "Content-Type": "application/json",
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                        },
                        withCredentials: true,
                    });
            });
            console.log((await myAxios.get("playlists-all")).data);
            this.setState({data: (await myAxios.get("playlists-all")).data,
                curUser: (await myAxios.get("register/curUser")).data.user_id});



        this.setState({data: userTopPlaylists,
            curUser: (await myAxios.get("register/curUser")).data.user_id});

    }


    render() {

        const [userTopPlaylists, setUserTopPlaylists] = useState();

        useEffect(() => {
            fetch("http://localhost:8080/user-playlists")
                .then(response => response.json())
                .then(data => {
                    console.log("hmm")
                    console.log(data)
                    setUserTopPlaylists(data);
                })
        }, []);

        console.log(userTopPlaylists);



        for (let i = 0; i < data.length; i++) {
            if ('' + data[i].user_id === curUser) {

                const description = "Link: " + data[i].playlistLink;
                const trip_id = window.sessionStorage.getItem('curTrip');
                const id = data[i].playlistID;
                return <div><Card title={data[i].playlistName} description={description}

                                  selectButton={<button onClick={async function selectPlaylist() {
                                      await myAxios.post(
                                          "/add-playlist",
                                          null,
                                          {
                                              params: {trip_id, id},
                                              headers: {
                                                  "Content-Type": "application/json",
                                                  'Access-Control-Allow-Origin': '*',
                                                  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                                              },
                                              withCredentials: true,
                                          });
                                      window.location.replace("/trip-dashboard");
                                  }}>Select Playlist</button>}>
                </Card>
                </div>
            }
        }




        const itemList = userTopPlaylists.map(async function (item) {
            console.log(item.user_id);
            console.log(curUser);
            if ('' + item.user_id === (await myAxios.get("register/curUser")).data.user_id) {
                console.log(item);

                const description = "Link: " + item.owner.external_links.spotify;
                const trip_id = window.sessionStorage.getItem('curTrip');
                const id = item.playlistID;
                return <div><Card title={item.name} description={description}

                                  selectButton={<button onClick={async function selectPlaylist() {
                                      await myAxios.post(
                                          "/add-playlist",
                                          null,
                                          {
                                              params: {trip_id, id},
                                              headers: {
                                                  "Content-Type": "application/json",
                                                  'Access-Control-Allow-Origin': '*',
                                                  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                                              },
                                              withCredentials: true,
                                          });
                                      window.location.replace("/trip-dashboard");
                                  }}>Select Playlist</button>}>
                </Card>
                </div>
            }
        });


        return <Carousel responsive={responsive}>{itemList}</Carousel>;
    }
}
*/