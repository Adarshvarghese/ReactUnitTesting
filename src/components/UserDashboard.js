import SideNav from './SideNav'
import Box from '@mui/material/Box';

import Navbar from './Navbar';
import Grid from '@mui/material/Grid';
import {useActionStore} from '../ActionStore'
import UserUpdate from './UserUpdate';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import TransactionList from './TransactionList';
import {jwtDecode} from 'jwt-decode';
import ManagerSideNav from './ManagerSideNav';
import AccountTable from './AccountTable';
import AdminSideNav from './AdminSideNav';
import UserAccounts from './UserAccounts';
import AllTransactionList from './AllTransactionsList';
import CreateAccount from './CreateAccount';
import CustomersList from './CustomersList';
import StaffList from './StaffList';
import Search from './Search';


function UserDashboard() {
    const action=useActionStore((state)=>state.action)
    console.log(action)
    const token=localStorage.getItem('access')
    const user=jwtDecode(token)
     const user_type=user.user_type

    function switchRender(action){

    const UserdashRender={
      "Update":<UserUpdate/>,
      "Deposit":<Deposit/>,
      "Withdraw":<Withdraw/>,
      "TransactionList":<TransactionList/>,
      "userAccounts":<UserAccounts/>,
      "Create":<CreateAccount/>
    }
    
      return UserdashRender[action]
      
    }
    function adminRender(action){
      const admindashRender={
        'viewAccount':<AccountTable/>,
        'allTransactions':<AllTransactionList/>,
        'customersList':<CustomersList/>,
        'viewStaff':<StaffList/>,
        'Search':<Search/>


      }
      return admindashRender[action]
    }
    

    function navRender(user_type){

      const navRender={
        "customer":<SideNav/>,
        "staff":<AccountTable/>,
        "manager":<ManagerSideNav/>,
        "admin":<AdminSideNav/>
            }
      
      return(navRender[user_type])

    }
  return (
    <>
    <Navbar user={user.name} user_type={user.user_type}/>
    <Box height={60} />
    <Box sx={{ display: 'flex'}}>
      {navRender(user_type)}
    <Box component="main"  sx={{ flexGrow: 1, p: 3,backgroundColor:"#abbcde"}}>
    <Grid container spacing={2} >
  <Grid item xs={12}>
          {(user_type==='customer')?switchRender(action):adminRender(action)}

  </Grid>
  </Grid>




      </Box>

</Box>

    </>
   
  )
}

export default UserDashboard