import './myProfile.css'
import React, { useEffect, useState } from 'react'
import defaultAvatar from '../../assets/defaultAvatar.png'

import {useSelector, useDispatch} from 'react-redux'
// import {setLogin} from '../../slices/loggedInSlice'

export const MyProfile = () => {

    const initData = {
        // email: '',
        // password: '',
        // password2: '',
        first_name: '',
        imgLink: undefined,
        last_name: '',
        date_birth: ''
    }

    const [saveData, setSaveData] = useState(initData);

    console.log('this is save data', saveData)

    useEffect ( () => {
        (async () => {
            try {            
                const response = await fetch ('/api/v1/auth/user',
                {
                    method: 'get',
                    headers: {
                        "Authorization": 'Bearer ' + localStorage.getItem("token")
                    }
                });
                let user = await response.json();
                console.log('this is user', user);
                console.log('this is user img', user.imgLink);
                // setUid(user.uid)
                let aDateString =user.date_birth
                console.log('this is type',typeof(aDateString))
                console.log(aDateString);
                let newDateString = aDateString.slice(0,10);
                setSaveData({
                    ...saveData,
                    first_name: user.first_name,
                    email: user.email,
                    last_name: user.last_name,
                    date_birth: newDateString,
                    imgLink: user.imgLink
                });
                return user;
    
            } catch (err) {
                 console.log(err);
            }
        })();
    }, [] )

    const dataChange = (e) => {
        console.log(saveData)
        setSaveData({
            ...saveData,
            [e.target.name]: e.target.value
        })
    }

    const loggedIn = useSelector( state => state.loggedIn.loggedIn);
    const dispatch = useDispatch();

    const saveInfo = async () => {
        try {
            console.log('this is what im trying to save',saveData)
            let response = await fetch(`/api/v1/auth/user-update`, 
            {
                method: 'put',
                body: JSON.stringify(saveData),
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer ' + localStorage.getItem("token")
                }
            }
        );
        let rez = await response.text();
        console.log(rez);
        return rez;
        } catch (err) {
            console.log(err)
        }
    };

    //******************* */
    //Handle image upload//
    //***************** */
    const [selectedFile, setSelectedFile] = useState(undefined);

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
            setSaveData({
                ...saveData,
                imgLink: pictureName.fileLocation
            })
            return pictureName
        } catch (error) {
           throw error;
        }
    };

    return (
        <div className='myprofile__overWrapper'>
            <div className='myprofile__wrapper'>
                <div className='myprofile__title'>
                    <h2>My Profile</h2>
                    <span className='myprofile__theLine'></span>
                </div>
                <div className='myprofile__avatar'>
                    <div className='myprofile__avatar__img'>
                        { saveData.imgLink ?  <img src={saveData.imgLink} alt="recipeImg" /> :  <img src={defaultAvatar} alt="recipeImg" />}
                    {/* <img src={saveData.imgLink} alt="recipeImg" /> */}

                    <label htmlFor="upload-photo" className='add--recipeImgButton'>CHANGE AVATAR</label>
                    <input id='upload-photo' type="file"  onChange={changeHandler}/>
                    </div>
                    <div className='myprofile__inputs'>
                        <div className='myprofile__inputsLeft'>
                            <label className='myprofile__label' htmlFor="first_name">First name</label>
                            <input className='myprofile__input' type="text" name='first_name' value={saveData.first_name} onChange={dataChange}/>
                            {/* <label className='myprofile__label' htmlFor="Email">Email</label>
                            <input className='myprofile__input' type="email" name='email' value={saveData.email} onChange={dataChange}/> */}
                            <label className='myprofile__label' htmlFor="last_name">Last name</label>
                            <input className='myprofile__input' type="text" name='last_name' value={saveData.last_name} onChange={dataChange}/>
                            <label className='myprofile__label' htmlFor="date">Date of birth</label>
                            <input className='myprofile__input' type="date" name='date_birth' value={saveData.date_birth} onChange={dataChange}/>
                            {/* <label className='myprofile__label' htmlFor="password">Password</label>
                            <input className='myprofile__input' type="password" name='password' value={saveData.password} /*onChange={dataChange}/> */}
                            <button className='myprofile__button'
                                onClick={saveInfo}
                            >SAVE</button>
                        </div>
                        <div className='myprofile__inputsRight'>

                            {/* <label className='myprofile__label' htmlFor="password2">Retype password</label>
                            <input className='myprofile__input' type="password" name='password2' /*value={saveData.password2} onChange={dataChange}/> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
