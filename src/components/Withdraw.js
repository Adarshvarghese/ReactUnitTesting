import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import {Box, Button, TextField, Typography} from '@mui/material'
import { useState } from 'react'
import axiosInstance from '../axios';
import { useLocation,useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import apiService from '../apiUrls';






const Withdraw =()=>{
const [amount,setAmount]=useState(0)
const[errMsg,setErrMsg]=useState('')
const[success,setSuccess]=useState(null)
const location = useLocation();
const navigate=useNavigate()
const data = location.state;
const handleSubmit= async (e)=>{
    e.preventDefault()
   
        console.log("...........",data)
        const withdrawData={"amount":amount,"account_no":data}
        await apiService.withdraw(withdrawData).then(res=>{
        setSuccess(true)
        setTimeout(() => {
            navigate('/dashboard')
          }, "2000");
    }).catch((e)=>{
        console.log("hii....");
        setSuccess(false)
        setErrMsg(e.response?.data?.message || '')
        setTimeout(() => {
            navigate('/dashboard')
          }, "2000");
    })
    


}
    return(
        <div>
        <form onSubmit={handleSubmit}>
      
            <Box display='flex' margin="auto" padding={2} borderRadius={5} sx={{backgroundColor:'#bccb',marginTop:6}} boxShadow={' 5px 5px 10px #ccc'}
             flexDirection={'column'} maxWidth={400} height={350} alignItems="center" justifyContent={'center'}>
 { success ? <Alert variant="filled" severity="success" sx={{width:'30vw'}}>
                {"withdrawal has been successful"}
        </Alert>:<Alert variant="filled" severity="error" sx={{width:'30vw'}}>
                {errMsg}
        </Alert>
}
                <Typography variant="h4" textAlign="center" padding={3}> 
                 Withdraw Money
                    </Typography>

                  
                    <TextField  name="amount" data-testId='amount' onChange={(e)=>{setAmount(e.target.value)}} value={amount} variant="standard" placeholder='Amount'/> 
                   
                    <Button endIcon={<AttachMoneyIcon/>} type='submit' variant='contained' sx={{marginTop:3, borderRadius:3}} color='primary' >submit</Button>
            </Box>
            
        </form>
        </div>
    )
}
export default Withdraw;