import {myAxios} from "../../util/helper";
import React from "react";

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
            console.log(response);
            const users  = response;
            console.log(users)
            this.setState({
                users
            });
        };
        fetchUserEmail();
    }

    handleRemove = () => {

    }

    render(){
        return (
            <table>
                <tr>
                    <th>User ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Remove User</th>
                </tr>
                <tbody>
                    {this.state.users.map(user =>{
                        return [
                            <tr>
                                <td>{user.user_id}</td>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <button onClick={this.handleRemove}>Remove User</button>
                            </tr>
                        ];
                    })}
                </tbody>
            </table>
        );
    }
}
export default Admin