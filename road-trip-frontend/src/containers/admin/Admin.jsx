import {myAxios} from "../../util/helper";
import React from "react";
import styles from './admin.module.css'
import globalStyles from "../container.module.css";

class Admin extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        const fetchUserData = async () => {
            const response = (await myAxios.get("/register/users")).data;
            const users  = response;
            this.setState({
                users
            });
        };
        fetchUserData();
    }

    handleRemove = async (user_id) => {
        const fetchUserEmail = async () => {
            const response = (await myAxios.get("/register/users")).data;
            const users  = response;
            this.setState({
                users
            });
        };
        try {
            const response = await myAxios.delete(
                "/profile/delete",
                {
                    params: {user_id},
                    headers: {
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin' : '*',
                        'Authorization': window.sessionStorage.getItem('token')
                    },
                    withCredentials: true,
                });
        } catch (err) {
            if (!err?.response) {
                console.log("No Server Response");
            } else {
                console.log("User Delete Failed");
                console.log(err?.response);
            }
        }
        fetchUserEmail();
    }

    render(){
        return (
            <div className={styles.profileContent}>
                <table>
                    <tbody>
                        <tr>
                            <th>User ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Remove User</th>
                        </tr>
                        {this.state.users.map(user =>{
                            return [
                                <tr>
                                    <td>{user.user_id}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.email}</td>
                                    <td><button onClick={() => this.handleRemove(user.user_id)}>Remove User</button></td>
                                </tr>
                            ];
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}
export default Admin