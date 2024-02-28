// import './Login.css'
import { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const navigate = useNavigate()
    
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loginMessage, setLoginMessage] = useState('')

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
      
        setFormData({
            ...formData,
            [name]: target.value,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        
        axios
        .post("http://localhost:5050/users/login", {
            email: formData.email,
            password: formData.password
        })
        .then((res) => {
            if (Array.isArray(res.data.email)) {
                setLoginMessage(res.data.email[0])
            } else if (Array.isArray(res.data.password)) {
                setLoginMessage(res.data.password[0])
            } else if (res.data.error) {
                setLoginMessage('Incorrect email or password');
            } else {
                setLoginMessage("");
                props.setUser(res.data)
                localStorage.setItem('user', JSON.stringify(res.data));
                navigate("/customers/list")
            }

            console.log(res.data)
            
        })
        .catch((error)=> {
            console.error(error);
        });
    }


    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="header">
                    <div className="text">Login</div>
                    <div className="underline"></div>
                </div>
                {loginMessage && <h2>{loginMessage}</h2>}
                <div className="inputs">
                    <div className="input">
                        <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleInputChange} />
                    </div>
                    <div className="input">
                        <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} />
                    </div >
                </div >
                <div className="submit-container">
                    <button className="submit">Login</button>
                </div>
            </form>
        </div >
        
    )
}

export default Login;