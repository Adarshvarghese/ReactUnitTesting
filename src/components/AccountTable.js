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

export default function Account() {
 const [accounts, setAccounts] = useState([]);

 const getAccounts = async () => {
   try {
      const response = await apiService.getUsersAccounts()
      console.log(response.data)
      setAccounts(response.data)

    } catch (err) {
      console.error(err);
    }
 }
const approveAccount= async(acc_no)=>{
      try{
        const response= await apiService.approveAccount(acc_no)
        console.log(response.status)
      }
      catch(err){
      }
 }
 useEffect(() => {
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
        <StyledTableCell data-testId="account_no" align="center">Account.No</StyledTableCell>
        <StyledTableCell  data-testId="account_type"  align="center">Account_type</StyledTableCell>
        <StyledTableCell  data-testId="balance"  align="center">Balance</StyledTableCell>
        <StyledTableCell  data-testId="is_open"  align="center">Is Open</StyledTableCell>
        <StyledTableCell  data-testId="is_active" align="center">Is Active</StyledTableCell>
        <StyledTableCell  data-testId='approve' align="center">Approve</StyledTableCell>
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
            <Button endIcon={<CheckCircleOutlineIcon/>} type='submit' variant='contained' sx={{marginTop:3, borderRadius:3}} color='primary' onClick={()=>{approveAccount(accounts.account_number)}} >Approve</Button>
            </StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
 );
}