import {render,screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import {  fireEvent } from '@testing-library/react';
import Navbar from '../components/CommonNav';
import '@testing-library/jest-dom';
import React from 'react';
import CommonNav from '../components/CommonNav';
jest.mock('../axios')

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));
test("renders the react Navbar",()=>{
    render( <Router>
        <CommonNav/>
      </Router>)
      const button =screen.getAllByRole('button')
      expect(button).toHaveLength(5)
      expect(screen.getByText(/Home/i)).toBeInTheDocument()
      expect(screen.getByText(/About/i)).toBeInTheDocument()
      expect(screen.getByText(/contact/i)).toBeInTheDocument()
      expect(screen.getByText(/Login\/register/i)).toBeInTheDocument()
})

test("navigating to About",()=>{
    const pushMock = jest.fn();
    useNavigate.mockReturnValue({ push: pushMock });
    render( <Router>
        <CommonNav/>
      </Router>)

    const button = getByText('About');
  fireEvent.click(button);
  expect(pushMock).toHaveBeenCalledWith('/about');
})