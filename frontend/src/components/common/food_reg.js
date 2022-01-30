import { useState } from "react";
import axios from "axios";
import { Grid, Paper, Avatar } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Typography } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate  } from "react-router-dom";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

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

const Food_reg = (props) => {

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [foodtype, setFoodType] = useState("");
  const [tags, setTags] = useState([]);

  const [selectedValue, setSelectedValue] = useState('a');

  const resetInputs = () => {
    setName("");
    setPrice(0);
    setFoodType("veg");
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

  const navigate = useNavigate();

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
    if( event.target.value === "c" )
    {
      setFoodType("veg");
    }
    else
    {
      setFoodType("non-veg");
    }
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
      .post("http://localhost:4000/food/newFood", newFood)
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

  const paper_s = { padding: "5vh 1vw", width: "30%", margin: "5vh auto" };
  const textStyle = { margin: "1vh 0" };

  return (
    <Grid align={"center"}>
      <Paper elevation={20} style={paper_s}>
        <Grid align={"center"}>
          <Avatar color="success" style={{backgroundColor: '#FF5733'}}>
            <FastfoodIcon />
          </Avatar>
          <h1>Add Item</h1>
        </Grid>
        <form style={{'margin': '10px', padding: '10px'}} onSubmit={onSubmit}>
          <TextField style={textStyle} onChange={onChangeUsername}  fullWidth label='Name' placeholder="Item Name" />
          <TextField style={textStyle} onChange={onChangePrice}     fullWidth label='Price' type="number" placeholder="Enter Price" />

          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label1">FoodType</FormLabel>
            <RadioGroup
              row
              value={foodtype}
              onChange={onChangeFoodType}
              aria-labelledby="demo-row-radio-buttons-group-label1"
              name="row-radio-buttons-group1"
            >
              <FormControlLabel value={'veg'} control={<Radio {...controlProps('c')} color="success" />} label="veg"  />
              <FormControlLabel value={'non-veg'} control={<Radio {...controlProps('d')} color="error"/>} label="non-veg" />
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
          

          <Button style={{margin: '15px'}} type="submit" variant="contained" color="success">Add it</Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Food_reg;
