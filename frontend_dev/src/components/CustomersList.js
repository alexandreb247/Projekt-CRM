import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'; 
import axios from "axios";
import { useEffect, useState } from "react";
import './CustomersList.css';

const CustomersList = (props) => {
    const [searchPhrase, setSearchPhrase] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState([]);

    useEffect(() => {
        const newList = props.customers.filter(customer =>
            customer.name.toLowerCase().includes(searchPhrase.toLowerCase())
        );
        setFilteredCustomers(newList);
    }, [searchPhrase, props.customers]);

    const removeCustomer = (id) => {
        if (window.confirm('Usunąć klienta?')) {
            axios.delete(`http://localhost:5000/customers/delete/${id}`)
                .then(() => {
                    props.allCustomers();
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    };

    return (
        <>

            <div className="customerCount">
              <h3>  Liczba klientów w bazie danych: {filteredCustomers.length} </h3>
            </div>
            <div className="customers table">
                <table className="table table-bordered">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Nr</th>
                            <th scope="col">Adres</th>
                            <th scope="col">Firma</th>
                            <th scope="col">Nazwa klienta</th>
                            <th scope="col">Nip</th>
                            <th scope="col">Menu</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCustomers.map((customer, index) => ( 
                            <tr key={customer._id}>
                                <td>{index + 1}</td> 
                                <td>{`${customer.address.street} ${customer.address.zipcode} ${customer.address.city}`}</td>
                                <td>{customer.company}</td>
                                <td>{customer.name}</td>
                                <td>{customer.nip}</td>
                                <td>
                                <LinkContainer to={`/customers/${customer._id}`}>
                                    <Button variant="info">Szczegóły</Button>
                                </LinkContainer>
                                <LinkContainer to={`/customers/edit/${customer._id}`}>
                                    <Button variant="primary">Edycja</Button>
                                </LinkContainer>
                                <Button variant="danger" onClick={() => removeCustomer(customer._id)}>
                                    Usuń
                                </Button>
                            </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <input
                    type="text"
                    placeholder="Szukaj klienta..."
                    onChange={(e) => setSearchPhrase(e.target.value)}
                />
                <LinkContainer to="/customers/addcustomer">
                    <Button variant="success">Dodaj klienta</Button>
                </LinkContainer>
            </div>
        </>
    );
};

export default CustomersList;