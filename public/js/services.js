(function(){
	angular.module('services',[])

	.factory('activities', function($http,$q){
		function doGetRequest(URL){
		  var defered = $q.defer();
		  var promise = defered.promise;
		   $http.defaults.headers.post["Content-Type"] = "application/json";
		   $http.get(URL)
		   .then(function(result){
        	  defered.resolve(result);
      	   })
      	   .catch(function(err){
      	   	 deferred.reject(err);
      	   })
      	   return promise;
		}
		function doPostRequest(URL,params){
		  var defered = $q.defer();
		  var promise = defered.promise;
		   $http.defaults.headers.post["Content-Type"] = "application/json";
		   $http.post(URL,params)
		   .then(function(result){
        	  defered.resolve(result);
      	   })
      	   .catch(function(err){
      	   	 deferred.reject(err);
      	   })
      	   return promise;
		}
		function doGetReferals(URL,value){
		  var defered = $q.defer();
		  var promise = defered.promise;
		   $http.defaults.headers.post["Content-Type"] = "application/json";
		   $http.post(URL,value)
		   .then(function(result){
        	  defered.resolve(result.data);
      	   })
      	   .catch(function(err){
      	   	 deferred.reject(err);
      	   })
      	   return promise;	
		}
		return {
			doRequest: function(data,callback){
		      doGetRequest(data)
		      .then(function(res){
		      	callback(res);
		      });
			},
			doPostRequest: function(data,params,callback){
		      doPostRequest(data,params)
		      .then(function(res){
		      	callback(res);
		      });
			},
			getReferals: function(URL,value,callback){
			  doGetReferals(URL,value)
			  .then(function(res){
			    callback(res);
			  });
			}
		}
	})

	.factory('payment',function($http,$q){
		var urlapp = "https://api.secure.payco.co/validation/v1/reference/";
	 function getEPaycoTransaction(idEp){
	   var defered = $q.defer();
	   var promise = defered.promise;
		$http.defaults.headers.post["Content-Type"] = "application/json";
		$http.get(urlapp+idEp)
		.then(function(result){
          defered.resolve(result);
      	})
      	.catch(function(err){
      	 deferred.reject(err);
      	})
      	return promise;
 	 }
 	 function saveReserv(data){
 	 	$http.post('/saveBooking',data)
 	 	.then(function(res){
 	 	  console.log(res);
 	 	})
 	 }
 	 return {
 	 	getInfoTransaction: function(id,callback){
 	 	  getEPaycoTransaction(id)
 	 	  .then(function(res){
 	 	  	callback(res.data.data.original);
 	 	  })
 	 	},
 	 	createBooking: function(data){
 	 	  saveReserv(data);
 	 	}
 	 }
	})

	.factory('helpers',function($rootScope) {
		function createUrl(id,title){
		  var letra = title.replace(/[^a-zA-Z 0-9.]+/g,'');
	       	  letra = letra.replace(/ /g,'+');
    	  $rootScope.urlFinal = '/catalogo/'+letra+"_"+id;
		}
		return {
			createUrl: function(id,title,callback){
			 createUrl(id,title);
			 callback();
			 //setTimeout(function(){ callback(); },500);
			}			
		}
	})
})();