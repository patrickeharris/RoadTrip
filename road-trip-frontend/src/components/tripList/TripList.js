import React, { Component } from 'react';
import {myAxios} from "../../util/helper";
import {Carousel} from "react-bootstrap";
import {Card} from "../index";
import styles from "./triplist.module.css";
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
export default class TripList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }
    async componentDidMount() {
        const data = (await myAxios.get(
            "/trips"
        )).data;
        this.setState({ data });
    }

    render() {
        const { data } = this.state;
        const itemList = data.map(function(item) {
            console.log(item);
            const description = "Start: " + item.start + "\n End: " + item.end + "\n Date: " + item.date;
            return <div><Card title={item.tripName} description={description}/></div>;
        });
        return itemList;
    }

}