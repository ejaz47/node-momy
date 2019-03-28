

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const path = require('path');
const mongoose = require('mongoose');

const config = require('./config');
const app = express();
const auth = require('./app/auth');
const auth_controller = require('./app/auth/auth_controller');
const product = require('./app/product'); // Imports routes for the products

if(process.env.pro){
	config.env = 'pro';
}

//set secret
app.set('Secret', config.secret);

// Set up mongoose connection
mongoose.connect(config.env === 'dev' ? config.mongo.dev.url : config.mongo.dev.url);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Set up Mysql connection
global.connection = mysql.createConnection(config.env === 'dev' ? config.mysql.dev : config.mysql.pro);
connection.connect();
setInterval(function () {
    global.connection.query('SELECT 1');
}, 5000);


//Making /public folder static (/public will be the root of all files inside public)
app.use(express.static(__dirname + '/public'));

// // create a rotating write stream
// var accessLogStream = rfs('access.log', {interval: '1d', path: path.join(__dirname, 'log/non_crash') });
// var withCrashAccessLogStream = rfs('access.log', {interval: '1d', path: path.join(__dirname, 'log/with_crash') });
// // setup the logger
// app.use(morgan('combined', { stream: accessLogStream }));
// app.use(morgan('combined', { stream: withCrashAccessLogStream, immediate: true }));


//Validation middleware
app.use(expressValidator());

//Converting body into json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//CORS related settings
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Using routers from multiple files and folders
app.use('/auth', auth);
app.use('/product', auth_controller.check, product);
// app.use('/pdf', auth_controller.check, pdf);
// app.use('/template', auth_controller.check, template);
// app.use('/printer', auth_controller.check, printer);

let port = 1234;
app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
    console.log('Devlopment Mode ', process.env.dev);
});
