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
        const fetchUserEmail = async () => {
            const response = (await myAxios.get("/register/users")).data;
            const users  = response;
            this.setState({
                users
            });
        };
        fetchUserEmail();
    }

    handleRemove = async (user_id) => {
        console.log(user_id)
        try {
            const response = await myAxios.post(
                "/register/remove",
                null,
                {
                    params: {user_id},
                    headers: {
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
                    },
                    withCredentials: true,
                });
        } catch (err) {
            if (!err?.response) {
                console.log("No Server Response");
            } else {
                console.log("Registration Failed");
                console.log(err?.response);
            }
        }
    }

    render(){
        return (
            <div>
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