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
import { useState ,useEffect} from 'react';
import {Button} from '@mui/material'
import apiService from '../apiUrls';
var fileDownload = require('js-file-download');



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




export default function TransactionList() {

  const [transactions,setTransactions]=useState([])
  const getTransactions= async ()=>{
    const  response = await axiosInstance.get('/transactions/api/userTransactions/')
    setTransactions(response.data)

  }
  const download =async()=>{
      await apiService.downloadUserTransactions().then(res => {
      fileDownload(res.data, 'transactions.csv');
      console.log(res);
  }).catch(err => {
      console.log(err);
  })
}
  useEffect(()=>{
    try{
      getTransactions()
    }
    catch(err){

    }
  },[])


  return (
   <> <div>            <Button  type='submit' variant='contained' sx={{marginTop:3, borderRadius:3}} color='primary' onClick={download} >Download</Button>
    </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
           
            <StyledTableCell>Transaction id</StyledTableCell>
            <StyledTableCell align="right">amount</StyledTableCell>
            <StyledTableCell align="right">type</StyledTableCell>
            <StyledTableCell align="right">status</StyledTableCell>
            <StyledTableCell align="right">date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction,index) => (
            <StyledTableRow key={transaction.transaction_id}>
              <StyledTableCell component="th" scope="row">
                {transaction.transaction_id}
              </StyledTableCell>
              <StyledTableCell align="right">{transaction.amount}</StyledTableCell>
              <StyledTableCell align="right">{transaction.type}</StyledTableCell>
              <StyledTableCell align="right">{transaction.status}</StyledTableCell>
              <StyledTableCell align="right">{transaction.created_at}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
    </>
  );
}