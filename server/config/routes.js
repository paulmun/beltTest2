var userController = require('../controllers/users.js'),
	bucketController = require('../controllers/buckets.js');

module.exports = function(app){

	app.post('/users', function(req, res){
		userController.create(req, res);
	});
	app.get('/users/:id', function(req,res){
		userController.show(req,res);
	});
	app.get('/users/all/:id', function(req, res){
		userController.all(req, res);
	});
	app.post('/buckets', function(req, res){
		bucketController.create(req, res);
	});
	app.put('/bucket/:id', function(req, res){
		bucketController.checker(req, res);
	});

}

