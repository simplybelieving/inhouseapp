angular.module('authControllers', ['authServices', 'ui.bootstrap', 'angular-loading-bar'])


.controller('authCtrl', function(Auth, $timeout, $location, $scope, $rootScope){
  var app = this;


         var list = ['bird.jpg', 'bird-5.jpg','bird-1.jpg','bird-2.jpg','bird-3.jpg','bird-4.jpg'];
         var rand = Math.floor(Math.random()*(list.length));
         $scope.picture = list[rand];



  $rootScope.$on('$routeChangeStart', function(){


  if(Auth.isLoggedIn()){
   $scope.logged = true;
 }else{  $scope.logged = false;}

  });

  this.doLogin = function(loginData){

    Auth.login(app.loginData).then(function(data){
       if(data.data.success){
         app.successMsg= data.data.message +'...Redirecting';   $scope.logged = false;
         $timeout(function(){
           $location.path('/about');
         }, 2000);
       }else{
         app.errorMsg = data.data.message;
       }

    });
  };

  this.logout = function(){
    Auth.logout();

    $timeout(function(){
      $location.path('/');
    }, 2000);

  };


 })
