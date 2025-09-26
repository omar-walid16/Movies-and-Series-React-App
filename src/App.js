import React, { useEffect, useState } from 'react';
import './App.css';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import Movies from './Movies';
import Tvshow from './Tvshow';
import People from './People';
import About from './About';
import Login from './Login';
import Logout from './Logout';
import Register from './Register';
import Notfound from './Notfound';
import { jwtDecode } from 'jwt-decode';
import MovieDetails from './MovieDetails';
import TvShowDetails from './TvShowDetails';
import PersonDetails from './PersonDetails';

export default function App() { 

  let navigate = useNavigate()
  const [userData,setUserData] = useState(null)

  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken)
  }

  function logOut() {
    setUserData(null);
    localStorage.removeItem('userToken');
    navigate('/login')
  }

  function ProtectedRoute({ children }) {
    if (localStorage.getItem('userToken')===null) {
      return <Navigate to="/login" />
    }
    else {
      return children
    }
  }

  useEffect(()=>{
    if (localStorage.getItem('userToken')) {
      saveUserData()
    }
  },[])


  return (
      <>
      <Navbar logOut={logOut} userData={userData} />
      <div className="container my-3">
        <Routes>
        <Route path='' element={ <ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='movies' element={<ProtectedRoute><Movies/></ProtectedRoute>}>
          <Route path=':id' element={<ProtectedRoute><MovieDetails/></ProtectedRoute>}/>
        </Route>
        <Route path='moviedetails' element={<ProtectedRoute><MovieDetails/></ProtectedRoute>}>
          <Route path=':id' element={<ProtectedRoute><MovieDetails/></ProtectedRoute>}/>
        </Route>
        <Route path='persondetails' element={<ProtectedRoute><PersonDetails/></ProtectedRoute>}>
          <Route path=':id' element={<ProtectedRoute><PersonDetails/></ProtectedRoute>}/>
        </Route>
        <Route path='tvshowdetails' element={<ProtectedRoute><TvShowDetails/></ProtectedRoute>}>
          <Route path=':id' element={<ProtectedRoute><TvShowDetails/></ProtectedRoute>}/>
        </Route>
        <Route path='tvshow' element={<ProtectedRoute><Tvshow/></ProtectedRoute>}>
          <Route path=':id' element={<ProtectedRoute><TvShowDetails/></ProtectedRoute>}/>
        </Route>

        <Route path='people' element={<ProtectedRoute><People/></ProtectedRoute>}>
          <Route path=':id' element={<ProtectedRoute><PersonDetails/></ProtectedRoute>}/>
        </Route>
        <Route path='about' element={<ProtectedRoute><About/></ProtectedRoute>}/>

        <Route path='login' element={<Login saveUserData={saveUserData} />}/>
        <Route path='logout' element={<Logout/>}/>
        <Route path='register' element={<Register/>}/>

        <Route path='*' element={<Notfound/>}/>
      </Routes>
      </div>
      <Footer/>
      </>
    )
}

