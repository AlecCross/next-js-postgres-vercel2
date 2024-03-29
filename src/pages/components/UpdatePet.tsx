import React, { useState } from 'react'

export default function UpdatePet() {
    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [newName, setNewName] = useState('');
    const [newOwner, setNewOwner] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/pets/update-pet', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, owner, newName, newOwner }),
            });
            const data = await response.json();
            console.log(data);
            // Reset form or give feedback to the user
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Current Pet Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Current Owner Name"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
            />
            <input
                type="text"
                placeholder="New Pet Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
            />
            <input
                type="text"
                placeholder="New Owner Name"
                value={newOwner}
                onChange={(e) => setNewOwner(e.target.value)}
            />
            <button type="submit">Update Pet</button>
        </form>
    );
}
