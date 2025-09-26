import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './moviedetails.css'

export default function MovieDetails() {

    let params = useParams();

    const [movieDetails,setMovieDetails] = useState(null);

    async function getMovieDetails(id) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=98e44d93a8eca455cbe05ed1049aa226&language=en-US`)
        setMovieDetails(data)
    }

    useEffect(()=>{
        getMovieDetails(params.id)
    },[])

  return (
    <>

      {movieDetails? <div className="row">
        <div className="col-md-3 position-relative">
            <img className="w-100" src={'https://image.tmdb.org/t/p/w500'+movieDetails.poster_path} alt="" />
        </div>
          <div className="rate position-absolute d-flex align-items-center justify-content-center">{movieDetails.vote_average}</div>
        <div className="col-md-9">
            <h3>{movieDetails.title}</h3>
            <p className="text-white-50 py-3">{movieDetails.overview}</p>
            <h3 className="h6"> Rate : <i class="fa-solid fa-star text-warning"></i>  {movieDetails.vote_average}</h3>
            <h3 className="h6">Vote Count : {movieDetails.vote_count}</h3>
            <h3 className="h6">Budget : {movieDetails.budget}</h3>
            <h3 className="h6">Popularity : {movieDetails.popularity}</h3>
        </div>
      </div>:
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <i className="fas fa-spinner fa-spin fa-3x"></i>
      </div>
      }
      
    </>
  )
}
