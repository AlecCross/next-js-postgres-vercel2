import React, { useState } from 'react'

export default function DeletePet() {
    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/pets/delete-pet', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, owner }),
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
                placeholder="Pet Name to Delete"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Owner Name to Verify"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
            />
            <button type="submit">Delete Pet</button>
        </form>
    );
}
