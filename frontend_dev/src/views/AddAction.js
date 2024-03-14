import { useState } from 'react';
//import './AddAction.css'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const AddAction = (props) => {
    
    const navigate = useNavigate()
    const { id } = useParams()

    const [formData, setFormData] = useState({
        description: "",
        type: "",
        date: "",
        customerId: id
    });

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;

        setFormData((prevDataForm) => {
            return{
            ...prevDataForm,
            [name]: target.value};
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData)

        axios
            .post(`http://localhost:5050/actions/${id}/add`, {
                description: formData.description,
                type: formData.type,
                date: formData.date,
                customerId: formData.customerId
            })
            .then((res) => {
                setFormData(res.data)
                navigate(`/customers/${id}`)

            })
            .catch((error) => {
                console.error(error);
            });
    }



    return (
        <div className="addAction">
            <form className="addActionData" onSubmit={handleSubmit}>
                <h1>New action</h1>
                <label>Action type
                    <input
                        type='text'
                        id='type'
                        name='type'
                        value={formData.type}
                        onChange={handleInputChange}
                    />
                </label>
                <label>Description
                    <input
                        type='text'
                        id='description'
                        name='description'
                        value={formData.description}
                        onChange={handleInputChange} />
                </label>
                <label>Date
                    <input
                        type='text'
                        id='date'
                        name='date'
                        value={formData.date}
                        onChange={handleInputChange} />
                </label>
                <button className="btn">Save</button>
            </form>
        </div>
    );
};

export default AddAction;