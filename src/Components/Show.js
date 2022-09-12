import '../App.css';
import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Input from '@mui/material/Input';

const ariaLabel = { 'aria-label': 'description' };


function Show({actor}) {

const[iData,setIData] = useState([]);
const[finalres, setFinalres] = useState([]);

useEffect(() => {

async function FectActorID(){
  const response = await fetch(`https://api.tvmaze.com/search/people?q=${actor}`);
  const res_data = await response.json();
  setIData(res_data); 
}
FectActorID();



}, [actor])

const filterID = () =>{
  let res = iData.filter(
    (item)=> item.person.name.toLowerCase() === actor.toLowerCase());

    return res && res.length > 0 && res[0].person.id !== undefined
    ? res[0].person.id
    : 1;
};

useEffect(()=>{
  async function fetchFinalData(){
    let result = filterID() >=1 ? filterID() : "No result found";
    console.log(result);
    console.log(filterID());
    
    const response = await fetch(`https://api.tvmaze.com/people/${result}/castcredits?embed=show`);
    const final_data = await response.json();

    console.log(final_data);
    if(actor.length > 0) setFinalres(final_data);

  }
  fetchFinalData();
},[iData])


  return (
    <>









       {finalres.length > 0 ? (
        finalres.map((item) => {
          return (
          
        
          
          
          <Card sx={{ maxWidth: 345,
            margin:'25px'
            
            }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="300"
                      image={item._embedded.show.image.medium !== null
                        ? item._embedded.show.image.medium
                        : ""}
                      alt="img"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item._embedded.show.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item._embedded.show.summary.replace(/<[^>]+>/g, '').substring(0, 118) + '...'}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          );
        })
      ) : (
        <p className="result" style={{ color: "red" }}>No result found!</p>
      )}


    </>
  )
}

export default Show

{/* <TextField id="filled-basic" label="Filled" variant="filled" /> */}
{/* <TextField id="standard-basic" label="Standard" variant="standard" /> */}