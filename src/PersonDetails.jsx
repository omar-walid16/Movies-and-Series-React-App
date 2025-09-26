import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function PersonDetails() {

    let params = useParams();

    const [personDetails,setPersonDetails] = useState(null);

    async function getPersonDetails(id) {
        let { data } = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=98e44d93a8eca455cbe05ed1049aa226&language=en-US`)
        setPersonDetails(data)
    }

    useEffect(()=>{
        getPersonDetails(params.id)
    },[])

  return (
    <>
      {personDetails? <div className="row">
        <div className="col-md-3">
            <img className="w-100" src={'https://image.tmdb.org/t/p/w500'+personDetails.profile_path} alt="" />
        </div>
        <div className="col-md-9">
            <h3>{personDetails.name}</h3>
            <h3 className="h6">Date Of Birth : {personDetails.birthday}</h3>
            <p className="text-white-50 py-3">{personDetails.biography}</p>
        </div>
      </div>:
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <i className="fas fa-spinner fa-spin fa-3x"></i>
      </div>
      
      }
      
    </>
  )
}
