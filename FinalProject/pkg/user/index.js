const mongoose = require('mongoose');

const User = mongoose.model(
    'user',
    {
        email: String,
        password: String,
        first_name: String,
        last_name: String,
        imgLink: String,
        date_birth: Date
    },
    'users'
);

const create = async (data) => {
    let u = new User(data);
    return u.save();
};

const getUserByEmail = async (email) => {
    return User.findOne({email});
};

const update = async (email, data) => {
    return User.updateOne({email: email}, data);
};

module.exports = {
    create,
    getUserByEmail,
    update
};