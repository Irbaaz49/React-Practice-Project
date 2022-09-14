import "./App.css";
import { useState } from "react";
import { Container } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Show from "./Components/Show";
import Input from "@mui/material/Input";
import Actor from "./Components/Actor";
const ariaLabel = { "aria-label": "description" };



function App() {

  const [actor, setActor] = useState("");
  const [radio, setRadio] = useState();

  const handleToggle = (e) => {
    setRadio(e.target.value);
  };

  return (
    <>
      <span className="Cinema">🎬 TVmaze 🎥</span>
      <div className="App">
        <Container>
          <div>
            <FormControl>
              <Typography xs={{
                color : "white"
              }} variant="h4" component="h4">
                Search your favourite shows
              </Typography>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  value="actors"
                  control={<Radio value="one" onChange={handleToggle} />}
                  label="Actors"
                />
                <FormControlLabel
                  value="show"
                  control={<Radio value="two" onChange={handleToggle} />}
                  label="Shows"
                />
              </RadioGroup>
            </FormControl>

            {
            radio === "one" ? 
            (
              <p style={{ color: "white" }}>
                {" "}
                {actor === "" ? "Enter Actor Name Below" : ""}
              </p>
            ) 
            : 
            (
              <p style={{ color: "white" }}>
                {" "}
                {actor === "" ? "Enter Show Name Below" : ""}
              </p>
            )
            }

            <Input
              placeholder={radio === "one" ? "Akon" : "Friends"}
              inputProps={ariaLabel}
              onChange={(e) => setActor(e.target.value)}
            />

          </div>

          <div className="card-style">
            
            {radio === "one" ? <Show actor={actor} /> : <Actor actor={actor} />}
          
          </div>
        </Container>
      </div>
    </>
  );
}

export default App;
