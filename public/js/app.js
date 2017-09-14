var cviaja = angular.module('dplan',["ngRoute","routes","services"]);
   
cviaja.controller('activitiesCtrl',['activities','$scope','$q','$http','$timeout','$window','$location','$rootScope',function(activities,$scope,$q,$http,$timeout,$window,$location,$rootScope){
    document.title = "DPlan, Planes unicos cerca a ti";
  $scope.activities = [];
  $scope.contact = {};
  activities.doRequest('/getActivities',function(res){
    $scope.activities = res.data.activities;
  });
  $scope.irA = function(id,title){
    $rootScope.idSearch = id;
    var letra = title.replace(/[^a-zA-Z 0-9.]+/g,'');
      letra = letra.replace(/ /g,'-');
      $rootScope.urlFinal = '/catalogo/'+letra+"_"+id;
      $location.url('/catalogo/'+letra+"_"+id);
  }
  $scope.subscripbeUser = function(){
    activities.doPostRequest('/saveContact',{'mail': $scope.activities.mail},function(response){
      message("¡Suscripción exitosa!",response.data.token);
      $scope.activities.mail = "";
    })
  }
  $scope.sendNewContact = function(){
    activities.doPostRequest('/saveContact',$scope.contact,function(response){
      message("¡Bienvenido a DPlan!","Ya guardamos tus datos nos pondremos en contacto contigo.");
      $scope.contact = {};
   })
  }
  function message(title,comment){
   swal(title,comment, "success");
  }
}]);


cviaja.controller('activityCtrl', ['activities','$scope','$timeout','$routeParams','$rootScope','$location',function(activities,$scope,$timeout,$routeParams,$rootScope,$location) {
        $rootScope.checkOut = [];
       let a = new Date();
        $scope.validSince = a.getFullYear()+"-"+a.getMonth()+"-"+a.getDate();
       var directionsService,directionsDisplay;
       var activity = ($routeParams.activity.split("_").length === 2 )? $routeParams.activity.split("_") : window.location = "/";
       var idS = (activity[1].length === 24)?activity[1]:window.location = "/";

  activities.doRequest('/getActivity?id='+idS,function(res){
    $rootScope.activity = res.data.activity[0];
    $rootScope.lengthPagerImages = $rootScope.activity.carousel.length;
    $scope.tab = 1;
    $scope.tabs = 1;
    document.title = $rootScope.activity.name;
    initAutocomplete($rootScope.activity.location);
    if ($rootScope.activity.legalInfo !== undefined) {
      $rootScope.activity.legalInfo = $rootScope.activity.legalInfo.split("&");
     for(a=0;a<$rootScope.activity.legalInfo.length;a++ ){
       $rootScope.activity.legalInfo[a].replace("&"," ");
     }
    }
  });
    function initAutocomplete(location) {
        var latLng  = {lat: parseFloat(location.lat), lng: parseFloat(location.lng)};
            $scope.map = new google.maps.Map(document.getElementById('map'), {
              zoom: 14,
              center: latLng
            });
            var marker = new google.maps.Marker({
              position: latLng,
              map: $scope.map
        });

        // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        $scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        $scope.map.addListener('bounds_changed', function() {
          searchBox.setBounds($scope.map.getBounds());
        });
        var markers = [];
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();
          directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer();
          $scope.paintRoute(places[0].geometry.location.lat(),places[0].geometry.location.lng());
        });
    };
        
  $scope.checkCupo = function(index){
    $rootScope.checkOut = [];
    localStorage.setItem("checkOut",null);
    $rootScope.activity.qtyBuyed = document.getElementById('sel1').value;
    $rootScope.activity.dateReserv = document.getElementById('dateR').value;
    $rootScope.activity.total = $rootScope.activity.mount * $rootScope.activity.qtyBuyed;
    localStorage.setItem("checkOut",JSON.stringify($rootScope.activity));
  };

        $scope.reservA = function(value) {
          if($rootScope.activity.dateReserv === undefined || $rootScope.activity.dateReserv === ""){
           swal("error", "Debes elegir una fecha y el número de cupos a comprar", "error");
          }else{
           window.location = '/#!/checkout';
          }
        };
        
        $scope.paintRoute = function(lat,lng) {
          marker = [];
            var init = new google.maps.LatLng(lat, lng);
            var destin = new google.maps.LatLng(parseFloat($scope.activity.location.lat),parseFloat($scope.activity.location.lng));
            var request = {
               origin:      init,
               destination: destin,
               travelMode: google.maps.DirectionsTravelMode['DRIVING'],
               unitSystem: google.maps.DirectionsUnitSystem['METRIC'],
               provideRouteAlternatives: false
            };
          directionsDisplay.addListener('directions_changed', function() {
              var myroute = directionsDisplay.getDirections().routes[0];
              $rootScope.activity.distance = myroute.legs[0].distance.text;
              $rootScope.activity.distanceValue = myroute.legs[0].distance.value / 1000;
            });
            directionsService.route(request, function(response, status) {
              if (status == google.maps.DirectionsStatus.OK) {
                  directionsDisplay.setMap($scope.map);
                  directionsDisplay.setPanel($("#panel_ruta").get(0));
                  directionsDisplay.setDirections(response);
              }
            });
        }
        
        $scope.range = function(min, max, step) {
            step = step || 1;
            var input = [];
            for (var i = min; i <= max; i += step) {
                input.push(i);
            }
            return input;
        };
        
        $scope.openRnt =  function(img){
          swal({
            title: 'Registro Nacional De Turismo',
            html: '<img src="'+img+'" style="width: 100%;height: 280px;">',
            showCancelButton: false
          });
        };

        $scope.contact = {name: "", mail:"" };
        $scope.suscribir =  function(){
          if($scope.contact.name !== "" && $scope.contact.mail !== ""){
            suscribe();
          }else{
            swal("error", "Debes ingresar tu nombre y correo", "error");
          }
        };
}]);
    
  cviaja.controller('checkoutCtrl',['$scope','$rootScope','$window',function($scope,$rootScope,$window){
        $scope.key = "154facda17519d661d60dc5384a5681d";
        (function(){
         getCheckOut();
        })();

        function getCheckOut() {
          if(!$rootScope.activity){
            $scope.total = 0;
          } else {
            $scope.total = 1;
            checkout = window.localStorage.getItem('checkOut');
            $rootScope.activity = checkout ? JSON.parse(checkout) : {};
          }
        };
        $scope.deletePlan = function(index){
          swal("Eliminado!", "Plan eliminado correctamente", "success");
          $rootScope.activity = {};
          $scope.total = 0;
          window.localStorage.setItem('checkout', null);
        };
        $scope.goBack = function() {
          window.history.back();
        };
  }]);

  cviaja.controller('responseCtrl',['payment','$scope','$window','$location', function(payment,$scope,$window,$location){
        $scope.resultTransaction = {};
        let info = JSON.parse(localStorage.getItem("checkOut"));
        var ref_payco = $location.search().ref_payco;
        payment.getInfoTransaction(ref_payco,function(response){
          $scope.resultTransaction = response;
          if($scope.resultTransaction.x_cod_response === 1){
            codes = generateCodes(info.qtyBuyed);
            payment.createBooking({ name: response.x_business, mail: response.x_customer_email, idActivity:  info._id, mount: response.x_amount, quantity: info.qtyBuyed, codes: codes, wasPayment: true, statusPayment: response.x_response, codeTransaction: response.x_id_invoice, dateReserv: info.dateReserv });
            swal("¡Compra exitosa!","Tu transacción ha sido satisfactoria, a tu correo hemos enviado la información completa sobre tu actividad, Disfrútala!!", "success");
          } else if ($scope.resultTransaction.x_cod_response === 2) {
            swal("¡Compra rechazada!","Tu transacción ha sido rechazada, valida esta información con tu banco y vuelve a intentarlo, no te quedes con las ganas de hacer este plan.", "error");
          } else if ($scope.resultTransaction.x_cod_response === 3) {
            swal("¡Compra Pendiente!","Tu transacción está en estado Pendiente, te informaremos a vuelta de correo una vez cambie el estado de tu compra.", "warning");
          } else {
            swal("¡Compra fallida!","Ha ocurrido un error con tu compra, verifica con tu entidad financiera para mas información", "error");
          }
        })        
        $scope.goBack = function() {
          localStorage.setItem("checkOut",null);
            window.history.back();
        };
        
        function generateCodes(op){
          var codes = [];
          for(a=0;a<op;a++){
            codes.push(info.prefixCode+Math.floor(Math.random()*1000))
          }
          return codes;
        }
    }]);

  cviaja.controller('blogCtrl',function(){
  });