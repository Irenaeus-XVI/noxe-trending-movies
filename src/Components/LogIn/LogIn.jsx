import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Joi from 'joi';
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
export default function LogIn({ saveUser }) {
  const initialUserData = {
    email: '',
    password: ''
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
        const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', user);
        console.log(response);
        if (response.data.message === 'success') {
          //NOTE - Save User Data
          localStorage.setItem('token', response.data.token)
          saveUser()
          //TODO - Navigate To Login
          navigate('/')
          setApiError(null)
          setIsLoading(false)
        }
      }
    } catch (error) {
      console.log(error.response);
      setApiError(error.response?.data.message)
      setIsLoading(false)
      // console.error('Error response:', error.response ? error.response.data : 'No response');
      // console.error('Error:', error);
    }
  }

  function validateUser() {
    let schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: false } }),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
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

    <>
      <Helmet>
        <title>Login Page | Noxe App</title>
      </Helmet>
      <div className="container">
        <div className="w-75 mx-auto">
          <h2 className="mt-5 mb-4">Registration Form</h2>
          {apiError && <div className='alert alert-danger'>{apiError}</div>}
          <form onSubmit={handleSubmit}>


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



            <div className="d-flex justify-content-between align-items-center ">
              <button type="submit" className="btn btn-info">
                {isLoading ? <i className='fa fa-spinner fa-spin'></i> : 'Log In'}
              </button>

              <Link to={'/register'} className='nav-link '> If You Don't Have An Account, <span className='text-info fw-bold'>Sign Up</span></Link>
            </div>
          </form>
        </div>
      </div>
    </>


  );
}
