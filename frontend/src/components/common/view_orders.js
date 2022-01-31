import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import SearchIcon from "@mui/icons-material/Search";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";


const AllStatus = [ 
    "Placed",
    "Accepted",
    "Cooking",
    "Ready for Pickup",
    "Completed",
    "Rejected"
];
const My_orders = (props) => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const email = localStorage.getItem("Email");

  useEffect(() => {

   
    axios
      .get("http://localhost:4000/order/vget/" + localStorage.getItem("Email") )
      .then((response) => {
          if( response.data.length > 0 ){
            setItems(response.data);
            console.log(response.data);
        }
        else
        {
            console.log(response.data);
            setItems([]);
        }

      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const onSubmit = (event) => {
    event.preventDefault();

    navigate("/vendor");
  }

  return (
    <div>
      <Grid container>
        <Grid item xs={12} md={9} lg={9}>
          <Paper elevation={9} >
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell><b>S NO.</b></TableCell>
                  <TableCell><b>ITEM</b></TableCell>
                  <TableCell><b>COST</b></TableCell>
                  <TableCell><b>QUANTITY</b></TableCell>
                  <TableCell><b>PLACED TIME</b></TableCell>
                  <TableCell><b>STATUS</b></TableCell>
                  <TableCell><b>ACTION</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((food, ind2) => (
                  <TableRow key={ind2}>
                    <TableCell>{ind2}</TableCell>
                    <TableCell>{ String(food.Fname) }</TableCell>
                    <TableCell>{food.Cost}</TableCell>
                    <TableCell>{food.Quantity}</TableCell>
                    <TableCell>{Math.floor(Number(food.PlacedTime)/60)}:{Number(food.PlacedTime) % 60 }</TableCell>
                    <TableCell>{AllStatus[ parseInt(food.Status) ]}</TableCell>
                    <TableCell><Button style={{margin: '15px'}} type="submit" variant="contained" color="secondary" onClick={() => {
                            const Order = {
                              Fid: food.Fid,
                              Bid: food.Bid,
                              VendorEmail: food.VendorEmail,
                              PlacedTime: food.PlacedTime,
                              Fname: food.Fname,
                              Cost: food.Cost,
                              Quantity: food.Quantity,
                              Rating: food.Rating,
                              Status: food.Status == 4 ? food.Status : food.Status + 1,
                              _id: food._id,
                            };

                            axios
                              .put("http://localhost:4000/order/changestat", Order)
                              .then((response) => {
                                console.log(response);
                                alert("Order Status Changed");
                            });
                        }}> Move to Next Stage</Button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default My_orders;
