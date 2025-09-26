import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function TvShowDetails() {

    let params = useParams();

    const [tvShowDetails,setTvShowDetails] = useState(null);

    async function getTVDetails(id) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=98e44d93a8eca455cbe05ed1049aa226&language=en-US`)
        setTvShowDetails(data)
    }

    useEffect(()=>{
        getTVDetails(params.id)
    },[])

  return (
    <>
      {tvShowDetails? <div className="row">
        <div className="col-md-3">
            <img className="w-100" src={'https://image.tmdb.org/t/p/w500'+tvShowDetails.poster_path} alt="" />
        </div>
        <div className="rate position-absolute d-flex align-items-center justify-content-center">{tvShowDetails.vote_average}</div>
        <div className="col-md-9">
            <h3>{tvShowDetails.name}</h3>
            <p className="text-white-50 py-3">{tvShowDetails.overview}</p>
            <h3 className="h6"> Rate : <i class="fa-solid fa-star text-warning"></i>  {tvShowDetails.vote_average}</h3>
            <h3 className="h6">Vote Count : {tvShowDetails.vote_count}</h3>
            <h3 className="h6">Popularity : {tvShowDetails.popularity}</h3>
        </div>
      </div>:
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <i className="fas fa-spinner fa-spin fa-3x"></i>
      </div>
      
      }
      
    </>
  )
}
