import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Badge } from "@mui/material";

import React, { useState, useEffect } from "react";

function Actor({ actor }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.tvmaze.com/search/shows?q=${actor}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [actor]);

  console.log(data);

  return (
    <>
      {data.length > 0 ? (
        data.map((item) => {
          return (
            <Card
              sx={{
                maxWidth: 345,
                margin: "25px",
                backgroundColor: "#E0C097",
                border: "1px solid dimgrey",
                boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.81)",
              }}
            >
              <CardActionArea>
                <Badge
                  badgeContent={
                    item.show.rating.average > 0
                      ? item.show.rating.average
                      : 5.2
                  }
                  sx={{
                    left: "15px",
                    top:'10px'
                  }}
                  color={item.show.rating.average ? "primary" : "secondary"}
                >
                  <span style={{fontSize:"20px"}}>👍</span>
                </Badge>

                <CardMedia
                  component="img"
                  height="300"
                  src={
                    item.show.image !== null
                      ? item.show.image.medium
                      : "https://static.vecteezy.com/system/resources/previews/004/296/744/original/movie-camera-with-film-roll-vector.jpg"
                  }
                  sx={{
                    objectFit: "contain",
                  }}
                  alt="img"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.show.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
             {item.show.summary === null ? "" : item.show.summary.replace(/<[^>]+>/g, '').substring(0, 118) + '...' }

                
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })
      ) : actor === '' ? (
       ''
      ):(
        <p className="result" style={{ color: "red" }}>
        No result found!
      </p>
      )}
    </>
  );
}

export default Actor;
