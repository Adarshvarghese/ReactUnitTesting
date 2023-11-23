import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import { Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import apiService from "../apiUrls";

const Search=()=>{
const [isLoaded,setIsLoaded]=useState(false)
const [input,setInput]=useState('')
const [results,setResults]=useState([])

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
const getDetails=async(val)=>{
         await apiService.SearchUsers(val).then(res=>{
            setResults(res.data.results)
            setIsLoaded(true)        
         })
   }
   const handleChange=async (value)=>{
    setInput(value)
     await getDetails(input).then(()=>{
        setIsLoaded(true)
     }).catch(()=>{console.log("some error occoured");})
    }
useEffect(()=>{
    getDetails(input)
},[])




    return(

<Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">

    <Box>

<TextField id="outlined-search" label="Search" type="search" value={input} onChange={(e)=>{handleChange(e.target.value)}} />

    </Box>
    <Box width="70vw"  display="flex" alignItems="center" justifyContent="center">

    <TableContainer component={Paper}>
  <Table sx={{ minWidth: 700 }} aria-label="customized table">
    <TableHead>
      <TableRow>
        <StyledTableCell data-testId="id" align="center">Id</StyledTableCell>
        <StyledTableCell  data-testId="name"  align="center">Name</StyledTableCell>
        <StyledTableCell  data-testId="email"  align="center">Email</StyledTableCell>
        <StyledTableCell  data-testId="role"  align="center">Role</StyledTableCell>

       
      </TableRow>
    </TableHead>
     <TableBody>
      {results.map((result,index) => (
        <StyledTableRow  key={result.id}>
          <StyledTableCell align="center">{result.id}</StyledTableCell>
          <StyledTableCell align="center">{result.name}</StyledTableCell>
          <StyledTableCell align="center">{result.email}</StyledTableCell>
          <StyledTableCell align="center">{result.user_type}</StyledTableCell>

        </StyledTableRow>
      ))}
    </TableBody>

  </Table>
</TableContainer>

    </Box>
</Box>


    )

}
export default Search;