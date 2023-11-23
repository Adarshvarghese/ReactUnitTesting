import {render,screen,wrapper} from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom';
import Contact from '../pages/Contact';
import React from 'react';
import '@testing-library/jest-dom';


describe("Contact", () => {
    it("renders correctly", async () => {
      render(
        <Router>
          <Contact/>
        </Router>
      );
    });
  });