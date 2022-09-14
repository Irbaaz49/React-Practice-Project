import "../App.css";
import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Badge } from "@mui/material";

function Show({ actor }) {
  const [iData, setIData] = useState([]);
  const [finalres, setFinalres] = useState([]);

  //Fetchinf id of the actor
  useEffect(() => {
    async function FectActorID() {
      const response = await fetch(
        `https://api.tvmaze.com/search/people?q=${actor}`
      );
      const res_data = await response.json();
      setIData(res_data);
    }
    FectActorID();
  }, [actor]);

  //filtering the id with input val
  const filterID = () => {
    let res = iData.filter(
      (item) => item.person.name.toLowerCase() === actor.toLowerCase()
    );

    return res && res.length > 0 && res[0].person.id !== undefined
      ? res[0].person.id
      : 1;
  };

  //fetching results according to id
  useEffect(() => {
    async function fetchFinalData() {
      let result = filterID() >= 1 ? filterID() : "No result found";

      const response = await fetch(
        `https://api.tvmaze.com/people/${result}/castcredits?embed=show`
      );
      const final_data = await response.json();

      if (actor.length > 0) setFinalres(final_data);
    }
    fetchFinalData();
  }, [iData]);

  return (
    <>
      {finalres.length > 0 ? (
        finalres.map((item) => {
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
                    item._embedded.show.rating.average > 0
                      ? item._embedded.show.average
                      : 5.2
                  }
                  sx={{
                    left: "15px",
                    top: "10px",
                  }}
                  color={
                    item._embedded.show.rating.average ? "primary" : "secondary"
                  }
                >
                  <span style={{ fontSize: "20px" }}>👍</span>
                </Badge>

                <CardMedia
                  component="img"
                  height="300"
                  image={
                    item._embedded.show.image.medium !== null
                      ? item._embedded.show.image.medium
                      : ""
                  }
                  sx={{
                    objectFit: "contain",
                  }}
                  alt="img"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item._embedded.show.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item._embedded.show.summary
                      .replace(/<[^>]+>/g, "")
                      .substring(0, 118) + "..."}
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

export default Show;
