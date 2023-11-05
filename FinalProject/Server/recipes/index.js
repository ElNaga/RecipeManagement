const config = require('../../pkg/config')
const express = require('express');
const db = require("../../pkg/db")
const {expressjwt: jwt} = require('express-jwt');
const recipes = require('./handlers/recipes')

db.init(); // initialize connection to DB

const api = express();
api.use(express.json()); // use json files in the api??

// 3. api get recipieByDateOfCreation
api.get ('/api/v1/recipes', recipes.recipesByDate);

// 4. api get recipeByFavorites
api.get ('/api/v1/recipes/popular', recipes.recipesByFave);
// 5. api get recipeByCategory
api.get ('/api/v1/recipes/by-category/:category', recipes.recipesByCategory);
// 7. api get 1 recipe
api.get ('/api/v1/recipes/:id', recipes.recipesOne);

api.use(jwt({
    algorithms: ['HS256'],
    secret: config.get('security').jwt_secret
}).unless({
//     // path not needed for authetication
    path: [
// 3. api get recipieByDateOfCreation
        "/api/v1/recipes"
// 4. api get recipeByFavorites
        // '/api/v1/recipes/popular',
// 5. api get recipeByCategory
        // '/api/v1/recipes/:category'
    ]
}))

// 1. api Create recipe
api.post ('/api/v1/recipes', recipes.createRecipe);
// 2. api Update recipie
api.put ('/api/v1/recipes/id/:id', recipes.updateRecipe);


// 6. api get recipeByCategory
api.get ('/api/v1/recipes/author/:author', recipes.recipesByAuthor);

// 8. api remove recipe
api.delete ('/api/v1/recipes/:id', recipes.deleteOne);

const PORT = process.env.PORT || config.get("services").recipes.port;

api.listen( PORT, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log(`Service [recipes] started on port ${PORT}`)
} );