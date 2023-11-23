import axiosInstance from "./axios";
import axios from "axios";

const apiService={
   registerUser : (data) => {
    return  axios.post('http://127.0.0.1:8000/users/api/register/',data,
    { withCredentials:false,
        headers:{"Content-Type":'application/json'}
  })
  },

   login : async(data) => {
    return await axiosInstance.post('http://127.0.0.1:8000/users/api/login/',data)
  },
  approveAccount : (pk) => {
    return axiosInstance.patch(`accounts/api/approve/${pk}`);
  },
   createAccount : async (data) => {   
    return axiosInstance.post('/accounts/api/create/',data)     
    }, 
   getUserAccounts : async (user_id)=>{
        return  await axiosInstance.get(`accounts/api/userAccounts/${user_id}`)
   },
   getUsersAccounts: async () => {
    return axiosInstance.get('/accounts/api/usersAccounts/')
}

 ,
  allTransactionList : () => {
    return axiosInstance.get('/transactions/api/transactions/')
  },
   downloadAllTransactions :(data)=>{
    return axiosInstance.get('transactions/api/downloadAll/',data,{ 
      responseType: 'blob',
  })
  },
   downloadUserTransactions: (data)=>{
    return axiosInstance.get('transactions/api/download/',data,{ 
      responseType: 'blob',
  })
  }
  , userTransactionList : () => {
    return  axiosInstance.get('/users/api/userTransactions/')
  },
  deposit : (data) => {
    return axiosInstance.post('/transactions/api/deposit/',data)
  },
  withdraw:async (data)=>{
   return await axiosInstance.post('/transactions/api/withdraw/',data)
  },

 getViewStaff : async () => {
   return  await axiosInstance.get('/users/api/viewStaff/')
},

 getViewCustomers : async () => {
   return await axiosInstance.get('/users/api/viewCustomers/')
},
closeAccount :async (user_id)=>{
  return await axiosInstance.patch(`accounts/api/close/${user_id}`)
},
SearchUsers : async (searchString)=>{
  return await axiosInstance.get(`users/api/searchUsers/?search=${searchString}`)
}


}
export default apiService

// const AccountService={approveAccount,createAccount,getUserAccounts,getUsersAccounts}
// const TransactionService={allTransactionList,downloadAllTransactions,downloadUserTransactions,userTransactionList,Deposit}
// const UserServices ={getViewStaff,getViewCustomers,registerUser,login}

