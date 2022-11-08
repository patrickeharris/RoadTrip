import {myAxios} from "../../util/helper";
import React from "react";
import styles from "./editprofile.module.css";
import globalStyles from "../container.module.css";
import {ToastContainer} from "react-toastify";

class ViewProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            user: ''
        }
    }

    componentDidMount() {
        const fetchUserID = async () => {
            const response = (await myAxios.get("/register/curUser")).data;
            const user  = response;
            this.setState({
                user
            });
        };
        fetchUserID();
    }

    handleSubmit = () => {
        window.location.replace("editprofile");
    }

    render(){
        return (
            <div className={globalStyles.sectionPadding}>
                <ToastContainer />
                <div className={styles.profile}>
                    <div className={styles.profileContent}>
                        <h1 className={globalStyles.gradientText}>Profile</h1>
                        <div className={styles.profileInput}>
                            <table>
                                <tbody>
                                <tr>
                                    <th>User ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                </tr>
                                <tr>
                                    <th>{this.state.user.user_id}</th>
                                    <th>{this.state.user.firstName}</th>
                                    <th>{this.state.user.lastName}</th>
                                    <th>{this.state.user.email}</th>
                                </tr>
                                </tbody>
                            </table>
                            <button type="button" onClick={this.handleSubmit}>Update Profile</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ViewProfile

/*
            <div>
                <table>
                    <tbody>
                    <tr>
                        <th>User ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                    </tr>
                    <tr>
                        <th>{this.state.user.user_id}</th>
                        <th>{this.state.user.firstName}</th>
                        <th>{this.state.user.lastName}</th>
                        <th>{this.state.user.email}</th>
                    </tr>
                    </tbody>
                </table>
            </div>
 */