import { useState, useEffect } from 'react';
// import './EditCustomer.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditCustomer = (props) => {
    const { customerId } = useParams(); // Assuming you're using the customer's ID in the URL
    const navigate = useNavigate()

    const [customerData, setCustomerData] = useState({
        city: "",
        street: "",
        zipcode: "",
        company: "",
        name: "",
        nip: "",
    });

    // Fetch customer data for editing
    useEffect(() => {
        axios.get(`http://localhost:5050/customers/${customerId}`)
            .then((response) => {
                setCustomerData({
                    city: response.data.address.city,
                    street: response.data.address.street,
                    zipcode: response.data.address.zipcode,
                    company: response.data.company,
                    name: response.data.name,
                    nip: response.data.nip,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }, [customerId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerData({
            ...customerData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .put(`http://localhost:5050/customers/${customerId}`, {
                name: customerData.name,
                address: {
                    city: customerData.city,
                    street: customerData.street,
                    zipcode: customerData.zipcode,
                },
                company: customerData.company,
                nip: customerData.nip
            })
            .then(() => {
                props.allCustomers(); // Update the customer list in parent component or context
                navigate(`/customers/list`);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div className="editCustomer container">
            <form className="editCustomerData" onSubmit={handleSubmit}>
                <h1>Edit Customer</h1>
                {/* The form structure remains the same */}
                {/* Form fields here */}
                <button className="btn">Update</button>
            </form>
        </div>
    );
};

export default EditCustomer;