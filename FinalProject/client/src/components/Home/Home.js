import './Home.css'
import { RecipeCard } from "../RecipeCard/RecipeCard";
import { useState, useEffect } from 'react';
import { OneRecipeCard } from '../OneRecipeCard/OneRecipeCard';

import { setOpenPortal } from '../../slices/isOpenSlice'
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';

export const Home = () => {

    const openPortal = useSelector(state => state.openPortal.openPortal);
    const dispatch = useDispatch();

    // console.log((localStorage.getItem('token')))

    let [freshRecipes, setFreshRecipes] = useState([]);
    let [popularRecipes, setPopularRecipes] = useState([]);



    useEffect(() => {
        (async () => {
            try {
                const response = await fetch('/api/v1/recipes',
                    {
                        method: 'get',
                    });
                let rez = await response.json();
                console.log(rez, "ќфром хомеј");
                setFreshRecipes(rez.slice(0, 3));
                console.log(rez, "ќфром хомеј");
                return rez

            } catch (err) {
                console.log(err);
            }
        })();
        (async () => {
            try {
                const response = await fetch('/api/v1/recipes/popular',
                    {
                        method: 'get',
                    });
                let rez = await response.json();
                setPopularRecipes(rez);
                console.log(rez, "popular хомеј");
                return rez

            } catch (err) {
                console.log(err);
            }
        })();
    }, [])

    // let freshRecipes = [];
    // JSON.stringify()


    const navigate = useNavigate();

    const onClose = () => {
        console.log('this is ONCLOSEONCLOSEONCLOSEONCLOSE')
        dispatch(setOpenPortal(false))
        console.log(openPortal);
        navigate('/');
    }

    const [toDisplayRecipe, setToDisplayRecipe] = useState([])

    const onArrow = (recipeInfo) => {
        console.log('on arrow')
        // setToDisplayRecipe(popularRecipes.find(x => x._id === recipeInfo))
        console.log('this is recipe info---', recipeInfo)
        dispatch(setOpenPortal(true))
    }

    return (
        <div className='home--wrapper'>

<Routes>

<Route path="/recipe/:id" element={
    <>
      <OneRecipeCard open={openPortal} onClose={onClose}/>
    </>
  } />
</Routes>


            <div className='home--centerWrapper'>
                <div className='home--title'>
                    <h2>Fresh & New </h2>
                    <span className='home-theLine'></span>
                </div>
                <div className='home--cardsFresh'>
                    {freshRecipes.map((recipe, index) =>
                        <>
                            <RecipeCard
                             
                                key={recipe._id+5}
                                id={recipe._id}
                                recipe1={recipe}
                                onArrow={onArrow}
                                whereToNav={'home'} />
                        </>
                    )}
                </div>
                <div className='home--title'>
                    <h2>Most Popular Recipes </h2>
                    <span className='home-theLine'></span>
                </div>
                <div className='home--cardsPopular'>
                    {popularRecipes.map((recipe, index) =>
                        <>
                            <RecipeCard whereToNav={'home'} key={recipe._id} id={recipe.id} recipe1={recipe} onArrow={onArrow} />
                        </>
                    )}
                </div>

                {/* {open ? <OneRecipeCard
                    key={`${toDisplayRecipe._id}-${toDisplayRecipe.title}`}
                    id={`${toDisplayRecipe._id}-${toDisplayRecipe.title}`}
                    recipe={toDisplayRecipe}
                    open={openPortal}
                    onClose={onClose} /> : null} */}

            </div>
        </div>
    )
}
