import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CustomerList from './List/CustomerList'
import { baseUrl } from '../../environments'

function Customer(props) {

    const URL = `${baseUrl}/Customer`
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        getCustomers()
    }, [])

    const getCustomers = () => {
        axios.get(`${URL}`)
        .then((response) => {
            setCustomers(response.data)
        })
    }

    const editCustomer = (customer) => {
        axios.put(`${URL}/${customer.id}`, customer)
        .then((response) => {
            getCustomers()
        })
    }

    const deleteCustomer = (id) => {
        axios.delete(`${URL}/${id}`)
        .then((response) => {
            getCustomers()
        })
    }

    return(
        <>
            <CustomerList customers={customers} 
                delete={deleteCustomer}
                editCustomer={editCustomer}/>
                {/* //usando apenas um função para editar */}
                {/* changeCustomer={changeCustomer}/> */}
            
        </>
    )
}

export default Customer