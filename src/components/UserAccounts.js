import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axiosInstance from '../axios';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useState ,useEffect} from 'react';
import {Button} from '@mui/material'
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import apiService from '../apiUrls';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
 [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
 },
 [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
 },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
 '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
 },
 // hide last border
 '&:last-child td, &:last-child th': {
    border: 0,
 },
}));
export default function UserAccounts() {
 const [accounts, setAccounts] = useState(
  [{account_number: 'zz', balance: 3321, account_type: 'savings', is_active: false,is_open:true,user_id:44}]);
 const token=localStorage.getItem('access')
 const [change,setChange]=useState(false)
 const navigate=useNavigate()
 const user=jwtDecode(token)
 const getAccounts = async () => {
  
      const response =  await apiService.getUserAccounts(user.user_id).then(res=>{
        setAccounts(res.data)

      }).catch((err)=>{
          
      })
     
  
 }
const closeAccount= async(user_id)=>{
      try{
        const response= apiService.closeAccount(user_id)
        console.log(response)

        setChange(!change)
      }
      catch(err){
      }
 }
 const reOpen= async(pk)=>{
    try{
      const response= await axiosInstance.patch(`accounts/api/reopen/${pk}`)
      console.log(response)
      console.log(response.status)
      setChange(!change)
    }
    catch(err){

    }
}
const deposit =async(pk)=>{
    navigate('/deposit',{state:pk})
  }
  const withdraw =async(pk)=>{
    console.log(pk)
    navigate('/withdraw',{state:pk})


  }



 useEffect( () => {
    try {
      
      getAccounts()
      
    
    } catch (err) {

    }
 }, []);
 return (
  <TableContainer component={Paper}>
  <Table sx={{ minWidth: 700 }} aria-label="customized table">
    <TableHead>
      <TableRow>
        <StyledTableCell align="center">Account.No</StyledTableCell>
        <StyledTableCell align="center">Account_type</StyledTableCell>
        <StyledTableCell align="center">Balance</StyledTableCell>
        <StyledTableCell align="center">Is Open</StyledTableCell>
        <StyledTableCell align="center">Is Active</StyledTableCell>
        <StyledTableCell align="center">close</StyledTableCell>
        <StyledTableCell align="center">reopen</StyledTableCell>
        <StyledTableCell align="center">deposit</StyledTableCell>
        <StyledTableCell align="center">withdraw</StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {accounts.map((accounts,index) => (
        <StyledTableRow  key={accounts.account_number}>
        
          <StyledTableCell align="center">{accounts.account_number}</StyledTableCell>
          <StyledTableCell align="center">{accounts.account_type}</StyledTableCell>
          <StyledTableCell align="center">{accounts.balance}</StyledTableCell>
          <StyledTableCell align="center">{(accounts.is_open)? "Yes":"No"}</StyledTableCell>
          <StyledTableCell align="center">{(accounts.is_active)? "Yes":"No"}</StyledTableCell>
          
          <StyledTableCell align="center">
            <Button endIcon={<CheckCircleOutlineIcon/>} type='submit' variant='contained' sx={{marginTop:3, borderRadius:3}} color='primary' onClick={()=>{closeAccount(accounts.account_number)}} >Close</Button>
            </StyledTableCell>
            <StyledTableCell align="center">
            <Button endIcon={<CheckCircleOutlineIcon/>} type='submit' variant='contained' sx={{marginTop:3, borderRadius:3}} color='primary' onClick={()=>{reOpen(accounts.account_number)}} >Reopen</Button>
            </StyledTableCell>
            <StyledTableCell align="center">
            <Button endIcon={<CheckCircleOutlineIcon/>} type='submit' variant='contained' sx={{marginTop:3, borderRadius:3}} color='primary' onClick={()=>{deposit(accounts.account_number)}} >Deposit</Button>
            </StyledTableCell>
            <StyledTableCell align="center">
            <Button endIcon={<CheckCircleOutlineIcon/>} type='submit' variant='contained' sx={{marginTop:3, borderRadius:3}} color='primary' onClick={()=>{withdraw(accounts.account_number)}} >Withdraw</Button>
            </StyledTableCell>
            
          
        </StyledTableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
 );
}