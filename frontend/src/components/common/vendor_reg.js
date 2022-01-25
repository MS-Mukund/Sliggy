import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Grid, Paper, Avatar } from "@material-ui/core";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { MenuItem, Typography, FormControl, Select, InputLabel } from "@mui/material";
// import DateTimePicker from '@mui/lab/DateTimePicker';

let OpeningTime = 0;
let ClosingTime = 0;
const Vend_reg = (props) => {
  const navigate = useNavigate();
  const [ManagerName, setManagerName] = useState("");
  const [ShopName, setShopName] = useState("");
  const [email, setEmail] = useState("");
  const [ContactNo, setContactNo] = useState('');

  const [password, setPassword] = useState("");
  const [CPass, setCPass] = useState("");
  const [Ophrs , setOpHrs] = useState(0);
  const [Opmins , setOpMins] = useState(0);
  const [Clhrs , setClHrs] = useState(0);
  const [Clmins , setClMins] = useState(0);

  const onChangeMname = (event) => {
    setManagerName(event.target.value);
  };

  const onChangeShopName = (event) => {
    setShopName(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangeContactNo = (event) => {
    setContactNo(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };
  
  const onChangeClHrs = (event) => {
    ClosingTime = 0;
    setClHrs( event.target.value );
  };

  const onChangeClMins = (event) => {
    setClMins( Number(event.target.value) );
  };

  const onChangeOpHrs = (event) => {    
    OpeningTime = 0;   
    setOpHrs( event.target.value );    
  };

  const onChangeOpMins = (event) => {
    setOpMins( event.target.value );
  };

  const ConfirmPassword = (event) => {
    setCPass(event.target.value);
  };

  let mins_arr = Array.from(Array(60).keys());
  let hrs_arr = Array.from(Array(24).keys());

  const resetInputs = () => {
    setManagerName("");
    setShopName("");
    setEmail("");
    setContactNo(0);
    setPassword("");
    setOpHrs(0);
    setOpMins(0);
    setClHrs(0);
    setClMins(0);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    //error handling
    if( password !== CPass ){
      console.log(password);
      console.log(CPass);
      alert("Password does not match");
      Location.reload();
    }
    if( OpeningTime > ClosingTime ){
      alert("The shop should open before it closes");
      Location.reload();
    }

    OpeningTime = Number(Ophrs)*60 + Number(Opmins);
    ClosingTime = Number(Clhrs)*60 + Number(Clmins);
    console.log( Number(OpeningTime) );
    console.log( Number(ClosingTime) );
    console.log(ManagerName);
    console.log(ShopName);
    console.log(email);
    console.log(ContactNo);
    console.log(password);

    const newVendor = {
      ManagerName: ManagerName,
      ShopName: ShopName,
      email: email,
      ContactNo: ContactNo,
      password: password,
      OpeningTime: OpeningTime,
      ClosingTime: ClosingTime
    };

    axios
      .post("http://localhost:4000/vendor/vregister", newVendor)
      .then((response) => {
        navigate("/");
      })
      .catch ((err) => {
        alert(err);
        Location.reload();
      });

    resetInputs();
  };

  const paper_s = { padding: "5vh 1vw", width: "35%", margin: "5vh auto" };
  const textStyle = { margin: "1vh 0" };

  return (
    <Grid align={"center"}>
      <Paper elevation={20} style={paper_s}>
        <Grid align={"center"}>
          <Avatar color="success" style={{backgroundColor: '#1bbd7e'}}>
            <VpnKeyIcon />
          </Avatar>
          <h1>Register</h1>
          <Typography variant="caption" style={{font_size:28}}> Note: you will be registering as a Vendor</Typography>
        </Grid>
        <form style={{'margin': '10px', padding: '10px'}} onSubmit={onSubmit}>
          <TextField style={textStyle} fullWidth label='Manager Name' placeholder="Who's the boss" onChange={onChangeMname} required />
          <TextField style={textStyle} fullWidth label='Shop Name' placeholder="Shop ka naam kya h" onChange={onChangeShopName} required/>
          <TextField style={textStyle} fullWidth label='Email' placeholder="Enter your Email" onChange={onChangeEmail} required/>
          <TextField style={textStyle} fullWidth label='Contact' placeholder="Number bolo jaldi" onChange={onChangeContactNo} required/>
          <TextField style={textStyle} fullWidth label='Password' placeholder="Enter your Password" type="password" onChange={onChangePassword} required/>
          <TextField style={textStyle} fullWidth label='Confirm Password' placeholder="Confirm the top-secret Password" type="password" onChange={ConfirmPassword} required />
          <div style={{width: '100%', margin: "0"}} id="opening_time">
            <p align={"left"} style={{display: "inline", padding: "1vw"}}>Opening Time</p>
            <FormControl style={{width: '25%'}}>
              <InputLabel id="demo-simple-select-label">Open hrs</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" value={Ophrs} label="Open hrs" onChange={onChangeOpHrs}>
                {hrs_arr.map((option, key) => {
                  return (
                  <MenuItem key={key} value={Number(option)}>{option}</MenuItem>
                  );
                })}
              </Select>
            </FormControl> 
            <h1 style={{whitespace: "nowrap", display: "inline"}} >&nbsp;:&nbsp;</h1>
            <FormControl style={{width: '35%'}}>
              <InputLabel id="demo-simple-select-label2">Open mins</InputLabel>
              <Select labelId="demo-simple-select-label2" id="demo-simple-select2" value={Opmins} label="Open mins" onChange={onChangeOpMins}>
                {mins_arr.map((option, key) => {
                  return (
                  <MenuItem key={key} value={Number(option)}>{option}</MenuItem>
                  );
                })}
              </Select>
            </FormControl> 
          </div>

          <div style={{width: '100%'}} id="closing_time">
            <p align={"left"} style={{display: "inline", padding: "1vw"}}>Closing Time &nbsp;</p>
            <FormControl style={{width: '25%', margin: '1vh auto'}}>
              <InputLabel id="demo-simple-select-label3">Close hrs</InputLabel>
              <Select labelId="demo-simple-select-label3" id="demo-simple-select3" value={Clhrs} label="Close hrs" onChange={onChangeClHrs}>
                {hrs_arr.map((option, key) => {
                  return (
                  <MenuItem key={key} value={Number(option)}>{option}</MenuItem>
                  );
                })}
              </Select>
            </FormControl> 
            <h1 style={{whitespace: "nowrap", display: "inline"}} >&nbsp;:&nbsp;</h1>
            <FormControl style={{width: '35%'}}>
              <InputLabel id="demo-simple-select-label4">Close mins</InputLabel>
              <Select labelId="demo-simple-select-label4" id="demo-simple-select4" value={Clmins} label="Close mins" onChange={onChangeClMins}>
                {mins_arr.map((option, key) => {
                  return (
                  <MenuItem key={key} value={Number(option)}>{option}</MenuItem>
                  );
                })}
              </Select>
            </FormControl> 
          </div>

          <br />
          <Button style={{margin: '15px'}} type="submit" variant="contained" color="success">Sign me up!</Button>
        </form>
      </Paper>
    </Grid>
  );
};

export default Vend_reg;
