import Wrapper from '../assets/wrappers/RegisterAndLoginPage';
import { Logo, FormRow, SubmitBtn }  from '../components';
import { Form, redirect, Link } from 'react-router-dom';
import customFetch from '../utils/customFetch';
import {toast} from 'react-toastify';

export const action = async ({request})=>{
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await customFetch.post('/auth/register', data);
        toast.success('Reg. Success'); 
        return redirect('/login');
      } catch (error) {
       
        toast.error(error?.response?.data?.msg); 
        return error;
      }
 
    return null;
} ;


const Register = () => {
 
    return (
        <Wrapper>
            <Form method='post' className='form'>
                <Logo />
                <h4>Register</h4>
                <FormRow type='text' name='name'  />
                <FormRow type='text' name='lastName'  lblText='Last Name' />
                <FormRow type='text' name='location'  lblText='Location' />
                <FormRow type='email' name='email'  lblText='Email' />
                <FormRow type='password' name='password'  lblText='Password' />
              <SubmitBtn />
                <p>
                    Already a member?
                    <Link to='/login' className='member-btn'>
                        Login
                    </Link>
</p>
            </Form>
        </Wrapper>
 

    );
};

export default Register;