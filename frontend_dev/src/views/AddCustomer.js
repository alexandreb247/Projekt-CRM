import { useState } from 'react';
// import './AddCustomer.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCustomer = (props) => {
    const navigate = useNavigate()


    const [customerData, setCustomerData] = useState({
        city: "",
        street: "",
        zipcode: "",
        company: "",
        name: "",
        nip: "",
    });

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;

        setCustomerData({
            ...customerData,
            [name]: target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:5050/customers/addcustomer", {
                name: customerData.name,
                address: {
                    city: customerData.city,
                    street: customerData.street,
                    zipcode: customerData.zipcode,
                },
                company: customerData.company,
                nip: customerData.nip

            })
            .then((res) => {
                props.allCustomers()
                navigate(`/customers/list`)

            })


            .catch((error) => {
                console.error(error);
            });
    }



    return (
        <div className="addCustomer container">
            <form className="addCustomerData" onSubmit={handleSubmit}>
                <h1>Create new customer</h1>
                <label>Name
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={customerData.name}
                        onChange={handleInputChange}
                    />
                </label>
                <label>Address</label>
                <div className='address'>
                    <label>City
                        <input
                            type='text'
                            id='city'
                            name='city'
                            value={customerData.city}
                            onChange={handleInputChange} />
                    </label>
                    <label>Street
                        <input
                            type='text'
                            id='street'
                            name='street'
                            value={customerData.street}
                            onChange={handleInputChange} />
                    </label>
                    <label>Zipcode
                        <input
                            type='text'
                            id='zipcode'
                            name='zipcode'
                            value={customerData.zipcode}
                            onChange={handleInputChange} />
                    </label>
                </div>
                <label>Company
                    <input
                        type='text'
                        id='company'
                        name='company'
                        value={customerData.company}
                        onChange={handleInputChange} />
                </label>
                <label>Nip
                    <input
                        type='text'
                        id='nip'
                        name='nip'
                        value={customerData.nip}
                        onChange={handleInputChange} />
                </label>
                <button className="btn">Save</button>
            </form>
        </div>
    );
};

export default AddCustomer;