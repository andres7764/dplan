var cviaja = angular.module('dplan',["ngRoute","routes","services"]);
   
cviaja.controller('activitiesCtrl',['activities','helpers','$scope','$q','$http','$window','$location','$rootScope',function(activities,helpers,$scope,$q,$http,$window,$location,$rootScope){
  document.title = "DPlan, Planes unicos cerca a Bogotá";
  $rootScope.activities = [];
  $scope.contact = {};
    activities.doRequest('/getActivities',function(res){ $rootScope.activities = res.data.activities; });
    $scope.irA = function(id,title){
      helpers.createUrl(id,title);
    }
    $scope.subscripbeUser = function(){ 
      activities.doPostRequest('/saveContact',{'mail': $scope.activities.mail},function(response){
       message("¡Suscripción exitosa!",response.data.token); 
       $scope.activities.mail = "";
     }) 
    }

    $scope.searcSite = function(op){
     $scope.search = (op === "a")? document.getElementById('search').value:op;
    }
    $scope.searcSiteA = function(op){ $scope.searchPlaces = op; }

    $scope.sendNewContact = function(){
      activities.doPostRequest('/saveCustomPlan',$scope.contact,function(response){
        message("¡Guardado!","Hemos recibido tu nuevo plan, nos pondremos en contacto contigo.");
        $scope.contact = {};
     })
    }

    function message(title,comment){
     swal(title,comment, "success");
    }
}]);

cviaja.controller('activityCtrl', ['activities','helpers','$scope','$routeParams','$rootScope','$location',function(activities,helpers,$scope,$routeParams,$rootScope,$location) {
        $rootScope.checkOut = [];
        $rootScope.referals = [];
       var a = new Date();
        $scope.validSince = a.getFullYear()+"-"+a.getMonth()+"-"+a.getDate();
       var directionsService,directionsDisplay;
       var activity = ($routeParams.activity.split("_").length === 2 )? $routeParams.activity.split("_") : window.location = "/";
       var idS = (activity[1].length === 24)?activity[1]:window.location = "/";

  activities.doRequest('/getActivity?id='+idS,function(res){
    $rootScope.activity = res.data.activity[0];
    $rootScope.lengthPagerImages = $rootScope.activity.carousel.length;
    $scope.tab = 1;
    document.title = $rootScope.activity.name;
    initAutocomplete($rootScope.activity.location);
    if ($rootScope.activity.legalInfo !== undefined) {
      $rootScope.activity.legalInfo = $rootScope.activity.legalInfo.split("&");
      $rootScope.activity.detailPlan = $rootScope.activity.detailPlan.split("&");
     for(a=0;a<$rootScope.activity.legalInfo.length;a++ ){
       $rootScope.activity.legalInfo[a].replace("&"," ");
     }
     for(a=0;a<$rootScope.activity.detailPlan.length;a++ ){
      $rootScope.activity.detailPlan[a].replace("&"," ");}
    }
    ///////////////////////////////////////////////////////////////////////////
    if($rootScope.activity.categories.indexOf(",") !== -1 ){
      $rootScope.catFind = $rootScope.activity.categories.split(",")[0];
    } else { 
      $rootScope.catFind = $rootScope.activity.categories;
    }

    activities.getReferals('/getReferals',{'categories':$rootScope.catFind},function(res){ $rootScope.referals = res.data; });

   $scope.irA = function(id,title){
      helpers.createUrl(id,title);
   }
  });

    function initAutocomplete(location) {
      $rootScope.activity.urlLocation = "#!/ver-mapa/"+parseFloat(location.lat)+"/"+parseFloat(location.lng);
        var latLng  = {lat: parseFloat(location.lat), lng: parseFloat(location.lng)};
            $scope.map = new google.maps.Map(document.getElementById('map'), {
              zoom: 14,
              center: latLng
            });
            var marker = new google.maps.Marker({
              position: latLng,
              icon: "../img/icons/dplanMarker.png",
              map: $scope.map
        });
    };

    $scope.validDate = function(){
    }

    $scope.checkCupo = function(index){
      $rootScope.checkOut = [];
      localStorage.setItem("checkOut",null);
      $rootScope.activity.qtyBuyed = document.getElementById('sel1').value;
      $rootScope.activity.total = $rootScope.activity.mount * $rootScope.activity.qtyBuyed;
      localStorage.setItem("checkOut",JSON.stringify($rootScope.activity));
    };

    $scope.reservA = function(value) {
      $rootScope.activity.dateReserv = angular.element('#dateSelected')[0].defaultValue;
        if($rootScope.activity.dateReserv.length > 5 && $rootScope.activity.qtyBuyed > 0){
           window.location = '/#!/checkout';
        }else{
           swal("error", "Debes elegir una fecha y el número de cupos a comprar", "error");
        }
    };
        
    $scope.range = function(min, max, step) { step = step || 1; var input = []; for (var i = min; i <= max; i += step) { input.push(i); } return input; };
        
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

  cviaja.controller('responseCtrl',['activities','payment','$scope','$window','$location', function(activities,payment,$scope,$window,$location){
        $scope.resultTransaction = {};
        var info = JSON.parse(localStorage.getItem("checkOut"));
        var ref_payco = $location.search().ref_payco;
        payment.getInfoTransaction(ref_payco,function(response){
          $scope.resultTransaction = response;
          codes = (response.x_cod_response === 1)? info.prefixCode+Math.floor(Math.random()*1000) : "no existen códigos para dicho usuario";
          if(response.x_cod_response === 1){
            swal("¡Compra exitosa!","Tu transacción ha sido satisfactoria, a tu correo hemos enviado la información completa sobre tu actividad, Disfrútala!!", "success");
          } else if (response.x_cod_response === 2) {
            swal("¡Compra rechazada!","Tu transacción ha sido rechazada, valida esta información con tu banco y vuelve a intentarlo, no te quedes con las ganas de hacer este plan.", "error");
          } else if (response.x_cod_response === 3) {
            swal("¡Compra Pendiente!","Tu transacción está en estado Pendiente, te informaremos a vuelta de correo una vez cambie el estado de tu compra.", "warning");
          } else {
            swal("¡Compra fallida!","Ha ocurrido un error con tu compra, verifica con tu entidad financiera para mas información", "error");
          }
            activities.doPostRequest('/searchInvoice',{codeTransaction: response.x_id_invoice},function(value) {
              if (value.data.code === 1) {
               payment.createBooking({reserv:{phone:response.x_customer_phone,name:response.x_business,mail:response.x_customer_email,idActivity:info._id,mount:response.x_amount,quantity:info.qtyBuyed,codes:codes,wasPayment:true,statusPayment:response.x_response,codeTransaction:response.x_id_invoice,dateReserv:info.dateReserv,city:response.x_customer_city,bankName:response.x_bank_name,}, plan:{namePlan:info.name,location:info.location}});
              }
            })
        })
        $scope.goBack = function() {
          localStorage.setItem("checkOut",null);
            window.history.back();
        };
    }]);

  cviaja.controller('blogCtrl',function(){
  });

  cviaja.controller('mapCtrl',['$routeParams','$location','helpers','activities','$scope','$rootScope',function($routeParams,$location,helpers,activities,$scope,$rootScope){
      navigator.geolocation.getCurrentPosition(information, funcError);
      function information(e){
        $rootScope.activities.locationUser = e.coords;
        initAutocomplete(e.coords);
      }
      function funcError(e) {
        swal('Opps!','debes permitir tu ubicación para mejorar la experiencia de navegación','error');
        var coords = {latitude:4.6638124,longitude:-74.0607074};
        $rootScope.activities.locationUser = coords;
        initAutocomplete(coords);
      }

      function initAutocomplete(location) {
        document.getElementById('mapA').style.height = parseInt(screen.height);
        var latLng  = {lat: parseFloat(location.latitude), lng: parseFloat(location.longitude)};
            $scope.map = new google.maps.Map(document.getElementById('mapA'), {
              zoom: 12,
              center: latLng,
              styles: helpers.configMap
            });
            var marker = new google.maps.Marker({
              position: latLng,
              map: $scope.map,
              icon: "data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTI1NiwwQzE1My43NTUsMCw3MC41NzMsODMuMTgyLDcwLjU3MywxODUuNDI2YzAsMTI2Ljg4OCwxNjUuOTM5LDMxMy4xNjcsMTczLjAwNCwzMjEuMDM1ICAgIGM2LjYzNiw3LjM5MSwxOC4yMjIsNy4zNzgsMjQuODQ2LDBjNy4wNjUtNy44NjgsMTczLjAwNC0xOTQuMTQ3LDE3My4wMDQtMzIxLjAzNUM0NDEuNDI1LDgzLjE4MiwzNTguMjQ0LDAsMjU2LDB6IE0yNTYsMjc4LjcxOSAgICBjLTUxLjQ0MiwwLTkzLjI5Mi00MS44NTEtOTMuMjkyLTkzLjI5M1MyMDQuNTU5LDkyLjEzNCwyNTYsOTIuMTM0czkzLjI5MSw0MS44NTEsOTMuMjkxLDkzLjI5M1MzMDcuNDQxLDI3OC43MTksMjU2LDI3OC43MTl6IiBmaWxsPSIjMDAwMDAwIi8+Cgk8L2c+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=="
            });

        // Create the search box and link it to the UI element.
      /*  var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        $scope.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        $scope.map.addListener('bounds_changed', function() {
          searchBox.setBounds($scope.map.getBounds());
        });
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();
        directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer();
          //$scope.paintRoute(places[0].geometry.location.lat(),places[0].geometry.location.lng());
        });*/

      if($rootScope.activities.length < 1) {
       activities.doRequest('/getActivities',function(res){
          $rootScope.activities = res.data.activities;
       });
      } else {
       for(var a=0;a<$rootScope.activities.length;a++) {
        paintMarkers($rootScope.activities[a].location,a);
       }
      }
      if($routeParams.lat !== 12 && $routeParams.lng !== 19)
        helpers.paintRoute($routeParams.lat,$routeParams.lng,$scope.map);

     function paintMarkers(object,num) {
      helpers.createUrl($rootScope.activities[num]._id,$rootScope.activities[num].name);
      var myLatLng = {lat: parseFloat(object.lat), lng: parseFloat(object.lng)};
      var marker = new google.maps.Marker({ position: myLatLng, map: $scope.map, title: object.name, icon: "../img/icons/dplanMarker.png", animation: google.maps.Animation.DROP, draggable: false });
      var contentString = "<div id='iw-container'><h5><b>"+$rootScope.activities[num].name+"<b></h5><br><div class='iw-content'><p><b>Ubicación</b>: "+$rootScope.activities[num].location.name+"</p><div style='width:400px;text-align:justify;max-height:115px;overflow:hidden'><p><b>Descripción:</b> "+$rootScope.activities[num].description+"</p></div><p><b>Precio:</b> $"+$rootScope.activities[num].mount+"</p><a href='#!"+$rootScope.urlFinal+"' target='_blank'>ver mas</a></div><div style='width:400px;height:180px;margin-top:5px;margin-bottom:5px;background-size:cover;background-position:center;background-image:url("+$rootScope.activities[num].url+");'></div></div>";
      var infowindow = new google.maps.InfoWindow({ content: contentString });
      google.maps.event.addListener(marker, 'click', (function(marker,i) {
       return function() {
        helpers.paintRoute(marker.position.lat(),marker.position.lng(),$scope.map);
        infowindow.open($scope.map, marker);
       }
      })(marker, 0));
      marker.setMap($scope.map);
     }
    };
  }]);

cviaja.controller('loginCtrl',['$scope','$rootScope',function($scope,$rootScope){

}]);