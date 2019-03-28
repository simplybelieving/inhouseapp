
var app = angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider,  $locationProvider){

   $routeProvider

   .when('/register',{
     templateUrl: 'app/views/pages/register.html',
     controller: 'addUserCtrl',
     controllerAs: 'addUserCtrl',
     authenticated: true
   })

   .when('/',{
     templateUrl: 'app/views/pages/home.html'
   })

   .when('/invoice',{
     templateUrl: 'app/views/pages/invoice.html',
     controller: 'invoiceCtrl',
     controllerAs: 'invoiceCtrl'
   })

   .when('/login',{
     templateUrl: 'app/views/pages/login.html'
   })

   .when('/alertLoss',{
       templateUrl: 'app/views/pages/alertLoss.html',
       controller: 'alertLossCtrl',
       controllerAs: 'alertLossCtrl'
   })

   .when('/searchlist/:id',{
       templateUrl: 'app/views/pages/searchlist.html',
       controller: 'searchCtrl',
       controllerAs: 'searchCtrl',
       authenticated: true
   })

   .when('/about',{
     templateUrl: 'app/views/pages/about.html'
   })

   .when('/catalogues/:id',{
     templateUrl: 'app/views/pages/catalogues.html',
     controller: 'showItems',
     filter:'pagination',
     controllerAs: 'showItems'
   })

   .when('/morecatalogue/:currentPage/:type',{
     templateUrl: 'app/views/pages/morecatalogue.html',
     controller: 'moreCtrl',
     controllerAs: 'moreCtrl'
   })
   .when('/productdetails/:id',{
     templateUrl: 'app/views/pages/productdetails.html',
     controller: 'detailsCtrl',
     controllerAs: 'detailsCtrl'
   })

   .when('/viewClients',{
     templateUrl: 'app/views/pages/viewClients.html',
     controller: 'viewClientsCtrl',
     filter:'pagination',
     controllerAs: 'viewClientsCtrl',
     authenticated: true
   })

   .when('/viewPricelist/:id',{
     templateUrl: 'app/views/pages/viewPricelist.html',
     controller: 'viewPricelistCtrl',
     filter:'pagination',
     controllerAs: 'viewPricelistCtrl',
     authenticated: true
   })

   .when('/addproduct',{
     templateUrl: 'app/views/pages/addproduct.html',
     controller: 'addCtrl',
     controllerAs: 'addCtrl',
     authenticated: true
   })

   .when('/addclient',{
     templateUrl: 'app/views/pages/addclient.html',
     controller: 'addClientCtrl',
     controllerAs: 'addClientCtrl',
     authenticated: true
   })





   .otherwise({ redirectTo: '/'});

   $locationProvider.html5Mode({
     enabled: true,
     requireBase: false
   });



});




  app.run(['$rootScope', 'Auth', '$location', function($rootScope, Auth, $location){
  $rootScope.$on('$routeChangeStart', function(event, next, current){
     if(next.$$route.authenticated == true){
        if(!Auth.isLoggedIn()){
          event.preventDefault();
          $location.path('/');
        }
      } else if(next.$$route.authenticated == false){
          if(Auth.isLoggedIn()){
            event.preventDefault();
            $location.path('/adminpage');
          }
      }else{
        console.log('No need for authenticte');
      }

    });

  }]);
