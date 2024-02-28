import { useState } from 'react';
// import './Signup.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: ''
    })


    const validate = () => {
        let validationErrors = {
            name: false,
            email: false,
            password: false,
        }
        if (formData.name.trim().length < 4) {
            validationErrors.name = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors, name: "Username should have at least 4 characters",
                }
            })
        } else if (!/^[^\s]*$/.test(formData.name.trim())) {
            validationErrors.name = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors, name: "Username shouldn't have empty characters",
                }

            })
        } else {
            validationErrors.name = false;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors, name: "",
                }
            })
        }

        if (!/^[A-Z0-9_.%+-]+@[A-Z0-9_.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
        ) {
            validationErrors.email = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    email: "The email is not valid",
                }
            })

        } else {
            validationErrors.email = false;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    email: "",
                }
            })
        }

        if (formData.password.trim().length < 8) {
            validationErrors.password = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: "Password should have at least 8 characters",
                }
            })

        } else if (!/^[^\s]*$/.test(formData.password.trim())) {
            validationErrors.password = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: "Password shouldn't have empty characters",
                }

            })
        } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(formData.password.trim())) {
            validationErrors.password = true;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: "Password must have at least one of characters: ! # @ & %",
                }
            })

        } else {
            validationErrors.password = false;
            setErrors((prevErrors) => {
                return {
                    ...prevErrors,
                    password: "",
                }
            })
        }



        return (
            !validationErrors.name && !validationErrors.email && !validationErrors.password
        )
    }


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

        if (!validate()) {
            return
        }

        axios
            .post("http://localhost:5050/users/signup", {
                name: formData.name,
                email: formData.email,
                password: formData.password
            })
            .then((res) => {
                console.log(res.data);
                navigate("/login")

            })
            .catch((error) => {
                console.error(error);
            });
    }


    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="header">
                    <div className="text">Sign Up</div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    <div className="input">
                        <input type="text" name="name" placeholder="Username" onChange={handleInputChange} />
                    </div>
                    {errors.name && <p>{errors.name}</p>}
                    <div className="input">
                        <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
                    </div>
                    {errors.email && <p>{errors.email}</p>}
                    <div className="input">
                        <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
                    </div >
                    {errors.password && <p>{errors.password}</p>}
                </div >
                <div className="submit-container">
                    <button className="submit" >Sign Up
                    </button>
                </div>
            </form>
        </div >

    )
}

export default Signup;