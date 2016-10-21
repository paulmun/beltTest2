'use strict';

// simple express server
var express = require('express'),
	app = express(),
	router = express.Router(),
	path = require('path'),
	bodyParser = require('body-parser');
	
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./bower_components")));
app.use(express.static(path.join(__dirname, "./client/")));
app.set('views', __dirname + './client/partials'); 
app.set('view engine', 'ejs');


//routes
require('./server/config/mongoose.js');

var routes_setter = require('./server/config/routes.js');

routes_setter(app);

var server = app.listen(5000); 
