angular.module("services",[]).factory("activities",function(e,n){function t(t){var o=n.defer(),r=o.promise;return e.defaults.headers.post["Content-Type"]="application/json",e.get(t).then(function(e){o.resolve(e)}).catch(function(e){deferred.reject(e)}),r}function o(t,o){var r=n.defer(),c=r.promise;return e.defaults.headers.post["Content-Type"]="application/json",e.post(t,o).then(function(e){r.resolve(e)}).catch(function(e){deferred.reject(e)}),c}function r(t,o){var r=n.defer(),c=r.promise;return e.defaults.headers.post["Content-Type"]="application/json",e.post(t,o).then(function(e){r.resolve(e.data)}).catch(function(e){deferred.reject(e)}),c}return{doRequest:function(e,n){t(e).then(function(e){n(e)})},doPostRequest:function(e,n,t){o(e,n).then(function(e){t(e)})},getReferals:function(e,n,t){r(e,n).then(function(e){t(e)})}}}).factory("payment",function(e,n){function t(t){var o=n.defer(),c=o.promise;return e.defaults.headers.post["Content-Type"]="application/json",e.get(r+t).then(function(e){o.resolve(e)}).catch(function(e){deferred.reject(e)}),c}function o(n){e.post("/saveBooking",n).then(function(e){console.log(e)})}var r="https://api.secure.payco.co/validation/v1/reference/";return{getInfoTransaction:function(e,n){t(e).then(function(e){n(e.data.data.original)})},createBooking:function(e){o(e)}}}).factory("helpers",function(e){function n(n,t){var o=t.replace(/[^a-zA-Z 0-9.]+/g,"");o=o.replace(/ /g,"+"),e.urlFinal="/catalogo/"+o+"_"+n}return{createUrl:function(e,t,o){n(e,t),o()}}});