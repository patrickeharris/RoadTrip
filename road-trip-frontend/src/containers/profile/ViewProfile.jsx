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
            const response = (await myAxios.get("/register/curUser", {
                headers:{
                    'Access-Control-Allow-Origin' : '*',
                    'Authorization': window.sessionStorage.getItem('token')}
            })).data;
            const user  = response;
            this.setState({
                user
            });
        };
        fetchUserID();
    }

    handleSubmit = () => {
        window.location.replace("/edit-profile");
    }

    render(){
        return (
            <div className={globalStyles.sectionPadding}>
                <ToastContainer />
                <div className={styles.profile}>
                    <div className={styles.profileContent}>
                        <h1 className="font-sans text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-orange-300">Profile</h1>
                        <h2 className="font-sans text-white text-lg">User ID: {this.state.user.user_id}</h2>
                        <h2 className="font-sans text-white text-lg">First Name: {this.state.user.firstName}</h2>
                        <h2 className="font-sans text-white text-lg">Last Name: {this.state.user.lastName}</h2>
                        <h2 className="font-sans text-white text-lg mb-2">Email: {this.state.user.email}</h2>
                        <button type="button" className="bg-red-500 hover:bg-red-700 text-white text-lg rounded py-2 px-5 font-bold" onClick={this.handleSubmit}>Update Profile</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewProfile