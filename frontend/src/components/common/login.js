import React from 'react';
import { Grid, Paper, Typography, Button, TextField, Avatar, Link, makeStyles } from '@material-ui/core';
import LoginIcon from '@mui/icons-material/Login';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { red, orange } from '@mui/material/colors';
import { useSearchParams } from 'react-router-dom';

import cake from '../img/login_img.jpg';

const redTheme = createTheme({ palette: { primary: red } })
const oTheme = createTheme({ palette: { primary: orange } })


const Login=()=>{
    const sign_in_s = {
        padding: '5vh 5vw',
        height: '70vh',
        width: '25vw',
        margin: "15vw auto"
    }
    const icon_style= {
        backgroundColor: 'orange'
    }
    const btnstyle={
        margin: '5% auto'
    }
    const sign_up_s={
        margin: '10% auto'
    }
    const img_s={
        margin: '10% auto',
        borderRadius: '5%'
    }

    const HandleClick = () => {
        console.log("Clicked");
    }

    const useStyles = makeStyles({
        button: {
          backgroundColor: '#FFA500',
          color: '#fff',
          '&:hover': {
            backgroundColor: '#FFA500',
            color: '#fff',
        },
      }})

    const classes=useStyles();

    return (
        <Grid align='center' >
            <Paper elevation={10} style={sign_in_s}>
                
                <Grid align = 'center' margin='1vh'>
                    <Avatar style={icon_style} ><LoginIcon /></Avatar>
                    <h1>Hello, Sign In</h1>
                </Grid>
                
                <TextField label='username' placeholder='Enter your username' required='true' fullWidth/>
                <TextField label='password' placeholder='Enter password' type='password' required='true' fullWidth/>
                
                {/* <ThemeProvider theme={redTheme}> */}
                <Button type='submit' classes={classes.button} variant="outlined" color="primary" style={btnstyle}>Sign In</Button>
                {/* </ThemeProvider> */}

                <Typography variant='caption' style={sign_up_s} align='center' fullWidth> <br /> <b>New to Sliggy?  &ensp; </b>
                    <Link href="#" OnClick="{HandleClick}" > Sign up</Link>
                </Typography>
                <br />
                <img src={cake} style={img_s} alt="login_img" width='60%' height='40%' />
            </Paper>
        </Grid>
        
    )
}

export default Login;
    