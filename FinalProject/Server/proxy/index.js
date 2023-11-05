
const config = require("../../pkg/config");
const express = require('express');
const proxy = require('express-http-proxy'); 

const app = express();

app.use('/uploads',express.static(`${__dirname}/../../uploads/`));

app.use(
    '/api/v1/storage',
    proxy(
        'http://127.0.0.1:10001',
        {
            proxyReqPathResolver: (req) => `http://127.0.0.1:10001/api/v1/storage${req.url}`,
            limit: '5mb'
        }
    )
);

app.use(
'/api/v1/auth',
    proxy(
        'http://127.0.0.1:10002',
        {
            proxyReqPathResolver: (req) => `http://127.0.0.1:10001/api/v1/auth${req.url}`
        }
    )
);

app.use(
'/api/v1/recipes',
    proxy(
        'http://127.0.0.1:10003',
        {
            proxyReqPathResolver: (req) => `http://127.0.0.1:10001/api/v1/recipes${req.url}`
        }
    )
);

app.use(
'/api/v1/proxy',
    proxy(
        'http://127.0.0.1:10000',
        {
            proxyReqPathResolver: (req) => `http://127.0.0.1:10001/api/v1/proxy${req.url}`
        }
    )
);





const PORT = process.env.PORT || config.get("services").proxy.port;

// PRODUCTION / PRODUCTION / PRODUCTION / PRODUCTION / PRODUCTION / PRODUCTION / PRODUCTION / PRODUCTION / PRODUCTION / PRODUCTION / PRODUCTION /

// app.use(
// '/',
//     express.static(`${__dirname}/../../client/build`)
// );

// app.listen(PORT, "0.0.0.0", err => {
//     if (err) {
//         return console.log(err);
//     }
//     console.log(`[Proxy] service succesfully started on port ${PORT}`);
// })

// DEVELOPEMENT / DEVELOPEMENT / DEVELOPEMENT / DEVELOPEMENT / DEVELOPEMENT / DEVELOPEMENT / DEVELOPEMENT / DEVELOPEMENT / DEVELOPEMENT / DEVELOPEMENT

app.use(
'/',
    proxy(
        'http://127.0.0.1:3000',
        {
            proxyReqPathResolver: (req) => `http://127.0.0.1:3000${req.url}`
        }
    )
);

app.listen(PORT, err => {
    if (err) {
        return console.log(err);
    }
    console.log(`[Proxy] service succesfully started on port ${PORT}`);
})