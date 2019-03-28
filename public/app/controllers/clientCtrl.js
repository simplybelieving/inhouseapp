angular.module('clientControllers', ['productServices','clientServices', 'ui.bootstrap', 'angular-loading-bar'])

.controller('invoiceCtrl', function($http, $scope, Product, Client){
var app = this;

Client.getClients().then(function(data) {
app.items = data.data.items;
console.log(app.items);
});
Client.getClients();


Product.getProducts().then(function(data) {
app.products = data.data.items;
console.log(app.products[1].productname);
});
//Product.getProducts();


$scope.qty = [];
$scope.price = [];


console.log($scope.qty[1]*$scope.price[1]);

})

.controller('viewPricelistCtrl', function($http, $scope, $routeParams, Client){

var app = this;

Client.getPricelist($routeParams.id).then(function(data){


app.pricelistArray=data.data.client.pricelistArray;
$scope.address=data.data.client.address;
$scope.name=data.data.client.name;
$scope.date=data.data.client.date;
$scope.tin=data.data.client.tin;
$scope.taxable=data.data.client.taxable;
$scope.type = data.data.client.type;
});


app.showdetails = function(newaddress, newname, newdate, pricelistArray){  };

this.editPrice = function(type, pricelistArray, $index){
console.log("client is"+ type);
$http.post('/api/editPricelist', {client_type:type, productname:this.pricelistArray[$index]._productname, newPrice:this.pricelistArray[$index].price, product_id:this.pricelistArray[$index]._id} ).then(function(data){

   if(data.data.success){ app.successMsg= data.data.message; } else{ app.errorMsg = data.data.message;}

});

};


 })


.controller('viewClientsCtrl', function(Client){

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
       Client.getClients().then(function(data) {

       app.items = data.data.items; // Assign users from database to variable
       });
       Client.getClients(); // Invoke function to get users from databases


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





 })







.controller('addClientCtrl', function($http){

var app = this;

  this.addItem = function(addData){
      app.errorMsg=false;
      console.log('testing adding client controller');
      console.log(this.addData);

      $http.post('/api/clients', this.addData).then(function(data){
      console.log(data.data.success);
      console.log(data.data.message);

         if(data.data.success){ app.successMsg= data.data.message; } else{ app.errorMsg = data.data.message;}

      });
  };
})
