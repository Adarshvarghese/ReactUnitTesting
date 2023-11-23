import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateAccount from '../components/CreateAccount'; 
import axiosInstance from '../axios';
import { BrowserRouter } from 'react-router-dom';
jest.mock('../axios');
describe('CreateAccount component', () => {
  test('renders CreateAccount component', () => {
    render(<BrowserRouter><CreateAccount /></BrowserRouter>);
    expect(screen.getByText('Create New account')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('account_type')).toBeInTheDocument();
    expect(screen.getByText('Create')).toBeInTheDocument();
  });
  test('handles form submission successfully', async () => {
    axiosInstance.post.mockResolvedValueOnce({ status: 201 });
    render(<BrowserRouter><CreateAccount /></BrowserRouter>);
    fireEvent.change(screen.getByPlaceholderText('account_type'), { target: { value: 'Savings' } });
    fireEvent.click(screen.getByText('Create'));
    await waitFor(() => {
      expect(axiosInstance.post).toHaveBeenCalledWith('/accounts/api/create/', { account_type: 'Savings' });
    });
    expect(window.location.pathname).toBe('/');
  });
  test('handles form submission with an error', async () => {
    axiosInstance.post.mockRejectedValueOnce(new Error('API Error'));
    render(<BrowserRouter><CreateAccount /></BrowserRouter>);
    fireEvent.change(screen.getByPlaceholderText('account_type'), { target: { value: 'Savings' } });
    fireEvent.click(screen.getByText('Create'));
    await waitFor(() => {
      expect(axiosInstance.post).toHaveBeenCalledWith('/accounts/api/create/', { account_type: 'Savings' });
    });

  });
});
