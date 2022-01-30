import { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, Grid, Paper, TextField, FormControl, Button } from "@material-ui/core";
import PaidIcon from '@mui/icons-material/Paid';
import { useNavigate } from "react-router-dom";

const HomeB = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [wallet, setWallet] = useState(0);
  const [wallet2, setWallet2] = useState(0);
  const [password, setPassword] = useState("");
  const [ContactNo, setContactNo] = useState(0);
  const [age, setAge] = useState(0);
  const [BatchName, setBatchName] = useState("");

  const navigate = useNavigate();

  const onChangePassword = (event) => {
  };
  
  useEffect(() => {
    setEmail(localStorage.getItem("Email"));

    axios
    .get("http://localhost:4000/buyer/bprofile/" + localStorage.getItem("Email") )
    .then((response) => {
          console.log(response.data);
          setName(response.data.name);
          setEmail(response.data.email);

          setWallet2( 0 );
          setWallet( Number(response.data.Wallet));
          setPassword(response.data.password);
          setAge( Number(response.data.Age) );
          setBatchName(response.data.BatchName);
          setContactNo( Number(response.data.ContactNo) );
    });
  }, []);

  const paper_s = { padding: "5vh 1vw", width: "30%", margin: "5vh auto" };
  const textStyle = { margin: "1vh 0" };

  const onChangeWallet2 = (event) => {
    var tmp = Number(event.target.value);
    console.log("tmp: " + tmp);
    if( tmp < 0 )
    {
      alert("Invalid amount, can only be a positive integer");
    }
    setWallet2( Number(tmp) );
  };

  const onSubmit = (event) => {
    event.preventDefault();

    setWallet( wallet + wallet2 );
    const newUser = {
      name: name,
      email: email,
      ContactNo: ContactNo,
      password: password,
      age: age,
      BatchName: BatchName, 
      Wallet: wallet
    };

    console.log(newUser);
  
    axios
      .put("http://localhost:4000/buyer/editbpr", newUser)
      .then((response) => {
        console.log(response.data);

        // goto login page
        alert("successfully added");
        navigate("/buyer");
      })
      .catch ((err) => {
        alert(err);
      });
  };


  return ( 
    <Grid align={"center"}>
        <div style={{ textAlign: "center" }}>Welcome - {name}</div>
      <Paper elevation={20} style={paper_s}>
        <Grid align={"center"}>
          <Avatar color="success" style={{backgroundColor: '#624a2e'}}>
            <PaidIcon />
          </Avatar>
          <h1>Wallet</h1>
        </Grid>
        <form style={{'margin': '10px', padding: '10px'}} onSubmit={onSubmit}>
        <TextField style={textStyle} value={wallet} disabled type="number" fullWidth label='current balance' placeholder="cur bal" />
          <TextField style={textStyle} value={wallet2} onChange={onChangeWallet2} type="number" fullWidth label='Moni' placeholder="How much do you wanna add" />
          <TextField style={textStyle} value={password} onChange={onChangePassword}  fullWidth label='Password' placeholder="Enter your Password" type="password" />  
          <Button style={{margin: '15px'}} type="submit" variant="contained" color="success">Add Money</Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default HomeB;
