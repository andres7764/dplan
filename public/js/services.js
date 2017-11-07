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

	.factory('helpers',function($rootScope,$location) {
		function createUrl(id,title) {
		  var letra = title.replace(/[^a-zA-Z 0-9.]+/g,'');
	       	  letra = letra.replace(/ /g,'+');
    	  $rootScope.urlFinal = '/catalogo/'+letra+"_"+id;
    	  $location.url($rootScope.urlFinal);
		}
		return {
			createUrl: function(id,title){
			 createUrl(id,title);
			},
			configMap: [{
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#ebe3cd"
				      }
				    ]
				  },
				  {
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#523735"
				      }
				    ]
				  },
				  {
				    "elementType": "labels.text.stroke",
				    "stylers": [
				      {
				        "color": "#f5f1e6"
				      }
				    ]
				  },
				  {
				    "featureType": "administrative",
				    "elementType": "geometry.stroke",
				    "stylers": [
				      {
				        "color": "#c9b2a6"
				      }
				    ]
				  },
				  {
				    "featureType": "administrative.country",
				    "stylers": [
				      {
				        "visibility": "simplified"
				      }
				    ]
				  },
				  {
				    "featureType": "administrative.country",
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "visibility": "simplified"
				      }
				    ]
				  },
				  {
				    "featureType": "administrative.land_parcel",
				    "elementType": "geometry.stroke",
				    "stylers": [
				      {
				        "color": "#dcd2be"
				      }
				    ]
				  },
				  {
				    "featureType": "administrative.land_parcel",
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#ae9e90"
				      }
				    ]
				  },
				  {
				    "featureType": "administrative.neighborhood",
				    "stylers": [
				      {
				        "visibility": "off"
				      }
				    ]
				  },
				  {
				    "featureType": "administrative.province",
				    "elementType": "geometry.stroke",
				    "stylers": [
				      {
				        "visibility": "off"
				      }
				    ]
				  },
				  {
				    "featureType": "landscape.natural",
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#dfd2ae"
				      }
				    ]
				  },
				  {
				    "featureType": "poi",
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#dfd2ae"
				      }
				    ]
				  },
				  {
				    "featureType": "poi",
				    "elementType": "labels.text",
				    "stylers": [
				      {
				        "visibility": "off"
				      }
				    ]
				  },
				  {
				    "featureType": "poi",
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#93817c"
				      }
				    ]
				  },
				  {
				    "featureType": "poi.business",
				    "stylers": [
				      {
				        "visibility": "off"
				      }
				    ]
				  },
				  {
				    "featureType": "poi.government",
				    "stylers": [
				      {
				        "visibility": "off"
				      }
				    ]
				  },
				  {
				    "featureType": "poi.medical",
				    "stylers": [
				      {
				        "visibility": "off"
				      }
				    ]
				  },
				  {
				    "featureType": "poi.park",
				    "stylers": [
				      {
				        "visibility": "off"
				      }
				    ]
				  },
				  {
				    "featureType": "poi.park",
				    "elementType": "geometry.fill",
				    "stylers": [
				      {
				        "color": "#a5b076"
				      }
				    ]
				  },
				  {
				    "featureType": "poi.park",
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#447530"
				      }
				    ]
				  },
				  {
				    "featureType": "road",
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#f5f1e6"
				      }
				    ]
				  },
				  {
				    "featureType": "road",
				    "elementType": "labels",
				    "stylers": [
				      {
				        "visibility": "off"
				      }
				    ]
				  },
				  {
				    "featureType": "road",
				    "elementType": "labels.icon",
				    "stylers": [
				      {
				        "visibility": "off"
				      }
				    ]
				  },
				  {
				    "featureType": "road.arterial",
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#fdfcf8"
				      }
				    ]
				  },
				  {
				    "featureType": "road.highway",
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#f8c967"
				      }
				    ]
				  },
				  {
				    "featureType": "road.highway",
				    "elementType": "geometry.stroke",
				    "stylers": [
				      {
				        "color": "#e9bc62"
				      }
				    ]
				  },
				  {
				    "featureType": "road.highway.controlled_access",
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#e98d58"
				      }
				    ]
				  },
				  {
				    "featureType": "road.highway.controlled_access",
				    "elementType": "geometry.stroke",
				    "stylers": [
				      {
				        "color": "#db8555"
				      }
				    ]
				  },
				  {
				    "featureType": "road.local",
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#806b63"
				      }
				    ]
				  },
				  {
				    "featureType": "transit",
				    "stylers": [
				      {
				        "visibility": "off"
				      }
				    ]
				  },
				  {
				    "featureType": "transit.line",
				    "stylers": [
				      {
				        "saturation": 60
				      },
				      {
				        "visibility": "off"
				      }
				    ]
				  },
				  {
				    "featureType": "transit.line",
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#dfd2ae"
				      }
				    ]
				  },
				  {
				    "featureType": "transit.line",
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#8f7d77"
				      }
				    ]
				  },
				  {
				    "featureType": "transit.line",
				    "elementType": "labels.text.stroke",
				    "stylers": [
				      {
				        "color": "#ebe3cd"
				      }
				    ]
				  },
				  {
				    "featureType": "transit.station",
				    "elementType": "geometry",
				    "stylers": [
				      {
				        "color": "#dfd2ae"
				      }
				    ]
				  },
				  {
				    "featureType": "water",
				    "elementType": "geometry.fill",
				    "stylers": [
				      {
				        "color": "#b9d3c2"
				      }
				    ]
				  },
				  {
				    "featureType": "water",
				    "elementType": "labels.text",
				    "stylers": [
				      {
				        "visibility": "off"
				      }
				    ]
				  },
				  {
				    "featureType": "water",
				    "elementType": "labels.text.fill",
				    "stylers": [
				      {
				        "color": "#92998d"
				      }
				    ]
				  }]
		}
	})
})();