import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "../pages/Login";
import apiService from "../apiUrls";
import { BrowserRouter } from "react-router-dom";
import axiosInstance from "../axios";

jest.mock('../apiUrls')
jest.mock('../axios')
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));
  //cmtdwn
test("successful signup",async ()=>{
    const mockdata={data:"successfully registered"}
    apiService.registerUser.mockResolvedValueOnce(mockdata)
render(<BrowserRouter>
    <Login/>
</BrowserRouter>)
fireEvent.click(screen.getByText(/change to signup/i))
fireEvent.change(screen.getByPlaceholderText('Name'),{target:{ value:'ganeshkumar'}})
fireEvent.change(screen.getByPlaceholderText('Email'),{target:{ value:'ganesh@gmail.com'}})
fireEvent.change(screen.getByPlaceholderText('Password'),{target:{ value:'ganesh@123'}})
fireEvent.click(screen.getByText('Signup'))
 await waitFor(()=>{expect(apiService.registerUser).toHaveBeenCalledWith({
    name: 'ganeshkumar',
    email: 'ganesh@gmail.com',
    password: 'ganesh@123',
  });
 })
})

//cmtup
test("render login page",()=>{
    render(<BrowserRouter>
        <Login/>
    </BrowserRouter>)
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.getByText(/CHANGE TO SIGNUP/i)).toBeInTheDocument()  
})
test("change to registration", async ()=>{
    render(<Login/>)
    fireEvent.click(screen.getByText(/change to signup/i))
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'sdf' } });
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'ssd' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'sff' } });

    // expect(screen.getByText("Please_enter_valid_name")).toBeInTheDocument()
    expect(screen.getByText("Please_enter_valid_email")).toBeInTheDocument()
    expect(screen.getByText("Please_enter_valid_password")).toBeInTheDocument()


  });
test("render signup page",()=>{
    render(<BrowserRouter>
        <Login/>
    </BrowserRouter>)
    fireEvent.click(screen.getByText(/change to signup/i))
     expect(screen.getByPlaceholderText('Name')).toBeInTheDocument()
     expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
     expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
     expect(screen.getByText('Signup')).toBeInTheDocument()
     expect(screen.getByText(/CHANGE TO LOGIN/i)).toBeInTheDocument()
})
// test("successful login",async ()=>{
//     apiService.login.mockResolvedValueOnce({access:"Access",refresh:"refresh"})
// render(<BrowserRouter>
//     <Login/>
// </BrowserRouter>)
// fireEvent.change(screen.getByPlaceholderText('Email'),{target:{ value:'ganesh@gmail.com'}})
// fireEvent.change(screen.getByPlaceholderText('Password'),{target:{ value:'ganesh@123'}})
// fireEvent.click(screen.getByText('Signup'))
//  await waitFor(()=>{expect(apiService.registerUser).toHaveBeenCalledWith({
   
//     email: 'ganesh@gmail.com',
//     password: 'ganesh@123',
//   });
//  })
// })


