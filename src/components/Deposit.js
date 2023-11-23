import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import {Box, Button, TextField, Typography} from '@mui/material'
import {  useState } from 'react'
import axiosInstance from '../axios';
import { useLocation,useNavigate } from "react-router-dom";
import apiService from '../apiUrls';
const Deposit =()=>{
const [amount,setAmount]=useState(0)
const location = useLocation();
const navigate=useNavigate()
const data = location.state;
 const handleSubmit= async (e)=>{
e.preventDefault();
    try{
          const depositData={"amount":amount,"account_no":data}
           const response= await apiService.deposit(depositData)
         if(response.status === 200){
            navigate('/dashboard')
         }            
    }
    catch(err){
        console.log(err)
    }
}
    return(
        <div>
        <form onSubmit={handleSubmit} >
            <Box display='flex' margin="auto" padding={3} borderRadius={5} sx={{backgroundColor:'#bccb',marginTop:6}} boxShadow={' 5px 5px 10px #ccc'}
             flexDirection={'column'} maxWidth={600} height={350} alignItems="center" justifyContent={'center'}>
                <Typography variant="h5" textAlign="center" padding={2}> 
                 Deposit
                    </Typography>
                  
                    <TextField  name="amount"  onChange={(e)=>{setAmount(e.target.value)}} value={amount} variant="standard" placeholder='Amount'/> 
                   
                    <Button endIcon={<AttachMoneyIcon/>} type='submit' variant='contained' sx={{marginTop:3, borderRadius:3}} color='primary' >submit</Button>
            </Box>
            
        </form>
        </div>
    )
}
export default Deposit;