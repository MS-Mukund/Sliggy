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
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

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

var today;
var time2;
var t3;
const Food_Prof = (props) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [foodtype, setFoodType] = useState("");
  const [tags, setTags] = useState([]);
  const [id, setID] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [Bid, setBid] = useState("");
  const [VendorEmail, setVendorEmail] = useState("");
  const [VendorName, setVendorName] = useState("");
  const [balance, setBalance] = useState(0);

  const [selectedValue, setSelectedValue] = useState('');

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

  useEffect(() => {
    axios
      .get("http://localhost:4000/food/show/" + localStorage.getItem("Item_ID") )
      .then((response) => {
            
            console.log(response.data[0]);
            localStorage.setItem("Vmail", response.data[0].VendorEmail);
            setVendorEmail(response.data[0].VendorEmail);
            setID(response.data[0]._id);
            setName(response.data[0].name);
            setPrice(response.data[0].Price);
            setFoodType(response.data[0].FoodType);
            setTags(response.data[0].tags);

            console.log(response.data[0].tags);
      })
      .catch((error) => {
        console.log(error);
      });

      // get buyer info
      axios
      .get("http://localhost:4000/buyer/bprofile/" + localStorage.getItem("Email") ) 
      .then((response) => {
          console.log(response.data);
          setBid(response.data._id);
          setBalance(response.data.Wallet);
      })
      .catch((error) => {
        console.log(error);
      });

      // get vendor info
      axios
      .get("http://localhost:4000/vendor/vprofile/" + localStorage.getItem("Vmail") )
      .then((response) => {
          console.log(response.data);
          setVendorName(response.data.VendorName);
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
    setQuantity(0);

    setSelectedValue('');
    setVendorName("");
    setBid('');
    setVendorEmail("");
    setBalance(0);
    setID("");
  };

  const onChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    today = new Date();
    time2 = Number(today.getHours())*60 + Number(today.getMinutes()); 

    CreateOrder();
  };

  const CreateOrder = () => {

    if ( Number(price)*Number(quantity) > Number(balance) ) {
      console.log( "Balance: " + Number(balance) );
      console.log( "Price: " + Number(price) );
      console.log( "Quantity: " + Number(quantity) );
      alert("Insufficient Balance");
      navigate("/buyer");
    }

    const newOrder = {
        Fname: name,
        Cost: price,
        Rating: 0,
        Status: 'Placed',
        Fid: id,
        Bid: Bid,
        VendorEmail: VendorEmail,
        VendorName: VendorName,
        Quantity: quantity,
        PlacedTime: time2,        
    };

    console.log(newOrder);

    // update buyer wallet
    axios
    .put("http://localhost:4000/buyer/updatewallet/" + Bid, { Wallet: balance - price*quantity } )
    .then((response) => {
        console.log(response.data);
    });
  
    axios
      .post( ("http://localhost:4000/order/create" ) , newOrder)
      .then((response) => {
        console.log(response.data);
        alert("Order Placed");
        // goto login page
        navigate("/buyer");
      })
      .catch ((err) => {
        // update buyer wallet
        // axios
        // .put("http://localhost:4000/buyer/updatewallet/" + Bid, { Wallet: balance + price*quantity } )
        // .then((response) => {
        //     console.log(response.data);
        // });
        alert(err);
      });

    resetInputs();
  };

  const AddToFav = (event) => {
    event.preventDefault();

    axios
      .post( ("http://localhost:4000/buyer/fav/create" ) , {Fid: id, Bid: Bid} )
      .then((response) => {
        console.log(response.data);
        alert("Added to Favourites");
      })
      .catch((err) => {
        alert(err);
      });
  };

  
  const paper_s = { padding: "5vh 1vw", width: "35%", margin: "5vh auto" };
  const textStyle = { margin: "1vh 0" };

  // profile page
  return (
    <Grid align={"center"}>
      <Paper elevation={20} style={paper_s}>
        <Grid align={"center"}>
          <Avatar color="error" style={{backgroundColor: '#DE3163'}}>
            <FavoriteBorderIcon onClick={AddToFav} />
          </Avatar>
          <h1>Place Order</h1>
        </Grid>
        <form style={{'margin': '10px', padding: '10px'}} onSubmit={onSubmit}>
          <TextField style={textStyle} disabled value={name} fullWidth label='Name' placeholder="Item Name" />
          <TextField style={textStyle} disabled value={price} fullWidth label='Price' type="number" placeholder="Enter Price" />

          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label1">FoodType</FormLabel>
            <RadioGroup
              row
              value={foodtype}
              disabled
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
              disabled
              value={tags}
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
          <TextField style={textStyle} value={quantity} onChange={onChangeQuantity} fullWidth label="quantity" type="number" placeholder="Enter quantity" />

          <Button style={{margin: '15px'}} type="submit" onSubmit={onSubmit} variant="contained" color="inherit">Order</Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Food_Prof;
