import { useState, useEffect } from 'react';
import Group from './Group';

export default function EditableUserProfile({
                                                stored,
                                                editCompleteCallback
                                            }) {

    console.log("Edit User Profile");

    const [firstName, setFirstName] = useState(stored.firstName);
    const [lastName, setLastName] = useState(stored.lastName);
    const [email, setEmail] = useState(stored.email);


    function handleCancelClicked() {
        editCompleteCallback(null);
    }

    function handleSaveClicked() {
        console.log("Saved");
        editCompleteCallback({firstName, lastName, email});
    }

    return <>
        <Group>
            <h2>First Name:</h2>
            <input
                type='text'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
            />
        </Group>
        <Group>
            <h2>Last Name:</h2>
            <input
                type='text'
                value={lastName}
                onChange={e => setLastName(e.target.value)}
            />
        </Group>
        <Group>
            <h2>Email:</h2>
            <input
                type='text'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
        </Group>
        <Group>
            <button onClick={handleSaveClicked}>Save</button>
            <button onClick={handleCancelClicked}>Cancel</button>
        </Group>
    </>
}