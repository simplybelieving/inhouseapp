angular.module('pricelistServices', [])

.factory('Pricelist', function($http) {
    var pricelistFactory = {}; // Create the userFactory object


      pricelistFactory.getSearch = function(id) {
    return $http.get('/api/searchlist/' + id);
    };

    pricelistFactory.getalertLoss = function() {
    return $http.get('/api/alertLoss/');
    };

    return pricelistFactory; // Return userFactory object
});
