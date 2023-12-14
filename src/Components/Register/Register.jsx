import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Joi from 'joi';
import {useNavigate} from 'react-router-dom'
export default function Register() {
    const initialUserData = {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        phone: '',
    };

    const [user, setUser] = useState({ ...initialUserData });
    const [validationError, setValidationError] = useState([]);
    const [apiError, setApiError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    let navigate = useNavigate()


    function handleChange(e) {
        let currentUser = { ...user };
        currentUser[e.target.name] = e.target.value;
        setUser(currentUser);

        // Clear validation errors for the current input field
        setValidationError(validationError.filter((ele) => ele.context.label !== e.target.name));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (validateUser()) {
                setIsLoading(true)
                const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', user);
                console.log(response.data);
                if (response.data.message === 'success') {
                    setApiError(null)
                    setIsLoading(false)

                    //TODO - Navigate To Login
                    navigate('/login')
                }
            }
        } catch (error) {
            setApiError(error.response.data.message)
            setIsLoading(false)
            // console.error('Error response:', error.response ? error.response.data : 'No response');
            // console.error('Error:', error);
        }
    }

    function validateUser() {
        let schema = Joi.object({
            name: Joi.string().min(3).max(10),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            rePassword: Joi.ref('password'),
            phone: Joi.string().regex(/^01[0-2]\d{8}$/).message('Please enter a valid Egypt phone number')
        }).required();

        let validation = schema.validate(user, { abortEarly: false });
        if (validation.error) {
            setValidationError(validation.error.details);
            return false;
        }
        return true;
    }

    useEffect(() => {
        console.log(validationError);
    }, [validationError]);

    useEffect(() => {
        console.log(apiError);
    }, [apiError]);
    return (
        <div className="container">
            <div className="w-75 mx-auto">
                <h2 className="mt-5 mb-4">Registration Form</h2>
                {apiError && <div className='alert alert-danger'>{apiError}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            name="name"
                            onChange={handleChange}
                        />
                        {validationError.filter((ele) => ele.context.label === 'name').length > 0 && (
                            <div className='alert alert-danger'>
                                {validationError.filter((ele) => ele.context.label === 'name')[0]?.message}
                            </div>
                        )}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            className="form-control"
                            name="email"
                            onChange={handleChange}
                        />
                        {validationError.filter((ele) => ele.context.label === 'email').length > 0 && (
                            <div className='alert alert-danger'>
                                {validationError.filter((ele) => ele.context.label === 'email')[0]?.message}
                            </div>
                        )}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            name="password"
                            onChange={handleChange}
                        />
                        {validationError.filter((ele) => ele.context.label === 'password').length > 0 && (
                            <div className='alert alert-danger'>
                                {validationError.filter((ele) => ele.context.label === 'password')[0]?.message}
                            </div>
                        )}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="rePassword">Re-enter Password</label>
                        <input
                            type="password"
                            id="rePassword"
                            className="form-control"
                            name="rePassword"
                            onChange={handleChange}
                        />
                        {validationError.filter((ele) => ele.context.label === 'rePassword').length > 0 && (
                            <div className='alert alert-danger'>
                                {validationError.filter((ele) => ele.context.label === 'rePassword')[0]?.message}
                            </div>
                        )}
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            className="form-control"
                            name="phone"
                            onChange={handleChange}
                        />
                        {validationError.filter((ele) => ele.context.label === 'phone').length > 0 && (
                            <div className='alert alert-danger'>
                                {validationError.filter((ele) => ele.context.label === 'phone')[0]?.message}
                            </div>
                        )}
                    </div>

                    <button type="submit" className="btn btn-info">
                        {isLoading ? <i className='fa fa-spinner fa-spin'></i> : 'Sign Up'} 
                    </button>
                </form>
            </div>
        </div>
    );
}
