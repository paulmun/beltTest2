var mongoose = require('mongoose'),
	Bucket = mongoose.model('Bucket'),
	User = mongoose.model('User');

function bucketController(){

	this.create = function(req, res){
		console.log(req.body);
		var bucket = new Bucket(req.body);
		console.log(bucket);
		bucket.save(function(err, bucket){
			if(err)res.json(err);
			else if(req.body.tagged){
				User.findById(req.body.tagged, function(err, user){
					if(err)res.json(err);
					else{
						user.buckets.push(bucket._id);
						user.save(function(err){
							if(err)res.json(err);
							else{
								User.findById(req.body.user, function(err, user){
									if(err)res.json(err);
									else{
										user.buckets.push(bucket._id);
										user.save(function(err, user){
											if(err)res.json(err);
											res.json(user);
										});
									}
								});
							}
						});
					}
				});
			}
			else{
				User.findById(req.body.user, function(err, user){
					if(err)res.json(err);
					else{
						user.buckets.push(bucket._id);
						user.save(function(err, user){
							if(err)res.json(err);
							res.json(user);
						});
					}
				});
			}
			
		});
	}

	this.show = function(req, res){
		Bucket.findOne({_id: req.params.id}, function(err, user){
			if(err)res.json(err);
			else{
				res.json(user);
			}
		})
	}

	this.checker = function(req, res){
		Bucket.findById(req.params.id, function(err, bucket){
			if(err)res.json(err);
			if(bucket.checked == true)bucket.checked = false;
			else{
				bucket.checked = true;
			}
			bucket.save(function(err, bucket){
				if(err)res.json(err);
				res.json(bucket);
			});
		});
	}

}

module.exports = new bucketController();