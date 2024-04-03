// import { useState, useEffect } from 'react';
// // import './EditCustomer.css'
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';

// const EditCustomer = (props) => {
//     const { id } = useParams(); // Assuming you're using the customer's ID in the URL
//     const navigate = useNavigate()

//     const [customerData, setCustomerData] = useState({
//         city: "",
//         street: "",
//         zipcode: "",
//         company: "",
//         name: "",
//         nip: "",
//     });

//     // Fetch customer data for editing
//     useEffect(() => {
//         axios.get(`http://localhost:5000/customers/${id}`)
//             .then((response) => {
//                 setCustomerData({
//                     city: response.data.address.city,
//                     street: response.data.address.street,
//                     zipcode: response.data.address.zipcode,
//                     company: response.data.company,
//                     name: response.data.name,
//                     nip: response.data.nip,
//                 });
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }, [id]);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setCustomerData({
//             ...customerData,
//             [name]: value,
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         axios
//             .put(`http://localhost:5000/customers/edit/${id}`, {
//                 name: customerData.name,
//                 address: {
//                     city: customerData.city,
//                     street: customerData.street,
//                     zipcode: customerData.zipcode,
//                 },
//                 company: customerData.company,
//                 nip: customerData.nip
//             })
//             .then(() => {
//                 props.allCustomers(); // Update the customer list in parent component or context
//                 navigate(`/customers/list`);
//             })
//             .catch((error) => {
//                 console.error(error);
//             });
//     }

//     return (
//         <div className="editCustomer container">
//             <form className="editCustomerData" onSubmit={handleSubmit}>
//     <h3>Edit Customer:  {customerData.name}</h3>
//     <input type="text" name="name" value={customerData.name} onChange={handleInputChange} placeholder="Name" />
//     <input type="text" name="company" value={customerData.company} onChange={handleInputChange} placeholder="Company" />
//     <input type="text" name="city" value={customerData.city} onChange={handleInputChange} placeholder="City" />
//     <input type="text" name="street" value={customerData.street} onChange={handleInputChange} placeholder="Street" />
//     <input type="text" name="zipcode" value={customerData.zipcode} onChange={handleInputChange} placeholder="Zipcode" />
//     <input type="text" name="nip" value={customerData.nip} onChange={handleInputChange} placeholder="NIP" />
//     <button className="btn">Update</button>
//             </form>
//         </div>
//     );
// };

// export default EditCustomer;