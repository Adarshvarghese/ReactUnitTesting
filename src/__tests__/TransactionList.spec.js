import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import apiService from '../apiUrls';
import AllTransactionList from '../components/AllTransactionsList';
import TransactionList from '../components/TransactionList';
jest.mock('../apiUrls');

jest.mock('js-file-download', () => jest.fn());

const mockTransactions = [
  {
    transaction_id: '1',
    amount: '100',
    type: 'Deposit',
    status: 'Completed',
    created_at: '2023-11-17T10:30:00.000Z',
  },
];

describe('TransactionList component', () => {
  beforeEach(() => {
    apiService.userTransactionList.mockResolvedValue({transaction_id: '1001', amount: '2000.00', type: 'Deposit', status: 'success', created_at: '2023-10-24T09:27:45.324743Z'});
  });

  test('renders transactions data', async () => {
    render(<TransactionList />);

    await waitFor(() => {
      
      expect(screen.getByText('Transaction_id')).toBeInTheDocument();
      expect(screen.getByText('amount')).toBeInTheDocument();
      expect(screen.getByText('type')).toBeInTheDocument();
      expect(screen.getByText('status')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('date')).toBeInTheDocument();
    });
  });
  test('calls download function on button click', async () => {
    render(<TransactionList />);

    apiService.downloadAllTransactions.mockResolvedValueOnce({ data: 'csv file' });

    fireEvent.click(screen.getByText('Download'));

    await waitFor(() => {
      expect(apiService.downloadAllTransactions).toHaveBeenCalled();
    });
    expect(require('js-file-download')).toHaveBeenCalledWith('csv file', 'transactions.csv');
  });
});
