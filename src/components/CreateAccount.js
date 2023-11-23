import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import {Box, Button, TextField, Typography} from '@mui/material'
import {  useState } from 'react'
import axiosInstance from '../axios';
import { useNavigate } from 'react-router-dom';

const CreateAccount =()=>{
const [account_type,setAccount_type]=useState('')
const navigate=useNavigate()

 const handleSubmit= async (e)=>{
    e.preventDefault()
    try{  
           console.log("working....",account_type)
           const response= await axiosInstance.post('/accounts/api/create/',{"account_type":account_type})
           if(response.status==200){
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
                 Create New account
                    </Typography>
                  
                    <TextField  name="account_type" placeholder="account_type"  onChange={(e)=>{setAccount_type(e.target.value)}} value={account_type} variant="standard" /> 
                   
                    <Button endIcon={<AttachMoneyIcon/>} type='submit' variant='contained' sx={{marginTop:3, borderRadius:3}} color='primary' >Create</Button>
            </Box>
            
        </form>
        </div>
    )
}
export default CreateAccount;