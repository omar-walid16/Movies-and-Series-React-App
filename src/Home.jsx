import axios from 'axios';
import React, { useEffect, useState } from 'react'
import avatar from './avatar.png'
import './home.css'
import { Link } from 'react-router-dom';

export default function Home() {

  const [trendingMovies,setTrendingMovies] = useState([]);
  const [trendingTv,setTrendingTv] = useState([]);
  const [trendingPeople,setTrendingPeople] = useState([]);

  async function getTrending(mediaType , callback) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=98e44d93a8eca455cbe05ed1049aa226`);
    callback(data.results.slice(0,10))
  }
  
  useEffect(()=>{
    getTrending('movie', setTrendingMovies);
    getTrending('tv', setTrendingTv);
    getTrending('person', setTrendingPeople);
  },[])

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="brdr w-25 text-muted my-5"></div>
          <h2>Trending<br/>Movies<br/>To Watch Now</h2>
          <div className="brdr text-muted mt-5"></div>
        </div>
        {trendingMovies.map((movie , i)=> <div key={i} className="col-md-2">
          <div className="movie">
            <Link to={`/moviedetails/${movie.id}`}>
              <img className="w-100" src={'https://image.tmdb.org/t/p/w500'+movie.poster_path} alt="" />
              <h3 className="h6 py-2">{movie.title}</h3>
            </Link>
          </div>
        </div> )}
      </div>

      <div className="row py-5">
        <div className="col-md-4 ">
          <div className="brdr w-25 text-muted my-5"></div>
          <h2>Trending<br/>Tv Show<br/>To Watch Now</h2>
          <div className="brdr text-muted mt-5"></div>
        </div>
        {trendingTv.map((tv , i)=> <div key={i} className="col-md-2">
          <div className="tv">
            <Link to={`/tvshowdetails/${tv.id}`}>
              <img className="w-100" src={'https://image.tmdb.org/t/p/w500'+tv.poster_path} alt="" />
            <h3 className="h6 py-2">{tv.name}</h3>
            </Link>
            
          </div>
        </div> )}
      </div>

      <div className="row">
        <div className="col-md-4">
          <div className="brdr w-25 text-muted my-5"></div>
          <h2>Trending<br/>People<br/>To Watch Now</h2>
          <div className="brdr text-muted mt-5"></div>
        </div>
        {trendingPeople.map((person , i)=> <div key={i} className="col-md-2">
          <div className="person">
            <Link to={`/persondetails/${person.id}`}>
              {person.profile_path === null ? <img className="w-100" src={avatar} alt=""/>:<img className="w-100" src={'https://image.tmdb.org/t/p/w500'+person.profile_path} alt="" />}
              <h3 className="h6 py-2">{person.name}</h3>
            </Link>
            
          </div>
        </div> )}
      </div>
    </>
  )
}
