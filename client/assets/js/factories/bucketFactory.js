app.factory('bucketFactory', ['$http', function($http){

	function UserFactory(){
		this.create = function(bucket, callback){
			$http.post('/buckets', bucket).then(function(returnData){
				console.log(returnData);
				if(returnData.data.errors){
					console.log(returnData.data.errors);
					callback(returnData.data);
				}
				else{
					console.log(returnData.data);
					callback(returnData.data);
				}
			});
		}

		this.checker = function(bucket, callback){
			$http.put('/bucket/'+bucket).then(function(returnData){
				if(returnData.data.errors){
					console.log(returnData.data.errors);
				}
				else{
					console.log(returnData.data);
					callback();
				}
			})
		}
	}
	return new UserFactory();
}]);
		
		