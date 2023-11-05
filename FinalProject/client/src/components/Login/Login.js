import './login.css'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {setLogin} from '../../slices/loggedInSlice'

export const Login = () => {

    const loggedIn = useSelector( state => state.loggedIn.loggedIn);
    const dispatch = useDispatch();

    const [token, setToken] = useState('testing state Token text');
    
    const [invalidInfo, setInvalidInfo] = useState(false);

    let navigate = useNavigate();
    const routeChangeHome = () =>{ 
        let path = `/`; 
        navigate(path);
      }


    const initData = {
        email: '',
        password: '',
    }

    const [loginData, setLoginData] = useState(initData);
    const [isResponseOk, setIsResponseOk] = useState(false);

    const dataChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

    const sendLoginInfo = async (email, password) => {
        try {            
            const response = await fetch ('/api/v1/auth/login',
            {
                method: 'post',
                body: JSON.stringify({email, password}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            let rez = await response.json();
            console.log('this is result',rez);
            localStorage.setItem("token", rez.token);
            return rez;

        } catch (err) {
            setInvalidInfo(true);
            throw err;// throws to logMeIn  func
        }
    };

    const logMeIn = async () => {
        try {
            const res = await sendLoginInfo(loginData.email, loginData.password);
            console.log(res)
            let tokenExist = localStorage.getItem("token");
            if (tokenExist) {
                dispatch(setLogin( true ));
            }
            routeChangeHome();
            console.log(token);
        } catch (err){ 
            console.log(err);
        }
    }

    return (
        <div className='login__wrapper'>
            <div className='toCenterWrapper'>
                <div className='title'>
                    <h2>Log In </h2>
                    <span className='theLine'></span>
                </div>
                <div className='centerContent'>
                    <div className='centerContent__left'>
                        <h2>Welcome to <span className='inlineLogo'>Baby's</span></h2>
                        <p>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                    </div>
                    <div className='centerContent__right__wrapper'>

                        <div className='centerContent__right'>
                        {invalidInfo ? <div style={{color: 'red' }}>
                            Bad Login Information!
                            <br />
                            <br />
                            Try again. 
                            <br />
                            <br />
                        </div> : null}
                            <label className='emailLabel' htmlFor="email"  >Email</label>
                            <input className='emailInput' type="email" placeholder='user@domain.com' name='email' value={loginData.email} onChange={dataChange}/>
                            <label className='passwordLabel' htmlFor="password">Password</label>
                            <input className='passwordInput' type="password" placeholder='*****' name='password' value={loginData.password} onChange={dataChange}/>
                            <button className='loginButton'
                                onClick={logMeIn}
                            >LOG IN</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
