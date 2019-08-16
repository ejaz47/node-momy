
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');
const chalk = require('chalk');
const cors = require('cors');
const app = express();
const auth = require('./app/auth');
const auth_controller = require('./app/auth/auth_controller');
const product = require('./app/product'); // Imports routes for the products

/**
 * Load environment variables from .env file.
 */
const dotenv = require('dotenv').config({ path: process.env.pro ? '.env' : '.env.dev' });
const log = require('Debug')('app');

log(process.env.pro ? chalk.red('Production Mode') : chalk.yellow('Development Mode'));

//set secret
app.set('Secret', process.env.SECRET);


/**
 * Set up mongoose connection
 */
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
	log(err);
	log(chalk.red('MongoDB connection error. Please make sure MongoDB is running.'));
	process.exit();
});


/**
 * Set up mysql connection pool
 */
global.connectionPool  = mysql.createPool({
	connectionLimit : 10,
	host            : process.env.MYSQL_HOST,
	user            : process.env.MYSQL_USER,
	password        : process.env.MYSQL_PASSWORD,
	database        : process.env.MYSQL_DATABASE
});

global.connectionPool.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
	if (error){
		log(error);
		log(chalk.red('Mysql connection error. Please make sure Mysql is running.'));
		process.exit();
	}
});


/**
 * log only 4xx and 5xx responses to console
 * log all requests to access.log
 */
app.use(morgan('dev', { skip: (req, res) => res.statusCode < 400 }));
app.use(morgan('common', {stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }) }));


// Converting body into json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Enable Cross Origin Resource Sharing
app.use(cors());

// Making /public folder static (/public will be the root of all files inside public)
app.use(express.static(__dirname + '/public'));

// Validation middleware
app.use(expressValidator());



/**
 * Using routers from multiple files and folders
 */
app.use('/auth', auth);
app.use('/product', auth_controller.check, product);
// app.use('/pdf', auth_controller.check, pdf);
// app.use('/template', auth_controller.check, template);
// app.use('/printer', auth_controller.check, printer);

app.listen(process.env.PORT, () => {
    log(chalk.bold('Server is up and running on ' + process.env.BASE_URL));
});
