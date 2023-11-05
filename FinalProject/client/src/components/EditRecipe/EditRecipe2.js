
import React, { useEffect, useState } from 'react'
import './editRecipe.css'
import image from '../../assets/pizzaImg.jpg'
import backImage from '../../assets/icon_back_white.svg'

import { useNavigate, useParams } from "react-router-dom";



export const EditRecipe = () => {

    let { recipeId } = useParams();
    const [oneRecipe, setOneRecipe] = useState({});
     const navigate = useNavigate();
    const goBackToList = () => {
        navigate("/myrecipes")
    }

    useEffect( () => {
        (async () => {
            try {
                const response = await fetch(`/api/v1/recipes/${recipeId}`,
                    {
                        method: 'get',
                        headers: {
                            "Authorization": 'Bearer ' + localStorage.getItem("token")
                        }
                    });
                    let rez = await response.json();
                    setOneRecipe(rez[0]);
                    console.log(rez[0])
            } catch (error) {
                console.log(error)
            }
        })();
    }, []);

    return (
        <div className='edit__overWrapper'>
            <div className='edit__wrapper'>
                <div className='edit__title'>
                    <h1>{recipeId}</h1>
                    <h2>My Recipes</h2>
                    <span className='edit__theLine'></span>
                    <div onClick={goBackToList} className='edit--backArrow'>
                        <img src={backImage} alt="" />
                    </div>
                </div>
                <div className='edit--content'>
                    <div className='edit--recipeImg'>
                        <label htmlFor="recipeImg">Recipe Image</label>
                        <img src={oneRecipe.imgLink} alt="recipeImg" />
                        <button>UPLOAD IMAGE</button>
                    </div>
                    <div className='edit--recipeInfo'>
                        <label htmlFor="recipeName">Recipe Title</label>
                        <input id='recipeName' type="text" />
                        <div className='edit--recipeThreeBrackets'>
                            <div className='edit--container'>
                                <label htmlFor="edit--recipeCategory">Category</label>
                                <select id='edit--recipeCategory' type="text" />
                            </div>
                            <div className='edit--container'>
                                <label htmlFor="edit--prepTime">Preparation Time</label>
                                <input id='edit--prepTime' type="Number" />
                            </div>
                            <div className='edit--container'>
                                <label htmlFor="edit--NoPeople">No. People</label>
                                <input id='edit--NoPeople' type="Number" />
                            </div>
                        </div>
                        <label htmlFor="edit--recipeDescription">Short Description</label>
                        <textarea rows={4} id='edit--recipeDescription' 
                                placeholder='There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable. If you are going to use a passage'/>
                        <button className='edit--saveButton'>SAVE</button>
                    </div>
                    <div className='edit--recipeFullText'>
                        <label htmlFor="edit--recipeFullText">Recipe</label>
                        <textarea type="text" id='edit--recipeFullText' rows={15}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
