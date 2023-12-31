import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import AccountBalanceSharpIcon from '@mui/icons-material/AccountBalanceSharp';
import PersonIcon from '@mui/icons-material/Person';


function CommonNav() {
    const navigate=useNavigate()


  
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AccountBalanceSharpIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            EVOBank
          </Typography>

          
          <AccountBalanceSharpIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{   
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           EVOBANK
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
           
              <Button
           
                onClick={()=>{navigate('/')}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
               Home
              </Button>
              <Button
           
           onClick={()=>{navigate('/about')}}
           sx={{ my: 2, color: 'white', display: 'block' }}
         >
          About
         </Button>
         <Button
           
           onClick={()=>{navigate('/contact')}}
           sx={{ my: 2, color: 'white', display: 'block' }}
         >
          Contact
         </Button>
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            
           
              
              <Button
           
           onClick={()=>{navigate('/login')}}
           sx={{ my: 2, color: 'white', display: 'block' }}
         >
          Login/Register<PersonIcon/>
         </Button>
         
          </Box>

          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default CommonNav;
