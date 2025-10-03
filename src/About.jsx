import React from 'react'
import about from './about.jpg'
import './about.css'

export default function About() {
  return (
    <>
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h1>Omar Walid</h1>
              <p className="lead py-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur magni consequatur sequi. Eos ratione minima doloremque quis fugit, odio exercitationem, natus ad nisi asperiores deleniti, atque dicta voluptates maxime mollitia? Veritatis recusandae eos, minima quo sed excepturi alias voluptatem fuga quia perferendis, ad debitis, consequatur deserunt suscipit deleniti nulla rerum.</p>
            </div>
            <div className="offset-1 col-md-7">
              <img src={about} alt=""  className="w-100 shadow-lg"/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
