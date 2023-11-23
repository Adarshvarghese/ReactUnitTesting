import {render,screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import {  fireEvent } from '@testing-library/react';
import UserDashboard from '../components/UserDashboard';

test("render dashboard",()=>{

    render(<UserDashboard/>)
})