import {render,screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import {  fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';
import '@testing-library/jest-dom';
import React from 'react';
jest.mock('../axios')
test("renders the react Navbar",()=>{
    render( <Router>
        <Navbar/>
      </Router>)
      const button =screen.getAllByRole('button')
      expect(button).toHaveLength(5)
      expect(screen.getByText(/Home/i)).toBeInTheDocument()
      expect(screen.getByText(/About/i)).toBeInTheDocument()
      expect(screen.getByText(/contact/i)).toBeInTheDocument()
      expect(screen.getByText(/welcome/i)).toBeInTheDocument()

})