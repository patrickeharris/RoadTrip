import { useState } from 'react';
import Group from './Group';

export default function EditableUserProfile({
                                                stored,
                                                startEditCallback
                                            }) {

    console.log()

    return <div>
        <Group>
            <h2>First Name:</h2> {stored.firstName}
        </Group>
        <Group>
            <h2>Last Name:</h2> {stored.lastName}
        </Group>
        <Group>
            <h2>Email:</h2> {stored.email}
        </Group>
        <Group>
            <button

                onClick={startEditCallback}
            >Edit</button>
        </Group>
    </div>
}