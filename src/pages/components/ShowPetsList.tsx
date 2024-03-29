import React, { useEffect, useState } from 'react';

interface Pet {
    name: string;
    owner: string;
}

export default function ShowPetsList() {
    const [pets, setPets] = useState<Pet[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchPets();
        }, 5000); // Оновлюємо список тварин кожні 5 секунд

        return () => clearInterval(interval);
    }, []);

    const fetchPets = async () => {
        try {
            const response = await fetch('/api/pets/get-pets');
            const data = await response.json();
            setPets(data.pets);
        } catch (error) {
            console.error('Error fetching pets:', error);
        }
    };

    return (
        <div>
            <h2>Real Time Pet List</h2>
            <ul>
                {pets.map((pet, index) => (
                    <li key={index}>{`${pet.name}, owned by ${pet.owner}`}</li>
                ))}
            </ul>
        </div>
    );
}
