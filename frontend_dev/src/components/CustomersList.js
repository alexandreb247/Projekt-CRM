import axios from "axios";
import { useEffect, useState } from "react";
// import './CustomersList.css';
import { Link } from "react-router-dom";



const CustomersList = (props) => {
    const [searchPhrase, setSearchPhrase] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState([]);


    const filterCustomerList = () => {

        let newList = props.customers.filter((customer) => {
            return customer.name.toLowerCase().includes(searchPhrase)
        })

        setFilteredCustomers(newList);
    }


    useEffect(() => {
        filterCustomerList()
    }, [searchPhrase]);


    useEffect(() => {
        setFilteredCustomers(props.customers)
    }, [props.customers]);




    const removeCustomer = (id) => {
        if (window.confirm('Usunąć klienta?')) {
            axios
                .delete(`http://localhost:5050/customers/delete/${id}`)
                .then((res) => {
                    props.allCustomers()
                })
                .catch((err) => {
                    console.error(err)

                })
        }

    };


    return (
        <>  <div>
            <form className="findCustomerForm">
                <textarea placeholder="Find customer..." onChange={(e) => setSearchPhrase(e.target.value)}></textarea>
                <Link to={`/customers/addcustomer`} className="btn">Add</Link>
            </form>
        </div>
            <div className="customers table">
                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Address</th>
                            <th scope="col">Company</th>
                            <th scope="col">Name</th>
                            <th scope="col">Nip</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map((customer) => {
                            return (
                                <tr key={customer._id} >
                                    <td>{customer._id}</td>
                                    <td> {customer.address.street} {customer.address.zipcode} {customer.address.city} </td>
                                    <td>{customer.company}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.nip}</td>
                                    <td><Link to={`/customers/${customer._id}`} className="knob">Details</Link>
                                        <button className="knob" onClick={() => removeCustomer(customer._id)}>Delete</button>
                                    </td>
                                </tr>
                            );

                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default CustomersList;