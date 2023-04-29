import React, { useContext, useState } from 'react';
import './Login.css'
import { Link,useNavigate,useLocation } from 'react-router-dom';
import { AuthContex } from '../Authprovider/Authprovider';

const Login = () => {
    const [show,setShow]=useState(false)
    const {login}=useContext(AuthContex)
    const navigates = useNavigate();
    const location = useLocation();
   
    const from = location.state?.from?.pathname || '/';
    const handlelogin= event =>{
        event.preventDefault();
        const form = event.target;
        const email =form.email.value;
        const password = form.password.value;
        console.log(email,password)
        login(email,password)
        .then(result=>{
            const loggeduser = result.user 
            console.log(loggeduser)
            navigates(from ,{replace: true});
        })
        .catch(error=>{
            console.log(error)
        })
    }
    return (
        <div className='form-container'>
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handlelogin}>
                <div className='form-control'>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" required/>
                </div>
                <div className='form-control'>
                    <label htmlFor="password">Password</label>
                    <input type={show ? "text" : "password"} name="password" id="" required/>
                    <p onClick={()=>setShow(!show)}><small>
                        {
                            show ? <span>Hide password</span>: <span>Show password</span>
                        }
                        </small></p>
                </div>
                <input className='btn-submit' type="submit" value="Login" />
            </form>
            <p><small>New to emaJohn? <Link to='/signup'>Please sign up</Link></small></p>
        </div>
    );
};

export default Login;