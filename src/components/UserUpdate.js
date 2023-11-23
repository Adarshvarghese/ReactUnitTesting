





   


import {Box, Button, TextField, Typography} from '@mui/material'
import { useState } from 'react'
import UpdateIcon from '@mui/icons-material/Update';
import axiosInstance from '../axios'
const UserUpdate =()=>{
    const [inputs,setInputs]= useState({name:"",email:"",password:""})
    const handleChange=(e)=>{
        setInputs((prevstate)=>({
            ...prevstate,[e.target.name]:e.target.value
        }))
    }
    console.log(inputs)

  async function handleSubmit(event){
    try{  
          const response= await axiosInstance.patch('/users/api/update/',inputs)
          console.log(response.status)
    }
    catch(err){
        console.log(err)
    }
   }
    return(
        <div>
        <form  onSubmit={handleSubmit()}>
            <Box display='flex' margin="auto" padding={2} borderRadius={5} sx={{backgroundColor:'#bccb',marginTop:6}} boxShadow={' 5px 5px 10px #ccc'}
             flexDirection={'column'} maxWidth={400} height={350} alignItems="center" justifyContent={'center'}>
                <Typography variant="h4" textAlign="center" padding={3}> 
                Update user
                    </Typography>
                    <TextField  name="name"  onChange={handleChange} value={inputs.name} variant="standard" placeholder='name'/> 
                    <TextField  name="email"  onChange={handleChange} value={inputs.email} variant="standard" placeholder='Email'/> 
                    <TextField  name="password"  onChange={handleChange} value={inputs.password} variant="standard" placeholder='Password'/> 
                    <Button endIcon={<UpdateIcon/>} type='submit' variant='contained' sx={{marginTop:3, borderRadius:3}} color='primary' >Update</Button>
            </Box>
        </form>
        </div>
    )
}
export default UserUpdate;