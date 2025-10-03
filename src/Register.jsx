import  Axios  from 'axios';
import Joi, { allow } from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {


  let [error,setError] = useState('');
  let [validateError,setValidateError] = useState([]);
  let [isLoading,setIsLoading] = useState(false)

  let navigate = useNavigate();

  let [user,setUser] = useState({
    firstName : "" ,
    secondName : "" ,
    age : 0 ,
    email : "" ,
    password : "" ,
  })

  function userData(e) {
    let myUser = {...user} ; //important
    myUser[e.target.name] = e.target.value ;
    setUser(myUser);
  }

  async function submitRegistration(e) {
  e.preventDefault();
  setIsLoading(true);

  let validate = validateRegistration();
  if (validate.error) {
    setValidateError(validate.error.details);
    setIsLoading(false);
    return;
  }

  try {
    let { data } = await Axios.post("https://movies-app-backend-mu.vercel.app/api/auth/register", user);

    if (data.message === "success" || data.message === "User registered successfully") {
      setIsLoading(false);
      navigate("/login");
    } else {
      setError(data.message);
      setIsLoading(false);
    }
  } catch (err) {
    // هنا هيمسك 400 Bad Request
    if (err.response && err.response.data && err.response.data.message) {
      setError(err.response.data.message);
    } else {
      setError("Something went wrong, try again later.");
    }
    setIsLoading(false);
  }
}

  function validateRegistration() {
    let scheme = Joi.object({
      firstName : Joi.string().alphanum().min(3).max(10).required(),
      secondName : Joi.string().alphanum().min(3).max(10).required() ,
      age : Joi.number().min(16).max(80).required() ,
      email : Joi.string().email({minDomainSegments : 2 , tlds :{ allow : ['com','net']} }).required() ,
      password : Joi.string().min(3).max(100).required() ,
    })

    return scheme.validate(user,{abortEarly:false})
  }

  return (
    <>
      <div className="container text-white">
        <div className="row justify-content-center align-items-center">
          <h1 className='my-3'>Registration Form</h1>

          {error.length > 0? <div className='alert alert-danger' >{error}</div>:'' }
          {validateError.map((error,i) => <div key={i} className='alert alert-danger' >{error.message}</div> ) }

          <form onSubmit={submitRegistration}>
            <label htmlFor="firstName">FirstName :</label>
            <input onChange={userData} type="text" className="form-control my-2" id="firstName" name="firstName"/>

            <label htmlFor="secondName">SecondName :</label>
            <input onChange={userData} type="text" className="form-control my-2" id="secondName" name="secondName"/>

            <label htmlFor="age">Age :</label>
            <input onChange={userData} type="number" className="form-control my-2" id="age" name="age"/>

            <label htmlFor="email">email :</label>
            <input onChange={userData} type="email" className="form-control my-2" id="email" name="email"/>

            <label htmlFor="password">Password :</label>
            <input onChange={userData} type="password" className="form-control mt-2 mb-3" id="password" name="password"/>
            
            <button type="submit" className="btn btn-outline-info">
              {isLoading === true ? <i className='fas fa-spinner fa-spin'></i>:'Register'}
            </button>
          </form>

          <p className="my-3">already have an account ? <a className="text-white-50" href="login">Login Now</a></p>
          
        </div>
      </div>
    </>
  )
}
