import {render,screen,waitFor} from '@testing-library/react'
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import {  fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axiosInstance from '../axios';
import '@testing-library/jest-dom';
import Withdraw from '../components/Withdraw';
import React from 'react';
import apiService from '../apiUrls';

jest.mock('../apiUrls')
jest.mock('../axios')
test("renders the react Deposit page",()=>{
   
    render( <Router>
        <Withdraw/>
      </Router>)
     const textboxes=screen.findByPlaceholderText('amount')
     expect(textboxes).toBeInTheDocument

})
test("withdraws amount",async()=>{
  apiService.withdraw.mockResolvedValue({message:"success"})
  render( <Router>
    <Withdraw/>
  </Router>)
  fireEvent.change(screen.getByPlaceholderText('Amount'),{target:{ value:12}})
  fireEvent.click(screen.getByText('submit'))

  await waitFor(() => expect(apiService.withdraw({amount:12})).toHaveBeenCalled());
})