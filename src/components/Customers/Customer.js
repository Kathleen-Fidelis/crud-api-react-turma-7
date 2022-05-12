import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CustomerList from './List/CustomerList'
import { baseUrl } from '../../environments'

function Customer(props) {

    const URL = `${baseUrl}/Customer`
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        getTasks()
    }, [])

    const getTasks = () => {
        axios.get(`${URL}`)
        .then((response) => {
            setTasks(response.data)
        })
    }

    const editDescription = (task) => {
        if (task.description === '') {
            return
        }

        axios.put(`${URL}/${task.id}`, task)
        .then((response) => {
            getTasks()
        })
    }

    const deleteTask = (id) => {
        axios.delete(`${URL}/${id}`)
        .then((response) => {
            getTasks()
        })
    }

    return(
        <>
            <CustomerList tasks={tasks} 
                delete={deleteTask}
                editDescription={editDescription}
            />
        </>
    )
}

export default Customer