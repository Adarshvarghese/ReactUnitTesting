import React from 'react'
import {Route,Routes, BrowserRouter} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from '../src/pages/Login'
import UserDashboard from './components/UserDashboard'
import Deposit from './components/Deposit'
import Withdraw from './components/Withdraw'
function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route  path='/' element={<Home/>}></Route>
    <Route  path='/about' element={<About/>}></Route>
    <Route  path='/contact' element={<Contact/>}></Route>
    <Route  path='/login' element={<Login/>}></Route>
    <Route  path="/dashboard" element={<UserDashboard />}> </Route>
    <Route  path="/deposit" element={<Deposit/>}> </Route>
    <Route  path="/withdraw" element={<Withdraw/>}> </Route>
   </Routes>
   </BrowserRouter>
  
 
  )
}

export default App