import './category.css'

import React, { useEffect, useState } from 'react'
import { setOpenPortal } from '../../slices/isOpenSlice'
import { useParams, Route, Routes, useNavigate } from 'react-router-dom';
import { RecipeCard } from '../RecipeCard/RecipeCard';
import { useDispatch, useSelector } from 'react-redux';

import { OneRecipeCardCategory } from '../OneRecipeCardCategory/OneRecipeCardCategory';


export const Category = () => {

  const openPortal = useSelector(state => state.openPortal.openPortal);
  const dispatch = useDispatch();

  const { category } = useParams();

  let categoryParam = category.charAt(0).toUpperCase() + category.slice(1)

  const [categoryRecipes, setCategoryRecipes] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/api/v1/recipes/by-category/${categoryParam}`,
          {
            method: 'get',
          });
        let rez = await response.json();
        console.log(rez, "ќфром хомеј");
        setCategoryRecipes(rez);
        console.log(rez, "ќфром хомеј");
        return rez

      } catch (err) {
        console.log(err);
      }
    })();
  }, [category])

  const onArrow = (recipeInfo) => {
    console.log('save me!')
    dispatch(setOpenPortal(true))
  }

  const navigate = useNavigate();
  const onClose = () => {
    console.log('this is ONCLOSEONCLOSEONCLOSEONCLOSE')
    dispatch(setOpenPortal(false))
    console.log(openPortal);
    navigate(`/category/${category}`);
  }

  return (


    <div className='home--wrapper'>

      <Routes>

        <Route path="/oneRecipe/:id" element={
          <>
            <OneRecipeCardCategory open={openPortal} onClose={onClose} />
          </>
        } />
      </Routes>

      <div className='home--centerWrapper'>
        <div className='home--title'>
          <h2>{category.charAt(0).toUpperCase() + category.slice(1)} </h2>
          <span className='home-theLine'></span>
        </div>
        <div className='home--cardsFresh'>
          {categoryRecipes.map((recipe, index) =>
            <RecipeCard whereToNav={'category'} key={index} id={recipe.id} recipe1={recipe} onArrow={onArrow} />
          )}
        </div>
      </div>
    </div>

  )
}