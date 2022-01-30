import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

import { Avatar } from "@material-ui/core";
import { MenuItem, Typography, FormControl, Select, InputLabel } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const AllTags = [ 
  'Drinks', 'Solid', 'Hot', 'Cold', 'Sweet', 'Spicy', 'Salty'
];

const Food_Prof = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [foodtype, setFoodType] = useState("");
  const [tags, setTags] = useState([]);
  const [id, setID] = useState("");

  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:4000/food/show/" + localStorage.getItem("Item_ID") )
      .then((response) => {
            
            console.log(response.data);
            console.log(response.data[0]);

            setID(response.data[0]._id);
            setName(response.data[0].name);
            setPrice(response.data[0].Price);
            setFoodType(response.data[0].FoodType[0]);
            setTags(response.data[0].tags);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const resetInputs = () => {
    setName("");
    setPrice(0);
    setFoodType('');
    setTags([]);
  };

  const onChangeTags = (event) => {
    const {
      target: { value },
    } = event;
    setTags(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: 'color-radio-button-demo',
    inputProps: { 'aria-label': item },
  });

  const onChangeUsername = (event) => {
    setName(event.target.value);
  };

  const onChangePrice = (event) => {
    if( event.target.value > 0 ) {
      setPrice(event.target.value);
    }
    else {
      alert("Enter a positive integer");
      resetInputs();
    }
  };

  const onChangeFoodType = (event) => {
      setFoodType(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    console.log(foodtype);
    
    const newFood = {
      name: name,
      VendorEmail: localStorage.getItem('Email'),
      Price: price,
      rating: 0,
      FoodType: foodtype,
      tags: tags,
    };

    console.log(newFood);
  
    axios
      .put( ("http://localhost:4000/food/edit/" + id) , newFood)
      .then((response) => {
        console.log(response.data);

        // goto login page
        navigate("/vendor/Items");
      })
      .catch ((err) => {
        alert(err);
      });

    resetInputs();
  };

  const onDelete = (event) => {
    event.preventDefault();

    axios
    .delete( ("http://localhost:4000/food/delete/" + id) )
    .then((response) => {
      console.log(response.data);

      // goto login page
      navigate("/vendor/Items");
    })
    .catch ((err) => {
      alert(err);
    });

  resetInputs();

  };

  
  const paper_s = { padding: "5vh 1vw", width: "35%", margin: "5vh auto" };
  const textStyle = { margin: "1vh 0" };

  // profile page
  return (
    <Grid align={"center"}>
      <Paper elevation={20} style={paper_s}>
        <Grid align={"center"}>
          {/* <Avatar color="success" style={{backgroundColor: '#1bbd7e'}}>
            <EditOffIcon onClick={onSubmit} />
          </Avatar> */}
          <Avatar color="error" style={{backgroundColor: '#EE4B2B'}}>
            <DeleteIcon onClick={onDelete} />
          </Avatar>
          <h1>More Info</h1>
        </Grid>
        <form style={{'margin': '10px', padding: '10px'}} onSubmit={onSubmit}>
          <TextField style={textStyle} disabled value={name} onChange={onChangeUsername} fullWidth label='Name' placeholder="Item Name" />
          <TextField style={textStyle} value={price} onChange={onChangePrice} fullWidth label='Price' type="number" placeholder="Enter Price" />

          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label1">FoodType</FormLabel>
            <RadioGroup
              row
              value={foodtype}
              onChange={onChangeFoodType}
              aria-labelledby="demo-row-radio-buttons-group-label1"
              name="row-radio-buttons-group1"
            >
              <FormControlLabel value={'veg'} control={<Radio {...controlProps('veg')} color="success" />} label="veg"  />
              <FormControlLabel value={'non-veg'} control={<Radio {...controlProps('non-veg')} color="error"/>} label="non-veg" />
            </RadioGroup>
          </FormControl>

            <FormControl sx={{ m: 1, width: '100%' }}>
            <InputLabel id="demo-multiple-checkbox-label1">Tag</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label1"
              id="demo-multiple-checkbox1"
              multiple
              value={tags}
              onChange={onChangeTags}
              input={<OutlinedInput label="Tag" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}
            >
              {AllTags.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  <Checkbox checked={tags.indexOf(tag) > -1} />
                  <ListItemText primary={tag} />
                </MenuItem>
              ))}
            </Select>
              
          </FormControl>
          

          <Button style={{margin: '15px'}} type="submit" variant="contained" color="success">Update</Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Food_Prof;
