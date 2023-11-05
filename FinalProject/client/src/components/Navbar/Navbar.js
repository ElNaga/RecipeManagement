import './Navbar.css'

import {useSelector, useDispatch} from 'react-redux'
import {setLogin} from '../../slices/loggedInSlice'

import logo from '../../assets/logo_color.svg'
import { useEffect, useState } from 'react'
import { LoggedOutButtons } from '../LoggedOutButtons/LoggedOutButtons'
import { LoggedInButtons } from '../LoggedInButtons/LoggedInButtons'
import { useNavigate } from 'react-router-dom'

export const Navbar = ({login}) => {

    useEffect( () => {

        console.log('mounitng nvabr')

    },[] )
    
    console.log('wtf')
    let dispatch = useDispatch();

    let navigate = useNavigate();

    return (
        <div className="overWrapper">
            <div className="wrapper">
                <div className="logo" onClick={() => navigate('/')}>
                    <img src={logo} alt="logo" />
                </div>
                <div className="foodCategories">
                    <ul>
                        <li className="foodCategory" onClick={() => navigate('/breakfast')} >BREAKFAST</li>
                        <li className="aDot"></li>
                        <li className="foodCategory" onClick={() => navigate('/brunch')} >BRUNCH</li>
                        <li className="aDot"></li>
                        <li className="foodCategory" onClick={() => navigate('/lunch')}>LUNCH</li>
                        <li className="aDot"></li>
                        <li className="foodCategory" onClick={() => navigate('/dinner')}>DINNER</li>
                    </ul>
                </div>
                <div>
                    {login ? <LoggedInButtons/> : <LoggedOutButtons/>}
                </div>
            </div>
        </div>
    )
}

