import React from 'react'
import styles from './notification.module.css'
import {myAxios} from "../../util/helper";
import 'react-toastify/dist/ReactToastify.css';
import globalStyles from "../container.module.css";

class Notification extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            notifications: []
        }
    }

    componentDidMount() {
        const fetchUserData = async () => {
            const response1 = (await myAxios.get("/register/curUser", {
                headers:{
                    'Access-Control-Allow-Origin' : '*',
                    'Authorization': window.sessionStorage.getItem('token')}
            })).data;

            const response = (await myAxios.get("/get/notifications", {
                headers:{
                    'Access-Control-Allow-Origin' : '*',
                    'Authorization': window.sessionStorage.getItem('token')}
            })).data;
            const notifications = []
            for (let i = 0; i < response.length; i++) {
                if(response1.user_id === response[i].user){
                    console.log(response[i].notification)
                    this.setState(previousState => ({
                        notifications: [...previousState.notifications, response[i]]
                    }));
                    console.log(this.state.notifications);
                }
            }
        };
        fetchUserData();
    }

    render(){
        return (
            <div className={styles.profileContent}>
                <table>
                    <tbody>
                    <tr>
                        <h1 className={globalStyles.gradientText}>Notifications</h1>
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