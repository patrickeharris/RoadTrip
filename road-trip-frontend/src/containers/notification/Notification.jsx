import React, {useEffect, useRef, useState} from 'react'
import styles from './notification.module.css'
import globalStyles from "../container.module.css";
import {myAxios} from "../../util/helper";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Notification extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            notifications: []
        }
    }

    componentDidMount() {
        const fetchUserData = async () => {
            const response1 = (await myAxios.get("/register/curUser")).data;

            const response = (await myAxios.get("/get/notifications"))
            console.log(response[0]);
            console.log(response.data.length)
            for (let i = 0; i < response.data.length; i++) {
                if(response1.user_id === response[i].user){

                }
            }
            this.setState({
                notifications
            });
        };
        fetchUserData();
    }

    render(){
        return (
            <div className={styles.profileContent}>
                <table>
                    <tbody>
                    <tr>
                        <th>Notification</th>
                    </tr>
                    {this.state.notifications.map(notification =>{
                        return [
                            <tr>
                                <td>{notification.notification}</td>
                            </tr>
                        ];
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Notification