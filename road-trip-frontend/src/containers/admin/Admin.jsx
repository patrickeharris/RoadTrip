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
        console.log(user_id)
        try {
            const response = await myAxios.delete("/profile/delete", {
                    headers: {
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin' : '*',
                        'Authorization': window.sessionStorage.getItem('token')
                    },
                    data: {
                        user_id
                    }
                });
        } catch (err) {
            if (!err?.response) {
                console.log("No Server Response");
            } else {
                console.log("User Delete Failed");
                console.log(err?.response);
            }
        }
    }

    render(){
        return (
            <div className={styles.admin}>
                <h1 className={globalStyles.gradientText}>All Users</h1>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.tr}>
                            <th className={styles.th}>User ID</th>
                            <th className={styles.th}>First Name</th>
                            <th className={styles.th}>Last Name</th>
                            <th className={styles.th}>Email</th>
                            <th className={styles.th}>Remove User</th>
                        </tr>
                        {this.state.users.map(user =>{
                            return [
                                <tr className={styles.tr}>
                                    <td className={styles.td}>{user.user_id}</td>
                                    <td className={styles.td}>{user.firstName}</td>
                                    <td className={styles.td}>{user.lastName}</td>
                                    <td className={styles.td}>{user.email}</td>
                                    <td className={styles.td}><button className={styles.button} onClick={() => this.handleRemove(user.user_id)}>Remove User</button></td>
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