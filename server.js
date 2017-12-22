const fs = require("fs");
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('api.key', 'utf8');
var certificate = fs.readFileSync('api.crt', 'utf8');
const cors = require("cors");

var credentials = {key: privateKey, cert: certificate};
var express = require("express"),
    app = express(),
    port = process.env.PORT || 3001,
    mongoose = require('mongoose'),
    user = require('./api/models/usermodel'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/mealswithlovedb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var routes = require('./api/routes/userroutes');
routes(app);

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(port);
