import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const CustomerForm = (props) => {
    const { id } = useParams(); // If there's an ID, we're editing; otherwise, we're adding
    const navigate = useNavigate();
    const isEditing = id !== undefined; // Determine if we are editing

    const [customerData, setCustomerData] = useState({
        city: "",
        street: "",
        zipcode: "",
        company: "",
        name: "",
        nip: "",
    });

    // Fetch customer data for editing if in edit mode
    useEffect(() => {
        if (isEditing) {
            axios.get(`http://localhost:5000/customers/${id}`)
                .then((response) => {
                    const { city, street, zipcode } = response.data.address;
                    setCustomerData({
                        city,
                        street,
                        zipcode,
                        company: response.data.company,
                        name: response.data.name,
                        nip: response.data.nip,
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [id, isEditing]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const endpoint = isEditing ? `http://localhost:5000/customers/edit/${id}` : "http://localhost:5000/customers/addcustomer";
        const method = isEditing ? axios.put : axios.post;

        method(endpoint, {
            name: customerData.name,
            address: {
                city: customerData.city,
                street: customerData.street,
                zipcode: customerData.zipcode,
            },
            company: customerData.company,
            nip: customerData.nip,
        })
        .then(() => {
            props.allCustomers(); // Refresh the list in the parent component
            navigate(`/customers/list`);
        })
        .catch((error) => {
            console.error(error);
        });
    };

    return (
        <div className={isEditing ? "editCustomer container" : "addCustomer container"}>
            <form className={isEditing ? "editCustomerData" : "addCustomerData"} onSubmit={handleSubmit}>
                <h1>{isEditing ? `Edit Customer: ${customerData.name}` : 'Create New Customer'}</h1>
                <input type="text" name="name" value={customerData.name} onChange={handleInputChange} placeholder="Name" />
    <input type="text" name="company" value={customerData.company} onChange={handleInputChange} placeholder="Company" />
    <input type="text" name="city" value={customerData.city} onChange={handleInputChange} placeholder="City" />
    <input type="text" name="street" value={customerData.street} onChange={handleInputChange} placeholder="Street" />
    <input type="text" name="zipcode" value={customerData.zipcode} onChange={handleInputChange} placeholder="Zipcode" />
    <input type="text" name="nip" value={customerData.nip} onChange={handleInputChange} placeholder="NIP" />
                <button className="btn">{isEditing ? 'Update' : 'Save'}</button>
            </form>
        </div>
    );
};

export default CustomerForm;