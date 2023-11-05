
import React, { useEffect, useState, useRef } from 'react'
import './addRecipe.css'
import defaultImage from '../../assets/pizzaImg.jpg'
import backImage from '../../assets/icon_back_white.svg'

import { useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux'
import { Saved } from '../Saved/Saved';


export const AddRecipe = () => {

    const navigate = useNavigate();
    const goBackToList = () => {
        navigate("/myrecipes")
    }

    const [uid, setUid] = useState('');

    let initData = {
        author_id: '', // from token
        title: '', // from input
        category: undefined, // from input
        preparationTime: '', // from input
        numPeople: 0, // from input
        shortDesc: '', // from input
        recipe: '', // from input
        imgLink: defaultImage, // from UPLOAD IMAGE ------------------------------------------------- is it done?
        numberFavorited: 0 // let it be 0
    }

    const [recipeData, setRecipeData] = useState(initData);

    const dataChange = (e) => {
        setRecipeData({
            ...recipeData,
            [e.target.name]: e.target.value
        })
    }
    
    useEffect( () => {
        (async () => {
            try {            
                const response = await fetch ('/api/v1/auth/validate-token',
                {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": 'Bearer ' + localStorage.getItem("token")
                    }
                });
                let user = await response.json();
                console.log('this is user', user);
                // setUid(user.uid)
                setRecipeData({
                    ...recipeData,
                    author_id: user.uid
                }) 
                return user;
    
            } catch (err) {
                 console.log(err);
            }
        })();
    },[] );

    //------------------------------//
    //   HERE IS THE PICTURE HANDLER //
    //------------------------------//

    const [selectedFile, setSelectedFile] = useState(null);


    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    let [initial, setInitial] = useState(true)

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


    const routeChangeMyRecipes = () =>{ 
        setIsAlertVisible(true)
        setTimeout(() => {
            setIsAlertVisible(false);
            console.log('when will this appear')
            let path = `/myrecipes`; 
            navigate(path);
        }, 800);
      }


      const [ isAlertVisible, setIsAlertVisible ] = useState(false);

    const addRecipeToDB = async () => {
        console.log(recipeData);

        try {
            console.log('am i here try?')
            let response = await fetch(`/api/v1/recipes`,
                {
                    method: 'post',
                    body: JSON.stringify(recipeData),
                    headers: {
                        'Content-Type': 'application/json',
                        "Authorization": 'Bearer ' + localStorage.getItem("token")
                    }
                }
            );
            if (response.ok) {
                routeChangeMyRecipes()
            }else {
                setShowBadInfo(true)
                console.log('am i here?')
            }
        } catch (err) {
            console.log(err, 'list this');
        }
    };

    const [showBadInfo, setShowBadInfo] = useState(false)

    const options = ['Breakfast', 'Brunch', 'Lunch', 'Dinner'];

    return (
        <div className='add__overWrapper'>
            <div className='add__wrapper'>

                {isAlertVisible ? <Saved/> : null}

                <div className='add__title'>
                    <h2>Add Recipe</h2>
                    <span className='add__theLine'></span>
                    <div onClick={goBackToList} className='add--backArrow'>
                        <img src={backImage} alt="" />
                    </div>
                </div>
                {showBadInfo ? <div style={{color: "red", textDecoration: "underline"}}>
                        Please add the missing information in the fields bellow!
                        <br /><br />
                    </div> : null }
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
                                placeholder='Description...'
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
