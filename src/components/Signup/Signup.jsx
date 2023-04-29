import React, { useContext, useState } from 'react';
import './Signup.css'
import { Link } from 'react-router-dom';
import { AuthContex } from '../Authprovider/Authprovider';


const Signup = () => {
    const [error,setError]=useState('');
    const {createsignup}=useContext(AuthContex)
    const handlesignup = (event)=>{
        event.preventDefault();
        const form = event.target;
        const email =form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email,password,confirm)
        setError('')
        if(password !== confirm){
            setError ('please provide similar confirm password')
            return;
        }
        if(password.length < 6){
            setError ('please provide atleast 6 carecters')
        }
        createsignup(email,password)
        .then(result=>{
            const loggeduser = result.user;
            console.log(loggeduser)
            setError(error.message)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign Up</h2>
            <form onSubmit={handlesignup}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" required/>
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="" required/>
                </div>
                <div className='form-control'>
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name="confirm" id="" required/>
                </div>
                <input className='btn-submit' type="submit" value="Login" />
            </form>
            <p><small>Already have an account?<Link to='/login'>Login</Link></small></p>
            <p className='form-error'>{error}</p>
        </div>
    );
};

export default Signup;