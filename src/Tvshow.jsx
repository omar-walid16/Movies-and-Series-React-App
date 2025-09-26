import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './movies.css';
import { Link } from 'react-router-dom';


export default function Tvshow() {

  const [trendingTv,setTrendingTv] = useState([]);

  let nums = new Array(20).fill(1).map((elem,index)=> index+1);

  async function getTrending(pageNumber) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=98e44d93a8eca455cbe05ed1049aa226&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNumber}`);
    setTrendingTv(data.results)
  }
  
  useEffect(()=>{
    getTrending(1);
  },[])
  return (
    <>
      <div className="row justify-content-center">
        {trendingTv.map((tv , i)=> <div key={i} className="col-md-2">
          <div className="tv">
              <Link to={`/tvshowdetails/${tv.id}`}>
                <img className="w-100" src={'https://image.tmdb.org/t/p/w500'+tv.poster_path} alt="" />
                <h3 className="h6 py-2">{tv.name}</h3>
              </Link>
          </div>
        </div> )}

        <nav aria-label="...">
          <ul className="pagination pagination-sm d-flex justify-content-center pt-4 pb-2"> 
            {nums.map((pageNum) => <li className="page-item "><a onClick={()=> getTrending(pageNum)} className="page-link bg-transparent text-white">{pageNum}</a></li> )}
          </ul>
        </nav>
      </div>
    </>
  )
}
