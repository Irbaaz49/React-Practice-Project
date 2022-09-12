import './App.css';
import { useState } from 'react';
import {Container} from '@mui/material'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Show from './Components/Show';
import Input from '@mui/material/Input';
import Actor from './Components/Actor';

const ariaLabel = { 'aria-label': 'description' };



function App() {
const[actor, setActor] = useState("");
const [radio, setRadio] = useState();

const handleToggle = (e) => {
  setRadio(e.target.value);
};

  return (
    <>
<span className='Cinema'>🎬 Cinema Hub 🎥</span>
<div className ="App">
  <Container>
<div>

<FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Search your favourite shows</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="actors" control={<Radio  value="one"
        onChange={handleToggle} />} label="Actors" />
        <FormControlLabel value="show" control={<Radio  value="two"
        onChange={handleToggle}/>} label="Shows" />
       
      </RadioGroup>
    </FormControl>
    {
radio == 'one' ?
<p style={{ color: "white" }}> {actor === '' ? 'Enter Show Name by Actor Below' : ''}</p>
:
<p style={{ color: "white" }}> {actor === '' ? 'Enter Show Name Below' : ''}</p>

    }

    
       {/* <input className="input"  placeholder="eg: Akon.." /> */}
       <Input placeholder="Akon" inputProps={ariaLabel} onChange={(e)=>setActor(e.target.value)} />
</div>

<div className='card-style'>

    
 {/* <Show actor={actor}/> */}

    <Actor/>
    
</div>

  </Container>
</div>
</>    
  );
}

export default App;




