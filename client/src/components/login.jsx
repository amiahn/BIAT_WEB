import React ,{ useState } from 'react'
import {  Button, Checkbox, FormControlLabel, Grid, Paper, TextField } from '@material-ui/core';
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";



function Login() {

    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
   
    async function loginUser(event) {
		event.preventDefault()


		const response = await Axios.post('http://localhost:4000/users/login', {Email, Password});
        let data = response.data;

		if (data.token) {
			localStorage.setItem('token', data.token)
            localStorage.setItem('connectedUserRole', data.connectedUser.Role)
			alert('Login successful')
			window.location.href = '/listMateriel'
		} else {
			alert('Please check your username and password')
		}
	}

    let navigate = useNavigate();
   
    
    const stylee = {
        margin : "20px auto"
    }
    const Avatarstyle = {
        backgroundColor : '#7235db'
        }

    const Styledcomponent = {
        padding : 50,
        margin : "100px auto",
        height : "60vh",
        width : 500,
    }



    return(
        <Grid>
            <Paper elevation={10} style={Styledcomponent}>
                <Grid align='center'>

          <img src={require('./biat.png')} alt="logo-Biat" width="100" heigth="100" />


                <h2 >Sign in</h2>
                </Grid>

                <form >

                <TextField
                type="email"
                value={Email}
                style= {stylee}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your Username'
                fullWidth 
                required


                />

                <TextField
                type="password"
                value={Password}
                style ={stylee}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Enter your Password'
                fullWidth 
                required


                />

                <FormControlLabel
                    control={
                        <Checkbox
                        name='check1'
                        color= 'primary'
                        />
                    }
                    label='Remember me'
                />
                <Button
                type='submit'
                color='primary'
                variant='contained'
                fullWidth
                onClick={loginUser}

               >
                Sign in


                </Button>
                </form>

            </Paper>
        </Grid>
    )
}

export default Login ;
