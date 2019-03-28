//main config for all angular files

angular.module('productApp', ['appRoutes',  'authControllers', 'authServices', 'userServices', 'userControllers', 'pricelistServices', 'pricelistControllers','productServices', 'productControllers', 'clientServices', 'clientControllers']).run(function($rootScope, $location){
   $rootScope.location = $location;
});
