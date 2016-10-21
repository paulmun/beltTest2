var mongoose = require('mongoose'),
	User = mongoose.model('User');

function userController(){

	this.create = function(req, res){
		var user = new User({name: req.body.name});
		user.save(function(err, data){
			if(err && err.errors.name.kind == 'user defined'){
				User.findOne({name: req.body.name}, function(err, user){
						console.log(user);
						if(err)res.json(err);
						else{
						res.json(user);
						}
					}
				);
			}	
			else if(err){
				console.log(err);
				res.json(err);
			}
			else{
				res.json(data);
			}
		});
	}

	this.show = function(req, res){
		User.findOne({_id: req.params.id})
		.populate({
			path: 'buckets',
			model: 'Bucket',
			populate: {
				path: 'tagged',
				model: 'User'
			}
		})
		.exec(function(err, user){
			if(err)res.json(err);
			else{
				res.json(user);
			}
		})
	}

	this.all = function(req, res){
		console.log(req.params.id);
		User.find()
		.where('_id').ne(req.params.id)
		.exec(function(err, users){
			if(err)res.json(err);
			res.json(users);
		})
	}

}

module.exports = new userController();