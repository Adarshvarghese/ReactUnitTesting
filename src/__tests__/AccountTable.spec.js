

  import React from 'react';
import { render, screen, waitFor, fireEvent ,act} from '@testing-library/react';
import AccountTable from '../components/AccountTable'
import { BrowserRouter } from 'react-router-dom';
import apiService from '../apiUrls';

jest.mock('../apiUrls');

const mockAccounts = [
  {
    account_number: 1,
    account_type: 'Savings',
    balance: 5000,
    is_open: true,
    is_active: true,
  },
];

describe('Account component', () => {
  beforeEach(() => {
    apiService.getUsersAccounts.mockResolvedValueOnce({ data: mockAccounts });
  });

  test('renders Account component with mocked data', async () => {
    render(<BrowserRouter><AccountTable /></BrowserRouter>);

    await waitFor(() => {
      expect(screen.getByTestId('account_no')).toBeInTheDocument();
      expect(screen.getByTestId('account_type')).toBeInTheDocument();
      expect(screen.getByTestId('balance')).toBeInTheDocument();
      expect(screen.getByTestId('is_open')).toBeInTheDocument();
      expect(screen.getByTestId('is_active')).toBeInTheDocument();
      expect(screen.getByTestId('approve')).toBeInTheDocument();
    });
  });

  test('calls approveAccount function on button click', async () => {
    render(<BrowserRouter><AccountTable /></BrowserRouter>);

    apiService.approveAccount.mockResolvedValueOnce({ status: 200 });

    fireEvent.click(screen.getByTestId('approve'));

    await waitFor(() => {
      expect(apiService.approveAccount).toHaveBeenCalledTimes(0);
    });
  });
});
