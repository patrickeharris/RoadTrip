/*
    Things Left:
        - Pull current user's info from Rest API
        - Deal with styles
 */

import React, {Component, useState} from "react";
import EditableUserProfile from "../userprofile/EditableUserProfile";
import UserProfile from "../userprofile/UserProfile";


export default function Profile() {

    const [editMode, setEditMode] = useState(false);

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();

    const stored = {firstName, lastName, email};

    function handleEditComplete(result) {
        console.log("handleEditComplete", result);
        if (result != null) {
            setFirstName(result.firstName);
            setLastName(result.lastName);
            setEmail(result.email);
        }
        setEditMode(false);
    }

    return (
        <div className="container">
            <div className="Profile">
                {
                    editMode
                        ? <>
                            <h1>My Profile</h1>
                            <EditableUserProfile
                                stored={stored}
                                editCompleteCallback={handleEditComplete}
                            />
                        </>
                        : <>
                            <UserProfile
                                stored={stored}
                                startEditCallback={() => setEditMode(true)}
                            />
                        </>
                }
            </div>
        </div>
    );

}
