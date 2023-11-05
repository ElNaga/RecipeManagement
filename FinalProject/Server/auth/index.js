
const config = require('../../pkg/config'); //this was adapted
const express = require('express');
const { expressjwt: jwt } = require('express-jwt');
const auth = require('./handlers/auth');
const db = require('../../pkg/db'); //this was adapted

db.init();

const api = express();

api.use(express.json());
api.use(jwt({
    algorithms: ['HS256'],
    secret: config.get('security').jwt_secret
}).unless({
    path: [
        '/api/v1/auth/create-account',
        '/api/v1/auth/login',
        '/api/v1/auth/forgot-password',
        '/api/v1/auth/reset-password'
    ]
}));


api.post('/api/v1/auth/create-account', auth.create);
api.post('/api/v1/auth/login', auth.login);

api.get('/api/v1/auth/user', auth.getUser);

api.post('/api/v1/auth/forgot-password', auth.forgotPassword);
api.post('/api/v1/auth/reset-password', auth.resetPassword);

api.post('/api/v1/auth/validate-token', auth.validate);

api.put('/api/v1/auth/user-update', auth.updateUserInfo);

api.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).send("Invalid token...");
    } else {
        next(err);
    }
});

// api.listen(config.get('service').port, err => {
//     if(err) {
//         return console.log(err);
//     }
//     console.log(`Service auth successfully started on port ${config.get('service').port}`);
// });

api.listen(config.get('services').auth.port, err => {
    if (err) {
        return console.log(err);
    }
    console.log(`Service [auth] successfully started on port ${config.get('services').auth.port}`);
});

// encrypt
// 2 + 3 = 5

// 2 plain text
//     + algo
// 3 encryptioin key
// 5 cypher

// decrypt
// 5 - 3 = 2

// -----------

// data hashing

// 2 ? n = 8
// 2 ? m = 20
// 2 ? o = 1
// ...

// 1. plan text - extremely bad!
// 2. encrypted password - bad!
// 3. hashed passwords - ok
// ...
// 4. 2fa
// 5. biometrics
// 6. physical cert / key