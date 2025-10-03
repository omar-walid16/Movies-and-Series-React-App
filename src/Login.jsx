import  Axios  from 'axios';
import Joi, { allow } from 'joi';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {

  let [error,setError] = useState('');
  let [validateError,setValidateError] = useState([]);
  let [isLoading,setIsLoading] = useState(false)

  let navigate = useNavigate();

  let [user,setUser] = useState({
    email : "" ,
    password : "" ,
  })

  function userData(e) {
    let myUser = {...user} ; //important
    myUser[e.target.name] = e.target.value ;
    setUser(myUser);
  }

  useEffect(()=>{
    if (localStorage.getItem('userToken')) {
      navigate('/home')
    }
  },[])

async function submitRegistration(e) {
  e.preventDefault();
  setIsLoading(true);

  let validate = validateRegistration();
  if (validate.error) {
    setValidateError(validate.error.details);
    setIsLoading(false);
    return;
  }

  else {
    let { data } = await Axios.post("https://movies-app-backend-mu.vercel.app/api/auth/login", user);

    if (data.message === "Login successful") {
      setIsLoading(false);
      localStorage.setItem('userToken',data.token);
      // envoke saveUserData
      props.saveUserData() ;
      navigate("/home");
    } else {
      setError(data.message);
      setIsLoading(false);
    }
  } 
}

  function validateRegistration() {
    let scheme = Joi.object({
      email : Joi.string().email({minDomainSegments : 2 , tlds :{ allow : ['com','net']} }).required() ,
      password : Joi.string().min(3).max(100).required() ,
    })

    return scheme.validate(user,{abortEarly:false})
  }

  return (
    <>
      <div className="container text-white">
        <div className="row justify-content-center align-items-center">
          <h1 className='my-3'>Login Form</h1>

          {error.length > 0? <div className='alert alert-danger' >{error}</div>:'' }
          {validateError.map((error,i) => <div key={i} className='alert alert-danger' >{error.message}</div> ) }

          <form onSubmit={submitRegistration}>
            <label htmlFor="email">email :</label>
            <input onChange={userData} type="email" className="form-control my-2" id="email" name="email"/>

            <label htmlFor="password">Password :</label>
            <input onChange={userData} type="password" className="form-control mt-2 mb-3" id="password" name="password"/>
            
            <button type="submit" className="btn btn-outline-info">
              {isLoading === true ? <i className='fas fa-spinner fa-spin'></i>:'Login'}
            </button>
          </form>

          <p className="my-3">dont have an account ? <a className="text-white-50" href="register">Register Now</a></p>
          
        </div>
      </div>
    </>
  )
}
