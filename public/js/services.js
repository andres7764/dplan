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
 	 	  	console.log(res);
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
			configMap: [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#6195a0"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#e7e5e3"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
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
                "color": "#e6f3d6"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-100"
            },
            {
                "lightness": 45
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#e3d6c7"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text",
        "stylers": [
            {
                "color": "#4e4e4e"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f4f4f4"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#787878"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#eaf6f8"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#eaf6f8"
            }
        ]
    }
],
			paintRoute: function(lat,lng,mapa){
			var directionsService, directionsDisplay;
				directionsService = new google.maps.DirectionsService();
          		directionsDisplay = new google.maps.DirectionsRenderer();
            var init = new google.maps.LatLng(lat, lng);
            var destin = new google.maps.LatLng($rootScope.activities.locationUser.latitude,$rootScope.activities.locationUser.longitude);
            var request = {
               origin: init,
               destination: destin,
               travelMode: google.maps.DirectionsTravelMode['DRIVING'],
               unitSystem: google.maps.DirectionsUnitSystem['METRIC'],
               provideRouteAlternatives: false
            };
          directionsDisplay.addListener('directions_changed', function() {
              var myroute = directionsDisplay.getDirections().routes[0];
              $rootScope.activities.importantLocation = myroute.legs[0];
            });
            directionsService.route(request, function(response, status) {
              if (status == google.maps.DirectionsStatus.OK) {
                  directionsDisplay.setMap(mapa);
                  document.getElementById("panel_rutaF").innerHTML = "";
                  directionsDisplay.setPanel($("#panel_rutaF").get(0));
                  directionsDisplay.setDirections(response);
              }
            });
			}
			
		}
	})
})();