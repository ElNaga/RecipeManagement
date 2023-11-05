import './LoggedIn.css'
import { useSelector, useDispatch } from 'react-redux'
import { setLogin } from '../../slices/loggedInSlice'
import { Link, useNavigate } from 'react-router-dom';


export const LoggedInButtons = () => {

    let loggedIn = useSelector(state => state.loggedIn.loggedIn);
    let dispatch = useDispatch();

    let navigate = useNavigate();

    const logMeOut = () => {
        console.log('this is logout')
        localStorage.removeItem('token');
        dispatch(setLogin( false ))
        navigate('/')
        console.log("this is state of login", loggedIn)
    }

    return (
        <div className="navbar--logButtons">
            <ul>
                <li ><Link to="/myrecipes" style={{ textDecoration: 'none' }} className="Navbar--MyRecipesButton LoggedInButton">MY RECIPES</Link></li>
                <li className="Black--Dot"></li>
                <li><Link to="/myprofile" style={{ textDecoration: 'none' }} className="Navbar--MyProfileButton LoggedInButton">MY PROFILE</Link></li>
                <li className="Black--Dot"></li>
                <li className="Navbar--LogOutButton LoggedInButton"
                    onClick={logMeOut}
                >LOG OUT</li>
            </ul>
        </div>
    )
}