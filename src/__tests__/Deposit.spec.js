import {render,screen} from '@testing-library/react'
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import {  fireEvent } from '@testing-library/react';
import Deposit from '../components/Deposit';

test("Deposit",()=>{
    render(<BrowserRouter><Deposit/></BrowserRouter>)

    expect(screen.getByText('Deposit')).toBeInTheDocument()
    button=screen.getByRole('button')
    expect(button).toHaveLength(1)
})
test("withdraws amount",async()=>{
    apiService.Deposit.mockResolvedValue({message:"success"})
    render( <Router>
      <Deposit/>
    </Router>)
    fireEvent.change(screen.getByPlaceholderText('Amount'),{target:{ value:122}})
    fireEvent.click(screen.getByText('submit'))
  
    await waitFor(() => expect(apiService.withdraw({amount:12})).toHaveBeenCalled());
  })

  jest.mock('../apiUrls', () => ({
    deposit: jest.fn(),
  }));
  
  // Mock the useLocation and useNavigate hooks
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useLocation: jest.fn(),
    useNavigate: jest.fn(),
  }));
  
  test('submits deposit form and navigates to /dashboard on success', async () => {
    const locationState = { account_no: '12345' };
    jest.spyOn(React, 'useLocation').mockReturnValue({ state: locationState });
  
    const navigateMock = jest.fn();
    jest.spyOn(React, 'useNavigate').mockReturnValue(navigateMock);
  
    render(<Deposit />);
  
    fireEvent.change(screen.getByPlaceholderText('Amount'), { target: { value: '100' } });
  
    apiService.deposit.mockResolvedValue({ status: 200 });
  
    fireEvent.click(screen.getByText('Submit'));
  
    await waitFor(() => {
      expect(apiService.deposit).toHaveBeenCalledWith({ amount: '100', account_no: '12345' });
    });
  
    expect(navigateMock).toHaveBeenCalledWith('/dashboard');
  });
  