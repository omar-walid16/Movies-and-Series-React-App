import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function People() {

  const [trendingPerson,setTrendingPerson] = useState([]);

  async function getTrending() {
    let { data } = await axios.get('https://api.themoviedb.org/3/trending/person/week?api_key=98e44d93a8eca455cbe05ed1049aa226');
    setTrendingPerson(data.results)
  }
  
  useEffect(()=>{
    getTrending();
  },[])
  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="brdr w-25 text-muted my-5"></div>
          <h2>Trending<br/>People<br/>To Watch Now</h2>
          <div className="brdr text-muted mt-5"></div>
        </div>
        {trendingPerson.map((person , i)=> <div key={i} className="col-md-2">
          <div className="person">
            <Link to={`/persondetails/${person.id}`}>
              <img className="w-100" src={'https://image.tmdb.org/t/p/w500'+person.profile_path} alt="" />
              <h3 className="h6 py-2">{person.name}</h3>
            </Link>
          </div>
        </div> )}
      </div>
    </>
  )
}
