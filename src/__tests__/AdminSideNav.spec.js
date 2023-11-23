import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminSideNav from '../components/AdminSideNav';
import { useAppStore } from '../AppStore';
import { useActionStore } from '../ActionStore';

jest.mock('../AppStore');
jest.mock('../ActionStore');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
describe('AdminSideNav Component', () => {
  beforeEach(() => {
    useAppStore.mockReturnValue({ dopen: true }); 
    useActionStore.mockReturnValue({
      action: '',
      updateAction: jest.fn(),
    });
  });

  test('renders AdminSideNav with the correct list items', () => {
    render(<AdminSideNav />);

    // Check if each list item is rendered
    expect(screen.getByText('Manage Accounts')).toBeInTheDocument();
    expect(screen.getByText('All Transactions')).toBeInTheDocument();
    expect(screen.getByText('All Customers')).toBeInTheDocument();
    expect(screen.getByText('Staff List')).toBeInTheDocument();
    expect(screen.getByText('Search Users')).toBeInTheDocument();
  });


  //cmt
  test('clicking on a list item updates the action', () => {
    render(<AdminSideNav />);

    // Click on a list item
    fireEvent.click(screen.getByText('All Transactions'));

    expect(useActionStore().updateAction).toHaveBeenCalledWith('allTransactions');
  });

});
