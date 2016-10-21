app.controller('dashController', ['$scope', '$location', 'userFactory', 'bucketFactory', function($scope, $location, userFactory, bucketFactory){

	if(!userFactory.cookieJar.check()){
		$location.url('/');
	}

	else{
		userFactory.cookieJar.sync(function(data){
			$scope.user = data;
			$scope.fetchUsers();
			console.log($scope.user.buckets[0])
		});
	}

	$scope.user = {};
	$scope.users = [];
	$scope.errors = {};
	$scope.bucket = {};

	$scope.addBucket = function(){
		$scope.bucket.user = $scope.user._id;
		bucketFactory.create($scope.bucket, function(data){
			console.log(data);
			if(data.errors){
				$scope.errors = data.errors;
			}
			else{
				$scope.bucket = data;	
				userFactory.cookieJar.sync(function(data){
					$scope.user = data;
					$scope.fetchUsers();
				});
			}
			
		});
	}

	$scope.checker = function(id){
		bucketFactory.checker(id, function(){
			userFactory.cookieJar.sync(function(data){
					$scope.user = data;
					$scope.fetchUsers();
				});
		});
	}

	$scope.showUser = function(id){
		userFactory.set(id, function(data){
			if(data.errors)$scope.errors = data.errors;
			$location.url('/user/'+id);
		});
	}

	$scope.fetchUsers = function(){
		userFactory.fetch($scope.user._id, function(data){
			if(data.errors)$scope.errors = data.errors;
			$scope.users = data;
		});
	}

	$scope.logout = function(){
		userFactory.cookieJar.clear();
		if(!userFactory.cookieJar.check()){
		$location.url('/');
		}
	}



}]);