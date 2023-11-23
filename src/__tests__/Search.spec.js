import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Search from '../components/Search';
import apiService from '../apiUrls';

// Mock the apiService
jest.mock('../apiUrls', () => ({
  SearchUsers: jest.fn(),
}));

test('renders Search component and fetches results', async () => {
  // Mock the response from the SearchUsers function
  apiService.SearchUsers.mockResolvedValue({
    data: {
      results: [
        { id: 1, name: 'John Doe', email: 'john@example.com', user_type: 'user' },
        // Add more mock data as needed
      ],
    },
  });

  render(<Search />);

  // Type something into the search input
  const searchInput = screen.getByLabelText('Search');
  fireEvent.change(searchInput, { target: { value: 'John' } });

  // Wait for the API call and component re-render
  await waitFor(() => {
    expect(apiService.SearchUsers).toHaveBeenCalledWith('John');
  });

  // Assert that the rendered data matches the mock data
  expect(screen.getByTestId('id')).toHaveTextContent('1');
  expect(screen.getByTestId('name')).toHaveTextContent('John Doe');
  expect(screen.getByTestId('email')).toHaveTextContent('john@example.com');
  expect(screen.getByTestId('role')).toHaveTextContent('user');
});

// Add more test cases as needed
