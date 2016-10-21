app.controller('indexController', ['$scope', '$location', 'userFactory', function($scope, $location, userFactory){

	if(userFactory.cookieJar.check()){
		$location.url('/dashboard');
	}

	$scope.user = {};
	$scope.errors = {};

	$scope.addUser = function(){
		console.log($scope.user);
		userFactory.create($scope.user, function(data){
			if(data.errors){
				$scope.errors = data.errors;
			}
			else{
				$scope.user = data
				console.log('check');
				$location.url('/dashboard');
			}
		});
	}
}]);