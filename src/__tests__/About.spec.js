import {render,screen,wrapper} from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom';
import About from '../pages/About';
import React from 'react';
import '@testing-library/jest-dom';

describe("About", () => {
    it("renders correctly", async () => {
      render(
        <Router>
          <About/>
        </Router>
      );
    });
  });