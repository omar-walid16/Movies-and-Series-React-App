import React from 'react'
import { Link } from 'react-router-dom';
import './navbar.css';

export default function Navbar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
        <div className="container-fluid">
          <Link className="navbar-brand" to="home">Nose</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {props.userData? <>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="movies">Movies</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="tvshow">Tv show</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="people">People</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="about">About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="networks">Networks</Link>
                </li>
              </> : ''}
              
            </ul>
            <ul className='navbar-nav'>
              {props.userData? <>
                <li className="nav-item">
                  <input type="text" placeholder="Search" className="form-control " id="searchInput"/>
                </li>
              </>:''}
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0">
              
              
              {props.userData? <>
                <li className="nav-item">
                <Link onClick={props.logOut} className="nav-link order-lg-last order-first" to="logout">Logout</Link>
                </li>
                <li className="nav-item order-lg-first order-last d-flex align-items-center">
                <i className='fab fa-facebook mx-2'></i>
                <i className='fab fa-spotify mx-2'></i>
                <i className='fab fa-instagram mx-2'></i>
                <i className='fab fa-youtube mx-2'></i>
              </li>
              </>:
              <><li className="nav-item">
                <Link className="nav-link order-lg-last order-first" to="login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link order-lg-last order-first " to="register">Register</Link>
              </li>
              </>}
              
              
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
