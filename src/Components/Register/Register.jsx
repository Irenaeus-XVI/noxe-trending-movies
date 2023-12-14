import React from 'react'

export default function Register() {
    return (
        <>

            <div className="container">
                <div className='w-75 mx-auto'>
                    <h2 className='mt-5 mb-4'>Registration Form</h2>
                    <form action="" >
                        <div className='form-group mb-3'>
                            <label htmlFor="first_name">First Name</label>
                            <input type="text" id='first_name' className='form-control' name='first_name' />
                        </div>





                        <div className='form-group mb-3'>
                            <label htmlFor="last_name">Last Name</label>
                            <input type="text" id='last_name' className='form-control' name='last_name' />
                        </div>




                        <div className='form-group mb-3'>
                            <label htmlFor="email">Email</label>
                            <input type="text" id='email' className='form-control' name='email' />
                        </div>

                        <div className='form-group mb-3'>
                            <label htmlFor="age">Age</label>
                            <input type="number" id='age' className='form-control' name='age' />
                        </div>



                        <div className='form-group mb-3'>
                            <label htmlFor="password">Password</label>
                            <input type="password" id='first_name' className='form-control' name='password' />
                        </div>

                        <button className='btn btn-info'> Sign Up</button>
                    </form>
                </div>
            </div>
        </>
    )
}
