import { Link, useParams } from 'react-router-dom';
import './SingleCustomer.css';
import axios from 'axios';
import { useEffect, useState } from 'react';


const CustomerDetails = (props) => {

    const { id } = useParams()


    const [clientDetails, setClientDetails] = useState(null)
    const [clientActions, setClientActions] = useState([])

    const getActions = () => {
        axios
            .get(`http://localhost:5050/actions/${id}/actions`)
            .then((res) => {
                setClientActions(res.data)
            })
    }

    const getDetails = () => {
        axios
            .get(`http://localhost:5050/customers/${id}`)
            .then((res) => {
                setClientDetails(res.data)

            })
    }

    useEffect(() => {
        getDetails();
        getActions();
    }, [])

    return (
        <>
            <div className="customer">
                {clientDetails && (<table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr key={'head-customer'}>
                            <th scope="col">Id</th>
                            <th scope="col">Address</th>
                            <th scope="col">Company</th>
                            <th scope="col">Name </th>
                            <th scope="col">Nip</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={'body-customer'}>
                            <td>{id}</td>
                            <td>{clientDetails.address.street} {clientDetails.address.zipcode} {clientDetails.address.city}</td>
                            <td>{clientDetails.company}</td>
                            <td>{clientDetails.name}</td>
                            <td>{clientDetails.nip}</td>
                        </tr>
                    </tbody>
                </table>)}
                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr key={'head-actions'}>
                            <th scope="col">Action type</th>
                            <th scope="col">Date</th>
                            <th scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientActions.map((clientAction) => {
                            return (
                                <tr key={clientAction._id}>
                                    <td>{clientAction.type}</td>
                                    <td>{clientAction.date}</td>
                                    <td>{clientAction.description}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                    <div className="action">
                        <Link to={`/customers/${id}/add`} className="addaction">Add action</Link>
                    </div>
                </table>

            </div>
        </>
    )
}


export default CustomerDetails;