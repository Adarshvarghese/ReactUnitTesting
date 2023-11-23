import {render,screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import { BrowserRouter  } from 'react-router-dom';
import {  fireEvent } from '@testing-library/react';
import UserAccounts from '../components/UserAccounts';
import axiosInstance from '../axios';
import apiService from '../apiUrls';




jest.mock('../apiUrls')
jest.mock('../axios')
test("render user Accounts",()=>{
    render(<BrowserRouter><UserAccounts/></BrowserRouter>)

    expect(screen.getByText('Account.No')).toBeInTheDocument()
    expect(screen.getByText('Account_type')).toBeInTheDocument()
    expect(screen.getByText('Balance')).toBeInTheDocument()
    expect(screen.getByText('Is open')).toBeInTheDocument()
    expect(screen.getByText('Is active')).toBeInTheDocument()
    expect(screen.getByText('close')).toBeInTheDocument()
    expect(screen.getByText('reopen')).toBeInTheDocument()
    expect(screen.getByText('deposit')).toBeInTheDocument()
    expect(screen.getByText('withdraw')).toBeInTheDocument()



})
describe("testing userAccounts",()=>{
   const mockedUserAccounts={account_number:'Acc1001' ,account_type:'savings' ,balance:200  ,is_open:1 ,is_active:1 }
    beforeEach(() => {
        apiService.UserAccounts.mockResolvedValue(mockedUserAccounts)      });
        test("render user accounts",async()=>{
   
            render(<BrowserRouter><UserAccounts/></BrowserRouter>)
        
            await waitFor(() => {
              
                expect(screen.getByText('Acc1001')).toBeInTheDocument();
                expect(screen.getByText('savings')).toBeInTheDocument();
                expect(screen.getByText('200')).toBeInTheDocument();
                expect(screen.getByText('1')).toBeInTheDocument();
                expect(screen.getByPlaceholderText('1')).toBeInTheDocument();
              });
        
        })


})





