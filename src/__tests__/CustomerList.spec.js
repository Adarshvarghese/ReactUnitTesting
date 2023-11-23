import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import axiosInstance from '../axios'; 
import CustomersList from '../components/CustomersList'; 
jest.mock('../axios');

describe('CustomersList Component', () => {
  const mockCustomers = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
  ];

  beforeEach(() => {
    axiosInstance.get.mockResolvedValueOnce({ data: { results: mockCustomers } });
  });

  it('renders the table with customer data', async () => {
    render(<CustomersList />);

    // Wait for the API call to complete
    await waitFor(() => expect(axiosInstance.get).toHaveBeenCalledTimes(1));

    // Check if the customer data is rendered in the table
    mockCustomers.forEach((customer) => {
      expect(screen.getByText(customer.id)).toBeInTheDocument();
      expect(screen.getByText(customer.name)).toBeInTheDocument();
      expect(screen.getByText(customer.email)).toBeInTheDocument();
    });
  });

  it('handles API error', async () => {
    // Mocking an API error
    axiosInstance.get.mockRejectedValueOnce(new Error('API error'));

    render(<CustomersList />);

    // Wait for the API call to complete
    await waitFor(() => expect(axiosInstance.get).toHaveBeenCalledTimes(1));
    expect(screen.getByText('Error loading customers')).toBeInTheDocument();
  });

});
