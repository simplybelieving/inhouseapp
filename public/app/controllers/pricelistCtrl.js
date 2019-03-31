angular.module('pricelistControllers', ['pricelistServices', 'ui.bootstrap', 'angular-loading-bar'])

.controller('alertLossCtrl', function($http, $scope, $routeParams,Pricelist){

var app = this;

       // Runs function to get all the users from database
       Pricelist.getalertLoss().then(function(data) {
         app.doc = data.data.doc;
         console.log("doc, is in:"+this.doc);console.log("data.data.doc:"+data.data.doc);
          // Assign users from database to variable
       });
       Pricelist.getalertLoss(); // Invoke function to get users from databases

 })



.controller('searchCtrl', function($http, $scope, $routeParams, Pricelist){
var app = this;

this.editPrice = function(pricelist, $index){

$http.post('/api/editPricelist', {product_id:pricelist._id, productname:this.pricelist[$index]._productname, newPrice:this.pricelist[$index].price} ).then(function(data){

   if(data.data.success){ app.successMsg= data.data.message; } else{ app.errorMsg = data.data.message;}

});

};



     if($routeParams.id!=null){

     Pricelist.getSearch($routeParams.id);

     Pricelist.getSearch($routeParams.id).then(function(data){

       app.pricelist = data.data.pricelist;


       var arr = [];
       var list = ['gudetama9.png','gudetama10.png','gudetama2.png','gudetama4.png','gudetama5.png','gudetama.png','gudetama7.png','gudetama3.jpg','gudetama8.jpg','gudetama6.jpg'];
       while(arr.length< data.data.pricelist.length){
       var rand = Math.floor(Math.random()*(list.length));
       arr.push(list[rand]);
       };

       $scope.picture = arr;

    });

    }//if


})
