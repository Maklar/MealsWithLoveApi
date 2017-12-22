const cors = require("cors");

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

app.listen(port);

console.log("Hello World");