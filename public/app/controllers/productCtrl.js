  console.log('Test SHOW controller')

angular.module('productControllers', ['productServices', 'ui.bootstrap', 'angular-loading-bar'])

.controller('addCtrl', function($http){

var app = this;

  this.addItem = function(addData){
      app.errorMsg=false;


      $http.post('/api/products', this.addData).then(function(data){
      console.log(data.data.success);
      console.log(data.data.message);

         if(data.data.success){ app.successMsg= data.data.message; } else{ app.errorMsg = data.data.message;}

      });
  };
})

.controller('showItems', function($timeout, $http, $scope, $routeParams, Product){

var app = this;
   app.loading = true; // Start loading icon on page load
   app.accessDenied = true; // Hide table while loading
   app.errorMsg = false; // Clear any error messages
   app.editAccess = false; // Clear access on load
   app.deleteAccess = false; // CLear access on load
   app.limit = 6; // Set a default limit to ng-repeat
   app.currentPage= 1;
   // Function: get all the users from database

       // Runs function to get all the users from database
       Product.getProducts().then(function(data) {
       //console.log(data.data.items[1].productname);
       app.items = data.data.items; // Assign users from database to variable
       });
       Product.getProducts(); // Invoke function to get users from databases


   // Function: Show more results on page
   app.showMore = function(number) {
       app.showMoreError = false; // Clear error message
       // Run functio only if a valid number above zero
       if (number > 0) {
           app.limit = number; // Change ng-repeat filter to number requested by user
       } else {
           app.showMoreError = 'Please enter a valid number'; // Return error if number not valid
       }
   };

   // Function: Show all results on page
   app.showAll = function() {
       app.limit = undefined; // Clear ng-repeat limit
       app.showMoreError = false; // Clear error message
   };



  var shoppingcart= angular.fromJson(sessionStorage.getItem('shoppingcart'));

  app.shopping = shoppingcart; // show items in view cart.html

  if (!(shoppingcart instanceof Array) || shoppingcart==null) {
      //videos has been corrupted
      var shoppingcart=[];
  }

  this.arrayStorage = function(items, $index, productid, productname){ //adding into shopping cart
    var index = $index; var pname = productname; var p_id= productid;
    $scope.shoppingcart= shoppingcart;

   this.items[$index].productname = pname;
   this.items[$index]._id = p_id;
   $scope.shoppingcart.push(angular.copy(this.items[$index])); //HOW I AM TRYING TO SAVE DATA INTO MY ARRAY, ITEMS

   saveToShoppingCart();

   app.successMsg= true; // notifies success

};



var saveToShoppingCart = function(){
 sessionStorage.setItem('shoppingcart', angular.toJson(shoppingcart));

 var myJSON = JSON.stringify(shoppingcart);

// window.location.reload();
 $timeout(function () {

     app.successMsg= false;

 }, 1000);  //hides after 1 seconds

};



this.sendArray = function(){
    app.errorMsg=false;

    var myJSON = JSON.stringify(shoppingcart);


    var action = window.location.pathname.split("/").slice(-1)[0];

    $http.post('/api/savepricelist', {cartstring:JSON.stringify(shoppingcart), client_id:action}).then(function(data){

       if(data.data.success){ app.successMsg= data.data.message; } else{ app.errorMsg = data.data.message;}

    });
};



 })






 .filter('pagination', function(){
   return function(data, start){
     if (!data || !data.length) { return; }
     return data.slice(start);
   }
 });
