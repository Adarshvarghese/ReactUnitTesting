import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axiosInstance from '../axios';
import UserUpdate from '../components/UserUpdate';

// Mock the axiosInstance
jest.mock('../axios', () => ({
  patch: jest.fn(),
}));

test('renders UserUpdate component and updates user', async () => {
  render(<UserUpdate />);

  // Type something into the name input
  userEvent.type(screen.getByPlaceholderText('name'), 'John Doe');

  // Type something into the email input
  userEvent.type(screen.getByPlaceholderText('Email'), 'john@example.com');

  // Type something into the password input
  userEvent.type(screen.getByPlaceholderText('Password'), 'password123');

  // Mock the response from axiosInstance.patch function
  axiosInstance.patch.mockResolvedValue({ status: 200 });

  // Click the 'Update' button
  fireEvent.click(screen.getByText('Update'));

  // Wait for the API call and component re-render
  await waitFor(() => {
    expect(axiosInstance.patch).toHaveBeenCalledWith('/users/api/update/', {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    });
  });

  // Assert that the component re-rendered after the update operation
  // You might want to check for success messages, etc., based on your application logic
  expect(screen.getByText('Update user')).toBeInTheDocument();
  // Add more assertions as needed
});

// Add more test cases as needed
