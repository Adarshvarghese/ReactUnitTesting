import {render,screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import { BrowserRouter  } from 'react-router-dom';
import {  fireEvent } from '@testing-library/react';
import SideNav from '../components/SideNav'

test("render sideNav",()=>{
    render(<BrowserRouter><SideNav /></BrowserRouter>);

    expect(screen.getByText('Manage Accounts')).toBeInTheDocument()
    expect(screen.getByText('Transactions')).toBeInTheDocument()
    expect(screen.getByText('Update Details')).toBeInTheDocument()
    expect(screen.getByText('Manage Accounts')).toBeInTheDocument()

})