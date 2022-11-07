import React, {Component} from "react";
import {myAxios} from "../../util/helper";
import {Card} from "../index";
import Carousel from "react-multi-carousel";

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

export default class AddAPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    async componentDidMount() {
        const curUser = (await myAxios.get("/register/curUser")).data.user_id;
        const data = (await myAxios.get(
            "/playlists-all",
            {params: {curUser}
            }
        )).data;
        this.setState({ data });
    }
    render() {
        const { data } = this.state;

        const itemList = data.map(async function (item) {
            console.log(item.user_id);
            console.log((await myAxios.get("/register/curUser")).data.user_id);
            if ('' + item.user_id === (await myAxios.get("/register/curUser")).data.user_id) {
                console.log(item);
                const description = "Link: " + item.playlistLink;
                const id = item.playlistID;
                const trip_id = window.sessionStorage.getItem('curTrip');
                return <div><Card title={item.playlistName} description={description}

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