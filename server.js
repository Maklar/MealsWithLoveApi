const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const cors = require("cors");

var express = require("express"),
    app = express(),
    port = process.env.PORT || 3001,
    mongoose = require('mongoose'),
    user = require('./api/models/usermodel'),
    request = require('./api/models/requestmodel'),
    bodyParser = require('body-parser');

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://faithcountrychapel.auth0.com/.well-known/jwks.json"
    }),
    audience: process.env.AUTH0_AUDIENCE,
    issuer: "https://faithcountrychapel.auth0.com/",
    algorithms: ['RS256']
});

app.use(jwtCheck);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mealswithlovedb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var userRoutes = require('./api/routes/userroutes');
userRoutes(app);

var requestRoutes = require('./api/routes/requestroutes');
requestRoutes(app);

app.listen(port);
