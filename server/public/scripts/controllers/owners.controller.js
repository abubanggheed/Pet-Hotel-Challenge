app.controller('OwnersController', ['$http', function($http) {
    let vm = this;
    vm.owners = [];

    vm.getOwners = function() {
        $http({
            method: 'GET',
            url: '/owner'
        }).then( function(response) {
            vm.owners = response.data;
        }).catch( function(error) {
            console.log('error:', error);
            alert('failed to retrieve owner data');
        });
    }//end getOwners

    vm.addOwner = function(name) {
        $http({
            method: 'POST',
            url: '/owner',
            data: {name: name}
        }).then( function(response) {
            vm.getOwners();
        }).catch( function(error) {
            console.log('error:', error);
            alert('failed to reach database');
        });
    }//end addOwner

    vm.getOwners();
}]);//end ownersController