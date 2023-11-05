
import React, { useEffect, useState } from 'react'
import './editRecipe.css'
// import image from '../../assets/pizzaImg.jpg'
import backImage from '../../assets/icon_back_white.svg'

import { useNavigate, useParams } from "react-router-dom";



export const EditRecipe = () => {

    let { recipeId } = useParams();
    const [recipeData, setRecipeData] = useState({});
     const navigate = useNavigate();
    const goBackToList = () => {
        navigate("/myrecipes")
    }

    const dataChange = (e) => {
        setRecipeData({
            ...recipeData,
            [e.target.name]: e.target.value
        })
    };

    //------------------------------//
    //   HERE IS THE PICTURE HANDLER //
    //------------------------------//

    const [selectedFile, setSelectedFile] = useState(null);


    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    let [initial, setInitial] = useState(true)

    const handleSubmission = async () => {

        try {
            const slika = new FormData();

            slika.append('slika', selectedFile, selectedFile.name);

            const response = await fetch(
                'http://localhost:10000/api/v1/storage',
                {
                    method: 'POST',
                    body: slika,
                    headers: {
                        "Authorization": 'Bearer ' + localStorage.getItem("token")
                    }
                }
            );
            let pictureName = await response.json();
            console.log('this is picture name', pictureName.fileLocation);
            setRecipeData({
                ...recipeData,
                imgLink: pictureName.fileLocation
            })
            return pictureName
        } catch (error) {
           throw error;
        }
    };

    useEffect( () => {
        (async () => {
            try {
                if (initial){
                    setInitial(false)
                    console.log('ne mrdam')
                } else {
                    console.log('this is render')
                    handleSubmission();
                }
            } catch (err) {
                console.log(err)
            }
        }
        )();}, [selectedFile]);




    const addRecipeToDB = async () => {
        console.log('Trying to add recipe to DB!!!',recipeData);

        try {
            let response = await fetch(`/api/v1/recipes/id/${recipeId}`, 
            {
                method: 'put',
                body: JSON.stringify(recipeData),
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer ' + localStorage.getItem("token")
                }
            }
        );
        if (response.ok) {
            routeChangeMyRecipes()
        }
        } catch (err) {
            console.log(err);
        }
    };

    const routeChangeMyRecipes = () =>{ 
        let path = `/myrecipes`; 
        navigate(path);
      }

    //------------------------------//
    //   here is getting the recepies from autror //
    //------------------------------//

    const options = ['Breakfast', 'Brunch', 'Lunch', 'Dinner'];

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
                    setRecipeData(rez[0]);
                    console.log(rez[0])
            } catch (error) {
                console.log(error)
            }
        })();
    }, [recipeId]);

    return (
        <div className='add__overWrapper'>
            <div className='add__wrapper'>
                <div className='add__title'>
                    <h2>Edit Recipe</h2>
                    <span className='add__theLine'></span>
                    <div onClick={goBackToList} className='add--backArrow'>
                        <img src={backImage} alt="" />
                    </div>
                </div>
                <div className='add--content'>
                    <div className='add--recipeImg'>
                        <label htmlFor="recipeImg">Recipe Image</label>
                        <img src={recipeData.imgLink} alt="recipeImg" />

                        <label htmlFor="upload-photo" className='add--recipeImgButton'>UPLOAD IMAGE</label>
                        <input id='upload-photo' type="file"  onChange={changeHandler}/>

                    </div>
                    <div className='add--recipeInfo'>
                        <label htmlFor="recipeName">Recipe Title</label>
                        <input id='recipeName' type="text" name='title' value={recipeData.title} onChange={dataChange}/>
                        <div className='add--recipeThreeBrackets'>
                            <div className='add--container'>
                                <label htmlFor="add--recipeCategory">Category</label>
                                <select id='add--recipeCategory' type="text" name='category' value={recipeData.category} onChange={dataChange} >
                                    <option>Select category</option>
                                    {options.map((option, index) => {
                                        return <option key={index} >
                                            {option}
                                        </option>
                                    })}
                                    </select>
                            </div>
                            <div className='add--container'>
                                <label htmlFor="add--prepTime" >Preparation Time</label>
                                <input id='add--prepTime' type="Number" name='preparationTime' value={recipeData.preparationTime} onChange={dataChange} />
                            </div>
                            <div className='add--container'>
                                <label htmlFor="add--NoPeople">No. People</label>
                                <input id='add--NoPeople' type="Number" name='numPeople' value={recipeData.numPeople} onChange={dataChange}/>
                            </div>
                        </div>
                        <label htmlFor="add--recipeDescription">Short Description</label>
                        <textarea rows={4} id='add--recipeDescription' 
                                placeholder='There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don’t look even slightly believable. If you are going to use a passage'
                                name='shortDesc' value={recipeData.shortDesc} onChange={dataChange}
                                />
                        <button onClick={addRecipeToDB} className='add--saveButton'>SAVE</button>
                    </div>
                    <div className='add--recipeFullText'>
                        <label htmlFor="add--recipeFullText">Recipe</label>

                        <textarea type="text" id='add--recipeFullText' rows={15} name='recipe' value={recipeData.recipe} onChange={dataChange}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
