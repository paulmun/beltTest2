app.controller('userController', ['$scope', '$location', '$routeParams', 'userFactory', 'bucketFactory', function($scope, $location, $routeParams, userFactory, bucketFactory){

	if(!userFactory.cookieJar.check()){
		console.log(true);
		$location.url('/');
	}

	else{
		userFactory.cookieJar.sync(function(data){
			console.log('grabbing');
			$scope.user = data;
			console.log($scope.user);
			console.log($routeParams.id)
			userFactory.syncPage(function(data){
				if(!data.name){
					userFactory.set($routeParams.id, function(data){
						if(data.errors)$scope.errors = data.errors;
						userFactory.syncPage(function(data){
							$scope.userPage = data;
							console.log($scope.userPage);
						});

					});
				}
				else{
					$scope.userPage = data;
					console.log($scope.userPage);
				}
			});
		});
	}

	$scope.user = {};
	$scope.userPage = {};
	$scope.topics = [];
	$scope.topic = {};

	$scope.checker = function(id){
		bucketFactory.checker(id, function(){
			userFactory.cookieJar.sync(function(data){
					$scope.user = data;
				});
		});
	}

	$scope.logout = function(){
		userFactory.cookieJar.clear();
		if(!userFactory.cookieJar.check()){
		$location.url('/');
		}
	}
}]);