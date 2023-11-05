import './footer.css'
import logo from '../../assets/logo_white.svg'
import { useNavigate } from 'react-router-dom'
import React from 'react'

export const Footer = () => {

    let navigate = useNavigate();

    return (
        <div className='footer__overWrapper'>
            <div className='footer__wrapper'>
            <div className='footer__left'>
                <img src={logo} alt="" onClick={() => navigate('/')} style={{cursor: 'pointer'}}/>
            </div>
            <div className="footer__center">
                <ul>
                    <li className="foodCategory__footer" onClick={() => navigate('/breakfast')}>BREAKFAST</li>
                    <li className="aDot__footer"></li>
                    <li className="foodCategory__footer" onClick={() => navigate('/brunch')}>BRUNCH</li>
                    <li className="aDot__footer"></li>
                    <li className="foodCategory__footer" onClick={() => navigate('/lunch')}>LUNCH</li>
                    <li className="aDot__footer"></li>
                    <li className="foodCategory__footer" onClick={() => navigate('/dinner')}>DINNER</li>
                </ul>
            </div>
            <div className='footer__right'>
                <p>Baby's Food place</p>
                <p>copyright © 2022</p>
            </div>
        </div>
        </div>
    )
}
