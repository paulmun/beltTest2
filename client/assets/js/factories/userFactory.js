app.factory('userFactory', ['$http', '$cookies', function($http, $cookies){
	var user = {},
		sessionObj,
		userPage = {};

	function UserFactory(){
		this.create = function(user, callback){
			$http.post('/users', user).then(function(returnData){
				console.log(returnData);
				if(returnData.data.errors){
					callback(returnData.data);
				}
				else{
					$cookies.put('sessionObj', returnData.data._id);
					sessionObj = $cookies.get('sessionObj');
					console.log(sessionObj);
					console.log(user);
					user = returnData.data;
					callback(user);				
				}
			});
		}

		this.fetch = function(id, callback){
			$http.get('/users/all/'+id).then(function(returnData){
				console.log(returnData);
				if(returnData.data.errors){
					callback(returnData.data);
				}
				callback(returnData.data)
			});
		}

		this.syncPage = function(callback){
			callback(userPage);
		}

		this.set = function(id, callback){
			$http.get('/users/'+id).then(function(returnData){
				userPage = returnData.data;
				console.log(userPage);
				callback(returnData);
			})
		}

		this.cookieJar = {
			sync: function(callback){
				if(sessionObj){
					console.log('fetching')
					$http.get('/users/'+sessionObj).then(function(returnedData){
						user = returnedData.data;
						console.log(user);
						callback(user);
					})
				}
				else if(!sessionObj && user){
					user = {};
				}
			},
			check: function(){
				if(sessionObj){
					return true;
				}
				else if($cookies.get('sessionObj')){
					sessionObj = $cookies.get('sessionObj');
					return true;
				}
				else{
					user = {};
					return false;
				}
			},
			clear: function(){
				$cookies.remove('sessionObj');
				sessionObj = '';
				user = {};
			}
		}
	}

	return new UserFactory();
}]);
		
		