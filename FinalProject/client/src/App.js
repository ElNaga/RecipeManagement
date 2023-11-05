import { CreateAccount } from "./components/CreateAccount/CreateAccount";
import { EditRecipe } from "./components/EditRecipe/EditRecipe";
import { AddRecipe } from "./components/AddRecipe/AddRecipe";
import { Footer } from "./components/Footer/Footer";
import { Login } from "./components/Login/Login";
import { MyProfile } from "./components/MyProfile/MyProfile";
import { MyRecipe } from "./components/MyRecipe/MyRecipe";
import { Navbar } from "./components/Navbar/Navbar";
import { RecipeCard } from "./components/RecipeCard/RecipeCard";
import { Home } from "./components/Home/Home";
import { Category } from "./components/Category/Category";

import { useSelector, useDispatch } from 'react-redux'
import { setLogin } from './slices/loggedInSlice'

// Router
import { Routes, Route, useNavigate } from 'react-router-dom'

import './App.css'
import { useEffect } from "react";
import { OneRecipeCard } from "./components/OneRecipeCard/OneRecipeCard";
import PrivateRoute from "./components/PrivateRoutes/PrivateRoute";

function App() {

  let loggedIn = useSelector(state => state.loggedIn.loggedIn);
  const dispatch = useDispatch();

  const navigate = useNavigate()

  useEffect(() => {

    let existingToken = localStorage.getItem("token");
    if (existingToken) {
      dispatch(setLogin(true))
      console.log("Am i here?", loggedIn)
    }
  }, [])



  return (
    <div className="App">
      <div className="content_wrap">
        <Navbar login={loggedIn} />

        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />

          <Route path="/myprofile" element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
          } />
          <Route path="/myrecipes" element={
            <PrivateRoute>
              <MyRecipe />
            </PrivateRoute>
          } />
          <Route path="/add-recipe" element={
            <PrivateRoute>
              <AddRecipe />
            </PrivateRoute>
          } />
          <Route path="/edit-recipe/:recipeId" element={
            <PrivateRoute>
              <EditRecipe />
            </PrivateRoute>
          } />

          <Route path="/:category" element={<Category />} />


        </Routes>

        <Footer />
      </div>
    </div>
  );
}

export default App;
