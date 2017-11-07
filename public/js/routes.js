(function(){
 var cviaja = angular.module('routes',["ngRoute"]);

    cviaja.config(function($routeProvider) {
      $routeProvider.
        when('/', {
          templateUrl: 'templates/home.html',
          controller: 'activitiesCtrl'
        })
        .when('/catalogo/', {
          templateUrl: 'templates/catalog.html',
          controller: 'activitiesCtrl'
        })
        .when('/blog/', {
          templateUrl: 'templates/blog.html',
          controller: 'blogCtrl'
        })
        .when('/catalogo/:activity', {
          templateUrl: 'templates/activity.html',
          controller: 'activityCtrl'
        })
        .when('/checkout/', {
          templateUrl: 'templates/checkout.html',
          controller: 'checkoutCtrl'
        })
        .when('/response/', {
          templateUrl: 'templates/response.html',
          controller: 'responseCtrl'
        })
        .when('/arma-tu-plan/',{
          templateUrl: 'templates/customPlan.html',
          controller: 'activitiesCtrl'
        })
        .when('/ver-mapa/',{
          templateUrl: 'templates/map.html',
          controller: 'mapCtrl'
        })
/*        .when('/ver-mapa/',{
          templateUrl: 'templates/map.html',
          controller: 'mapCtrl'
        })
        .when('/ver-mapa/',{
          templateUrl: 'templates/map.html',
          controller: 'mapCtrl'
        })                
*/        
        .otherwise({ redirectTo : "/" });
    });
    //$locationProvider.html5Mode(true);
})()