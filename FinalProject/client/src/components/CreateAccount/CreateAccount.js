import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './createAccount.css'

export const CreateAccount = () => {

    const initData = {
        email: '',
        password: '',
        password2: '',
        first_name: '',
        last_name: '',
        date_birth: ''
    }

    const [createData, setCreateData] = useState(initData);

    const dataChange = (e) => {
        setCreateData({
            ...createData,
            [e.target.name]: e.target.value
        })
    }

    let navigate = useNavigate();
    const routeChangeLogin = () => {
        let path = `/login`;
        navigate(path);
    }

    const [showBadInfo, setShowBadInfo] = useState(false)

    const register = async () => {
        console.log(createData);

        try {
            let response = await fetch(`/api/v1/auth/create-account`,
                {
                    method: 'post',
                    body: JSON.stringify(createData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            if (response.ok) {
                routeChangeLogin()
            } else {
                setShowBadInfo(true)
                console.log('am i here?')
            }
        } catch (err) {
            console.log(err);
        }


    }


    return (
        <div className='create__overWrapper'>
            <div className='create__wrapper'>
                <div className='create__title'>
                    <h2>Create Account </h2>
                    <span className='create__theLine'></span>
                </div>

                <div className='create__centerContent'>
                    <div className='create__center__text'>
                        <h2 className='create__orangeLine'>Create your </h2>
                        <h2 className='create__blackLine'>account</h2>
                        <p>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.</p>
                    </div>
                    <div className='create__inputs'>
                        <div className='create__inputsLeft'>
                            <label className='create__label' htmlFor="first_name">First name</label>
                            <input className='create__input' type="text" name='first_name' value={createData.first_name} onChange={dataChange} />
                            <label className='create__label' htmlFor="Email">Email</label>
                            <input className='create__input' type="email" name='email' value={createData.email} onChange={dataChange} />
                            <label className='create__label' htmlFor="password">Password</label>
                            <input className='create__input' type="password" name='password' value={createData.password} onChange={dataChange} />
                            <button className='create__button'
                                onClick={register}
                            >CREATE ACCOUNT</button>
                                                        {showBadInfo ? <div style={{ color: "red", textDecoration: "underline" }}>
                                <br /><br />
                                Please add the missing information or check the information in the fields!
                            </div> : null}
                        </div>
                        <div className='create__inputsRight'>
                            <label className='create__label' htmlFor="last_name">Last name</label>
                            <input className='create__input' type="text" name='last_name' value={createData.last_name} onChange={dataChange} />
                            <label className='create__label' htmlFor="date">Date of birth</label>
                            <input className='create__input' type="date" name='date_birth' value={createData.date_birth} onChange={dataChange} />
                            <label className='create__label' htmlFor="retypePassword">Retype password</label>
                            <input className='create__input' type="password" name='password2' value={createData.password2} onChange={dataChange} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
