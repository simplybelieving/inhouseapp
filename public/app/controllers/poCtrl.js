console.log('Test SHOW controller')

angular.module('poControllers', ['ui.bootstrap', 'angular-loading-bar'])

.controller('addpoCtrl', function($http){

var app = this;

this.addItem = function(addData){
    app.errorMsg=false;


    $http.post('/api/ponumber', this.addData).then(function(data){
    console.log(data.data.success);
    console.log(data.data.message);

       if(data.data.success){ app.successMsg= data.data.message; } else{ app.errorMsg = data.data.message;}

    });
};
})
