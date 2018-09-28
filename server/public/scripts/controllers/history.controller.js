app.controller('HistoryController', ['$http', function($http) {
    let vm = this;
    vm.visits = [];

    vm.getHistory = function() {
        $http({
            method: 'GET',
            url: '/history'
        }).then(function(response) {
            vm.visits = response.data;
        }).catch(function(error){
            console.log('error:', error);
            alert('failed to connect with server');
        });
    }//end getHistory
    
    vm.getHistory();
}]);