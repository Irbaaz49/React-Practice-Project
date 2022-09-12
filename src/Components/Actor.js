// import axios from "axios";
import axios from 'axios'
import React, { useState, useEffect } from "react";

function Actor({actor}) {
 
const [data , setData] = useState([]);

useEffect(()=>{
axios.get(`https://api.tvmaze.com/search/shows?q=${actor}`)
.then((res)=>setData(res.data))
.catch((err)=> console.log(err));

},[actor]);





  return (
    <>
     
 
  {data.length > 0 ? (
            data.map((item) => {
              return (
                <div className="show">
                  <h3 key={item.show.id}>
                    <img className="image"
                      src={item.show.image !== null ? item.show.image.medium : ""}
                      alt="Image not Available"
                    />
                    <div className="details">
                      <h3 className="show-name">{item.show.name}</h3>
                      <h3 className="rating">
                        {item.show.rating.average !== null ? item.show.rating.average : "0.0"}</h3>
    
                    </div>
                    <p className="summary">{item.show.summary}</p>
                  </h3>
                </div>
              );
            })
          ) : (actor === '' ?
            <p className="result" style={{ color: "red" }}>No result found!</p> : ''
          )}
 
  
    </>
  );
}

export default Actor;