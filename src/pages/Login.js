import {Box, Button, TextField, Typography} from '@mui/material'
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';

import UserServices from '../apiUrls'
import apiService from '../apiUrls';
const Login=()=>{
    const [isSignup,setIsSignup]=useState(false)
    const [inputs,setInputs]= useState({name:"",email:"",password:""})
    const [passwordError,setPasswordError]=useState(false)
    const [nameError,setNameError]=useState(false)
    const [emailError,setEmailError]=useState(false)
    const navigate=useNavigate()
    let userMsg=""
    const handleChange=(e)=>{
        setInputs((prevstate)=>({
            ...prevstate,[e.target.name]:e.target.value
        }))
        var Emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         if(Emailregex.test(inputs.email)){
            setEmailError(false)
         }else{
            setEmailError(true)
         }
         var passwordRegex=/^[a-zA-Z0-9!@#$%^&*]{8,25}$/;
if (passwordRegex.test(inputs.password)){
   setPasswordError(false)
}else{
setPasswordError(true)
}
var  nameRegex= /^[A-Za-z\s]+$/;
if(nameRegex.test(inputs.name)){
   setNameError(false)
}else{setNameError(true)}

    }
    const resetState=()=>{
        setIsSignup(!isSignup)
        setInputs({name:"",email:"",password:""})
    }
    const handleSubmit= async (e)=>{
        e.preventDefault()
        
          
        if(isSignup){
           let data={email:inputs.email,password:inputs.password ,name:inputs.name}
            await apiService.registerUser(data).then(result=>{
                if(result.status===200){
                    setIsSignup(false)
                    
                }
            }).catch((err)=>{
                console.log(err.response.data);
            })
        }
        else{
                try{
                    let data={email:inputs.email,password:inputs.password}
                    const response= await apiService.login(JSON.stringify(data))
                     const authTokens=response.data
                    console.log(authTokens)
                    localStorage.setItem("access",authTokens.access)
                    localStorage.setItem("refresh",authTokens.refresh)

                    if(response.status=== 200){
                        console.log("hi.....    ")
                     navigate("/dashboard");
                    }
                    else{
                        navigate('/login')
                    }
                }
                catch(err){
console.log("some error occoured")
                }

        }
               
        }
        

        
    
return(
    <div>
        <form onSubmit={handleSubmit}>
            <Box display='flex' margin="auto" padding={3} borderRadius={5} sx={{backgroundColor:'#bccb',marginTop:6}} boxShadow={' 5px 5px 10px #ccc'}
             flexDirection={'column'} maxWidth={400} alignItems="center" justifyContent={'center'}>
                <Typography variant="h3" textAlign="center" padding={3}> 
                   {(isSignup)? "Signup":"User login"}
                    </Typography>
                    {isSignup &&
                    <TextField  name="name"  onChange={handleChange} value={inputs.name} variant="standard" placeholder='Name'/> }
                    {isSignup && (nameError && <label  style={{color:"red"}}>Please_enter_valid_name</label>)}
                    <TextField  name="email" onChange={handleChange} value={inputs.email} variant="standard" placeholder='Email'/>
                    { isSignup && ( emailError && <label style={{color:"red"}}>Please_enter_valid_email</label>)}

                    <TextField  name="password" onChange={handleChange}  value={inputs.password} variant="standard"placeholder='Password' type='password'/>
                    { isSignup && (passwordError && <label style={{color:"red"}}>Please_enter_valid_password</label>)}

                    <Button endIcon={(isSignup)?<HowToRegIcon/>:<LoginIcon/>} type='submit' variant='contained' sx={{marginTop:3, borderRadius:3}} color='primary' >{(isSignup)?"Register":"Login"}</Button>
                    <Button  onClick={resetState} sx={{marginTop:3, borderRadius:3}}  >change to {(isSignup)?"Login":"Signup"}</Button>

               

            </Box>
            
        </form>
        </div>
   





  
)


}

export default Login





