import React from 'react'
import CreatePet from './components/CreatePet'
import UpdatePet from './components/UpdatePet'
import DeletePet from './components/DeletePet'
import ShowPetsList from './components/ShowPetsList'

export default function index() {
    return (<>
        <div style={{ display: "flex" }}>
            <CreatePet />
            <UpdatePet />
            <DeletePet />
        </div>
        <div>
            <ShowPetsList />
        </div></>
    )
}
