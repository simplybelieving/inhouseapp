angular.module('clientServices', [])

.factory('Client', function($http) {
    var clientFactory = {}; // Create the userFactory object

    // Get all the users from database
        clientFactory.getClients = function() {
        return $http.get('/api/viewClients/');
    };

      clientFactory.getPricelist = function(id) {
    return $http.get('/api/viewPricelist/' + id);
    };


    return clientFactory; // Return userFactory object
});
