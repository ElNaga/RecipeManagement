const config = require('../../../pkg/config')
const recipes = require('../../../pkg/recpies')
const check = require('../../../pkg/inputCheck')


const createRecipe = async (req, res) => {
    try {
        // data check for category
        // let category = req.body.category
        // console.log(req.body.category)
        console.log(req.auth)
        if (await check.checkStringOfCategory(req.body.category)){
            let r = recipes.create(req.auth.uid,req.body);
            console.log('Recipe saved');
            return res.status(200).send('ok');
        } else {
            console.log('Error with recipe creation');
            return res.status(400).send('Bad Request!');
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
}

const updateRecipe = async (req, res) => {
    console.log('this is update')
    try {
        await recipes.update(req.params.id,req.auth.uid,req.body);
        return res.status(204).send('');
    } catch (err) {
        if (err) {
            console.log(err);
            return res.status(500).send('Internal Server Error!');
        }
    }
}

const recipesByDate = async (req, res) => {
    try {
       let data =  await recipes.getByDate();
       res.status(200).send(data);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
}

const recipesByFave = async (req, res) => {
    try {
        let data =  await recipes.getByFavorited();
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
}

const recipesByCategory = async (req, res) => {
    try {
        let data =  await recipes.getByCategory(req.params.category);
        console.log('this is category');
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
}

const recipesByAuthor = async (req, res) => {
    try {
        let data =  await recipes.getByAuthor(req.params.author);
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
}

const recipesOne = async (req, res) => {
    try {
        let data =  await recipes.getOne(req.params.id);
        res.status(200).send(data);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
}

const deleteOne = async (req, res) => {
    try {
        await recipes.remove(req.params.id, req.auth.uid);
        return res.status(204).send('');
    } catch (err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
}




module.exports = {
    createRecipe,
    updateRecipe,
    recipesByDate,
    recipesByFave,
    recipesByCategory,
    recipesOne,
    recipesByAuthor,
    deleteOne
}
