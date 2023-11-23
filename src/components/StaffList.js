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
export default function StaffList() {

  const [staff,setStaff]=useState([])
  const getStaff= async ()=>{
    const  response = await apiService.getViewStaff()
    setStaff(response.data.results)
  }
  useEffect(()=>{
    try{
      getStaff()
    }
    catch(err){

    }
  },[])
  return (
    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
           
            <StyledTableCell>staff_d</StyledTableCell>
            <StyledTableCell align="right">name</StyledTableCell>
            <StyledTableCell align="right">email</StyledTableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {staff.map((staff,index) => (
            <StyledTableRow key={staff.id}>
              <StyledTableCell component="th" scope="row">
                {staff.id}
              </StyledTableCell>
              <StyledTableCell align="right">{staff.name}</StyledTableCell>
              <StyledTableCell align="right">{staff.email}</StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
         
  );
}