import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ManagerSideNav from '../components/ManagerSideNav';
import { useAppStore } from '../AppStore';
import { useActionStore } from '../ActionStore';

jest.mock('../AppStore');
jest.mock('../ActionStore');

describe('ManagerSideNav Component', () => {
  beforeEach(() => {
    // Mock any necessary setup for your tests
    // For example, you might want to mock the useAppStore and useActionStore responses
    // useAppStore.mockReturnValue({ dopen: true });
    // useActionStore.mockReturnValue({ updateAction: jest.fn(), action: 'allTransactions' });
  });

  test('renders ManagerSideNav with All Transactions, All Customers, and Staff List items', () => {
    render(
      <Router>
        <ManagerSideNav />
      </Router>
    );

    const allTransactionsItem = screen.getByText(/All Transactions/i);
    const allCustomersItem = screen.getByText(/All Customers/i);
    const staffListItem = screen.getByText(/Staff List/i);

    expect(allTransactionsItem).toBeInTheDocument();
    expect(allCustomersItem).toBeInTheDocument();
    expect(staffListItem).toBeInTheDocument();
  });
//cmtdwn

  test('calls updateAction function on item click', () => {
    const updateActionMock = jest.fn();
    useActionStore.mockReturnValue({ updateAction: updateActionMock, action: 'allTransactions' });

    render(
      <Router>
        <ManagerSideNav />
      </Router>
    );

    const allTransactionsItem = screen.getByText(/All Transactions/i);

    fireEvent.click(allTransactionsItem);

    expect(updateActionMock).toHaveBeenCalledWith('allTransactions');
  });

  //cmtup

});
