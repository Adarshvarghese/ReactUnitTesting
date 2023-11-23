import React from 'react';
import { render, waitFor, screen, fireEvent } from '@testing-library/react';
import apiService from '../apiUrls';
import StaffList from '../components/StaffList';
jest.mock('../apiUrls');
const mockStaff = [
    {
      staff_id: '1',
      name: 'suresh',
      email: 'suresh@gmail.com',
    },
  ];
  beforeEach(() => {
    apiService.getViewStaff.mockResolvedValue(mockStaff);
  });
test("render staffList",async ()=>{
    render(<StaffList />);

    await waitFor(() => {
      
      expect(screen.getByText('staff_id')).toBeInTheDocument();
      expect(screen.getByText('name')).toBeInTheDocument();
      expect(screen.getByText('email')).toBeInTheDocument();

    });
  });
    

