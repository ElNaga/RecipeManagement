
import { RecipeCard } from "../RecipeCard/RecipeCard";
import { useState, useEffect } from 'react';
import { OneRecipeCard } from '../OneRecipeCard/OneRecipeCard';

import { setOpenPortal } from '../../slices/isOpenSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate, useNavigation } from 'react-router-dom';

export const NotAuthenticated = () => {


    const navigate = useNavigation();

    const navigateToHome = () => {
        navigate("/");
    }

    return (
        <div className='home--wrapper'>
            <div className='home--centerWrapper'>
               <h1>Not authenticated.</h1>
               <button onClick={() => navigateToHome}>Go to Home</button>

            </div>
        </div>
    )
}
