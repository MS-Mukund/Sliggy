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

const FoodList = (props) => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const email = localStorage.getItem("Email");

  useEffect(() => {
    axios
      .get("http://localhost:4000/food/vItems/" + email )
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

    navigate("/vendor/add_Item");
  }

  return (
    <div>
      <Grid container>
        <Button variant="contained" onClick={onSubmit} style={{margin: 'auto 1vw'}} startIcon={<AddIcon />}>Add Item</Button>
        <Grid item xs={12} md={9} lg={9}>
          <Paper elevation={9} >
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell><b>S NO.</b></TableCell>
                  <TableCell><b>NAME</b></TableCell>
                  <TableCell><b>VEG/NON-VEG</b></TableCell>
                  <TableCell><b>PRICE</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((food, ind2) => (
                  <TableRow key={ind2}>
                    <TableCell>{ind2}</TableCell>
                    <TableCell><Link to={"/vendor/show"} onClick={() => {
                      localStorage.setItem("Item_ID", food._id);
                      navigate("/vendor/show");
                    }}>{food.name}</Link></TableCell>
                    <TableCell>{ String(food.FoodType) }</TableCell>
                    <TableCell>{food.Price}</TableCell>
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

export default FoodList;
